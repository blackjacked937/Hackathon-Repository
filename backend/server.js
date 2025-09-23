import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createAuthenticatedClient, isFinalizedGrant } from "@interledger/open-payments";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;

// Crear cliente autenticado
const client = await createAuthenticatedClient({
  walletAddressUrl: process.env.SENDING_WALLET_URL, // wallet que envía dinero
  privateKey: process.env.PRIVATE_KEY_PATH,
  keyId: process.env.KEY_ID,
  validateResponses: false,
});

// Ruta para crear cobro
app.post("/api/new-charge", async (req, res) => {
  const { amount, receiverWalletUrl } = req.body;

  try {
    // 1️⃣ Obtener wallets
    const sendingWallet = await client.walletAddress.get({
      url: process.env.SENDING_WALLET_URL, // wallet que envía
    });

    const receivingWallet = await client.walletAddress.get({
      url: receiverWalletUrl, // wallet que recibe
    });

    // 2️⃣ Crear incoming payment en la wallet receptora
    const incomingPaymentGrant = await client.grant.request(
      { url: receivingWallet.authServer },
      {
        access_token: {
          access: [{ type: "incoming-payment", actions: ["read", "complete", "create"] }],
        },
      }
    );

    const incomingPayment = await client.incomingPayment.create(
      {
        url: receivingWallet.resourceServer,
        accessToken: incomingPaymentGrant.access_token.value,
      },
      {
        walletAddress: receivingWallet.id,
        incomingAmount: {
          assetCode: receivingWallet.assetCode,
          assetScale: receivingWallet.assetScale,
          value: amount,
        },
      }
    );

    // 3️⃣ Crear quote en la wallet emisora
    const quoteGrant = await client.grant.request(
      { url: sendingWallet.authServer },
      { access_token: { access: [{ type: "quote", actions: ["read", "create"] }] } }
    );

    const quote = await client.quote.create(
      { url: sendingWallet.resourceServer, accessToken: quoteGrant.access_token.value },
      { walletAddress: sendingWallet.id, receiver: incomingPayment.id, method: "ilp" }
    );

    // 4️⃣ Crear outgoing payment grant
    const outgoingPaymentGrant = await client.grant.request(
      { url: sendingWallet.authServer },
      {
        access_token: {
          access: [{
            type: "outgoing-payment",
            actions: ["read", "create"],
            limits: { debitAmount: { assetCode: quote.debitAmount.assetCode, assetScale: quote.debitAmount.assetScale, value: quote.debitAmount.value } },
            identifier: sendingWallet.id,
          }],
        },
        interact: {
          start: ["redirect"],
          finish: { 
            method: "redirect", 
            uri: "http://localhost:5173/new-charge",
            nonce: "e1ae0cb7-d4fc-4204-944b-68f9112c4e77", // interact_ref que te dieron
          },
        },
      }
    );

    // Enviar al frontend la URL de autorización
    res.json({
      message: "Cobro creado. Confirma el envío en la URL",
      interactUrl: outgoingPaymentGrant.interact.redirect,
      outgoingPaymentGrantId: outgoingPaymentGrant.id,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.description || err.message });
  }
});

// Ruta para completar el pago
app.post("/api/complete-payment", async (req, res) => {
  const { outgoingPaymentGrantId, interact_ref } = req.body;

  try {
    // Obtener el grant
    const outgoingPaymentGrant = await client.grant.get({ id: outgoingPaymentGrantId });

    // Finalizar grant usando interact_ref
    const finalizedGrant = await client.grant.continue({
      url: outgoingPaymentGrant.continue.uri,
      accessToken: outgoingPaymentGrant.continue.access_token.value,
      interact_ref,
    });

    if (!isFinalizedGrant(finalizedGrant)) throw new Error("Grant no finalizado. Usuario no aprobó el pago.");

    const sendingWallet = await client.walletAddress.get({ url: process.env.SENDING_WALLET_URL });

    // Crear outgoing payment
    const outgoingPayment = await client.outgoingPayment.create(
      { url: sendingWallet.resourceServer, accessToken: finalizedGrant.access_token.value },
      { walletAddress: sendingWallet.id, quoteId: finalizedGrant.quoteId }
    );

    res.json({ message: "Pago completado correctamente", outgoingPayment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.description || err.message });
  }
});

app.listen(PORT, () => console.log(`Servidor backend corriendo en http://localhost:${PORT}`));

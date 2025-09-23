import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createAuthenticatedClient, isFinalizedGrant } from "@interledger/open-payments";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;

const pendingGrants = {};

app.post("/api/new-charge", async (req, res) => {
  const { amount, method, description, receiverWalletUrl } = req.body;

  try {
    const client = await createAuthenticatedClient({
      walletAddressUrl: process.env.SENDING_WALLET_URL,
      privateKey: process.env.PRIVATE_KEY_PATH,
      keyId: process.env.KEY_ID,
      validateResponses: false,
    });

    const sendingWallet = await client.walletAddress.get({ url: process.env.SENDING_WALLET_URL });
    const receivingWallet = await client.walletAddress.get({ url: receiverWalletUrl });

    const incomingPaymentGrant = await client.grant.request(
      { url: receivingWallet.authServer },
      { access_token: { access: [{ type: "incoming-payment", actions: ["read", "complete", "create"] }] } }
    );

    const incomingPayment = await client.incomingPayment.create(
      { url: receivingWallet.resourceServer, accessToken: incomingPaymentGrant.access_token.value },
      {
        walletAddress: receivingWallet.id,
        incomingAmount: { assetCode: receivingWallet.assetCode, assetScale: receivingWallet.assetScale, value: amount },
      }
    );

    const quoteGrant = await client.grant.request(
      { url: sendingWallet.authServer },
      { access_token: { access: [{ type: "quote", actions: ["create", "read"] }] } }
    );

    const quote = await client.quote.create(
      { url: sendingWallet.resourceServer, accessToken: quoteGrant.access_token.value },
      { walletAddress: sendingWallet.id, receiver: incomingPayment.id, method: "ilp" }
    );

    const outgoingPaymentGrant = await client.grant.request(
      { url: sendingWallet.authServer },
      {
        access_token: {
          access: [
            {
              type: "outgoing-payment",
              actions: ["read", "create"],
             limits: {
 limits: {
  debitAmount: {
    assetCode: incomingPayment.incomingAmount.assetCode,
    assetScale: incomingPayment.incomingAmount.assetScale,
    value: incomingPayment.incomingAmount.value,
  }
}},

              identifier: sendingWallet.id,
            },
          ],
        },
        interact: { start: ["redirect"] },
      }
    );

    const grantId = Math.random().toString(36).substring(2, 15);
    pendingGrants[grantId] = { client, sendingWallet, quote, outgoingPaymentGrant };

    res.json({
      message: "Cobro creado. Confirma el envío en la URL",
      interactUrl: outgoingPaymentGrant.interact.redirect,
      grantId, 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.description || err.message });
  }
});

app.post("/api/complete-payment/:grantId", async (req, res) => {
  const { grantId } = req.params;
  const saved = pendingGrants[grantId];

  if (!saved) return res.status(400).json({ error: "Grant no encontrado o expirado" });

  const { client, sendingWallet, quote, outgoingPaymentGrant } = saved;

  try {
    const finalizedGrant = await client.grant.continue({
      url: outgoingPaymentGrant.continue.uri,
      accessToken: outgoingPaymentGrant.continue.access_token.value,
    });

    if (!isFinalizedGrant(finalizedGrant)) return res.status(400).send("Grant no finalizado correctamente.");

    const outgoingPayment = await client.outgoingPayment.create({
      url: sendingWallet.resourceServer,
      accessToken: finalizedGrant.access_token.value,
      quoteId: quote.id,
    });

    delete pendingGrants[grantId];

    res.json({ message: "Pago completado", outgoingPaymentId: outgoingPayment.id });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error completando el pago.");
  }
});

app.listen(PORT, () => console.log(`Servidor backend corriendo en http://localhost:${PORT}`));

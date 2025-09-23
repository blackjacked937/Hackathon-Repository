# Pay4All

A modern Point of Sale (POS) application that solves the common problem of transactional friction when a customer has insufficient digital funds.

## Description

Our solution enables split-tender payments, combining digital methods (via Open Payments) and cash in a single, atomic, and easy-to-reconcile transaction.

-   **💸 Split Payments**: Accept a portion of the payment in cash and generate an Open Payments link for the remainder.
-   **📊 Analytics Dashboard**: View your revenue history with charts that break down sales by payment type.
-   **📜 Transaction History**: A detailed log of all operations, with filters for day, week, and month.
-   **🔐 Digital Receipts**: Generate a payment confirmation with the Interledger transaction hash and sharing options (QR, email).
-   **⚙️ Configurable Profile**: Manage merchant data and linked payment methods.

---

## Tech Stack

| Component          | Technology                                       |
| ------------------ | ------------------------------------------------ |
| Frontend           | React, Vite, Tailwind CSS, React Router          |
| Backend & Database | Supabase                                         |
| Payment Protocol   | Interledger Protocol (ILP) via Open Payments API |

---

## Prerequisites

-   Node.js (version 20 or higher)
-   npm (installs automatically with Node.js)

---

## Installation and Setup

1.  **Clone the repository and navigate to the project folder:**

    ```bash
    git clone https://github.com/blackjacked937/Hackathon-Repository.git
    cd Hackaton
    ```

2.  **Install all dependencies:**
    This command will read the `package.json` file and install all the necessary libraries.

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    To connect the project to Supabase, you will need your URL and your `anon key`. Create a file named `.env` in the project root and add the corresponding credentials.

4.  **Start the development server:**

    ```bash
    npm run dev
    ```

---

## Usage

-   Open your browser and navigate to the address shown in your terminal (usually `http://localhost:5173`).

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Pay4All

Moderna aplicación de Punto de Venta (POS) que resuelve el problema común de la fricción transaccional cuando un cliente tiene fondos digitales insuficientes.

## Descripción

Nuestra solución permite pagos mixtos (split-tender), combinando métodos digitales (vía Open Payments) y efectivo en una única operación atómica y fácil de conciliar.

- **💸 Pagos Mixtos**: Acepta una parte del pago en efectivo y genera un enlace de Open Payments por el resto.
- **📊 Dashboard de Analíticas**: Visualiza el historial de ingresos, con gráficos que separan las ventas por tipo de pago.
- **📜 Historial de Transacciones**: Un registro detallado de todas las operaciones, con filtros por día, semana y mes.
- **🔐 Recibos Digitales**: Genera una confirmación de pago con el hash de la transacción de Interledger y opciones para compartir (QR, email).
- **⚙️ Perfil Configurable**: Administra los datos del comerciante y los métodos de pago vinculados.

## Stack Tecnológico

| Componente                | Tecnología                                        |
| ------------------------- | ------------------------------------------------- |
| Frontend                  | React, Vite, Tailwind CSS, React Router           |
| Backend & Base de Datos   | Supabase            |
| Protocolo de Pago         | Interledger Protocol (ILP) vía Open Payments API  |


## Requisitos

- Node.js (versión 20 o superior)
- npm (se instala automáticamente con Node.js)

## Instalación y configuración

1.  **Clona el repositorio y navega a la carpeta del proyecto:**

    ```bash
    git clone https://github.com/blackjacked937/Hackathon-Repository.git
    cd Hackaton
    ```

2.  **Instala todas las dependencias:**
    Este comando leerá el archivo `package.json` e instalará todas las librerías necesarias (React, Tailwind, etc.).

    ```bash
    npm install
    ```

3.  **Configura las variables de entorno:**
    Para conectar el proyecto con Supabase, necesitarás tu URL y tu `anon key`. Crea un archivo llamado `.env` en la raíz del proyecto y añade las credenciales correspondientes.

4.  **Inicia el servidor de desarrollo:**

    ```bash
    npm run dev
    ```

## Uso

- Abre tu navegador y ve a la dirección que te indica la terminal (usualmente `http://localhost:5173`).
# Action Wave 🌊

**Action Wave** is a decentralized savings protocol built on the **Stellar Network**. It empowers users to create, manage, and join trustless "Savings Circles" (ROSCA) directly from their browser using the Freighter Wallet.

![Action Wave Banner](/public/actionlogo.png)

## 🚀 Key Features

-   **Stellar Integration**: Seamlessly connect with [Freighter Wallet](https://www.freighter.app/) to interact with the Stellar blockchain.
-   **Savings Circles**: Create customized savings pools with configurable contribution amounts, cycles, and member limits.
-   **Dashboard**: Real-time tracking of your active circles, transaction history, and payout status.
-   **Non-Custodial**: You remain in control of your funds. The protocol uses smart contracts (simulated for MVP) to manage flows.
-   **Transparency**: Live ticker of on-chain operations ensures complete visibility.

## 🛠️ Technology Stack

-   **Frontend**: React (Vite) + TypeScript
-   **Styling**: Tailwind CSS + Shadcn UI
-   **Blockchain**: `stellar-sdk` + `@stellar/freighter-api`
-   **State Management**: React Context (Wallet & Protocol Providers)

## 🏁 Getting Started

### Prerequisites

1.  **Node.js** (v18+)
2.  **Freighter Wallet Extension** installed in your browser.
3.  **Stellar Account** (Funded with XLM for transaction fees).

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/action-wave.git
    cd action-wave
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    # or
    bun install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:8080](http://localhost:8080) to view the app.

## 💰 How to Use

1.  **Connect Wallet**: Click the "Connect Wallet" button in the top right.
2.  **Create Circle**: Navigate to "Create Circle", configure your pool parameters, and click "Deploy". This saves the circle to your local client state.
3.  **Deposit**: Go to the Dashboard, select your active circle, and click "Deposit".
4.  **Sign Transaction**: Freighter will pop up. Sign the transaction to perform a **Self-Transfer** (safe for testing) on the Stellar Network.

## 🛡️ Security Note

For this MVP/Demo version:
-   **Protocol Logic** is currently client-side simulated for ease of demonstration.
-   **Deposits** are configured as **Self-Transfers**. This means funds are sent back to your own address, proving that you can successfully sign and submit transactions without risking loss of funds.

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

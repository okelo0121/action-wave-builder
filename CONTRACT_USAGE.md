# Deploying and Using the Action Wave Smart Contract

## 1. Prerequisites
Ensure you have followed the `contracts/SETUP_INSTRUCTIONS.md` to install Rust and Soroban CLI.

## 2. Compile the Contract
Open a terminal in `contracts/savings_circle` and run:
```powershell
cargo build --target wasm32-unknown-unknown --release
```
The compiled file will be at `target/wasm32-unknown-unknown/release/savings_circle.wasm`.

## 3. Deploy to Testnet
Run the following command to deploy:
```powershell
soroban contract deploy \
    --wasm target/wasm32-unknown-unknown/release/savings_circle.wasm \
    --source <YOUR_SECRET_KEY> \
    --network testnet
```
*Note: Replace `<YOUR_SECRET_KEY>` with your Freighter wallet's secret key (or a new identity created via `soroban config identity generate`).*

## 4. Update Frontend
Copy the **Contract ID** output from the deploy command.
Open `src/components/providers/ProtocolProvider.tsx` and find:
```typescript
const CONTRACT_ID = "YOUR_CONTRACT_ID_HERE";
```
Replace it with your actual ID.

## 5. Usage in App
- **Connect Wallet**: Use the new "Connect" button to select Freighter, Albedo, etc.
- **Create Circle**: Go to "New Circle", enter details. This will call `create_circle`.
- **Deposit**: Join a circle and click "Deposit". This calls `join_circle` (simulated currently until deployed).
- **Payout**: Happens automatically when all members deposit.

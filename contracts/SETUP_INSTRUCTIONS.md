# Soroban Environment Setup

To compile and deploy the smart contract I am building, you need to install the following tools on your machine:

1.  **Install Visual Studio C++ Build Tools:**
    The error `linker 'link.exe' not found` means you are missing the C++ build tools.
    - Download **Visual Studio Build Tools**: https://visualstudio.microsoft.com/visual-cpp-build-tools/
    - During installation, select the **"Desktop development with C++"** workload.
    - Reboot your computer if prompted.

2.  **Install Rust:**
    Download and run `rustup-init.exe` from [rust-lang.org](https://www.rust-lang.org/tools/install).
    During installation, select the default options.

2.  **Add WebAssembly target:**
    Open a new PowerShell terminal and run:
    ```powershell
    rustup target add wasm32-unknown-unknown
    ```

3.  **Install Soroban CLI:**
    Run this command to install the CLI tool:
    ```powershell
    cargo install --locked soroban-cli
    ```

4.  **Verify Installation:**
    Check if it works by running:
    ```powershell
    soroban --version
    ```

Once installed, navigate to the `contracts/savings_circle` folder I created and run:
```powershell
cargo build --target wasm32-unknown-unknown --release
```
Then deploy using `soroban contract deploy`.

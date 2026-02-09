
declare module '@creit.tech/stellar-wallets-kit' {
    export enum WalletNetwork {
        TESTNET = 'Test SDF Network ; September 2015',
        PUBLIC = 'Public Global Stellar Network ; September 2015',
        FUTURENET = 'Test SDF Future Network ; October 2022'
    }

    export const FREIGHTER_ID = 'freighter';
    export const ALBEDO_ID = 'albedo';
    export const XBULL_ID = 'xbull';
    export const LOBSTR_ID = 'lobstr';

    export class FreighterModule { }
    export class AlbedoModule { }
    export class xBullModule { }
    export class LobstrModule { }

    export interface IWalletParams {
        network: WalletNetwork;
        selectedWalletId: string;
        modules: any[];
    }

    export class StellarWalletsKit {
        constructor(params: IWalletParams);
        openModal(params: { onWalletSelected: (option: { id: string, name: string, icon: string }) => void }): Promise<void>;
        setWallet(id: string): void;
        getAddress(): Promise<{ address: string }>;
        signTransaction(params: { xdr: string, network: WalletNetwork }): Promise<{ signedTxXdr: string }>;
    }
}

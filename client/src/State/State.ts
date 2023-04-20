import { Network, Signer } from "bitcoinjs-lib";

export interface State {
    stage: 'generate_mnemonic' | 'pay_to_app' | 'add_backup_keys' | 'show_descriptors' | 'complete';
    network: Network;
    mnemonic?: string;
    signer?: Signer;
    address?: string;
    backupKeys: {
        mnemonic: string;
        validFrom?: Date;
    }[];
}

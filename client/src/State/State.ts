import { Network, Signer } from "bitcoinjs-lib";
import { BlockstreamUTXO } from "../bitcoin/blockstream";

export interface State {
    stage: 'generate_mnemonic' | 'pay_to_app' | 'fetch_utxos' | 'add_backup_keys' | 'show_descriptors' | 'complete';
    network: Network;
    mnemonic?: string;
    signer?: Signer;
    address?: string;
    utxos: BlockstreamUTXO[];
    backupKeys: {
        mnemonic: string;
        validFrom?: Date;
    }[];
}

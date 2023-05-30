import { Network, Signer } from "bitcoinjs-lib";
import { UTXO } from "../bitcoin/UTXO";

export interface State {
    stage: 'generate_mnemonic' | 'pay_to_app' | 'fetch_utxos' | 'add_backup_keys' | 'show_descriptors' | 'complete';
    network: Network;
    mnemonic?: string;
    signer?: Signer;
    address?: string;
    utxos: UTXO[];
    backupKeys: {
        name: string;
        mnemonic: string;
        validFrom?: Date;
    }[];
    tx?: { txid: string };
}

export interface UTXO {
    txid: string;
    vout: number;
    address: string;
    label: string;
    scriptPubKey: string;
    
    /**
     * Utxo value in btc
     */
    amount: number;
    
    confirmations: number;
    spendable: boolean;
    solvable: boolean;
    desc: string;
    parent_descs: string[];
    safe: boolean;
}

import { Network,Psbt, Signer } from "bitcoinjs-lib";
import { toXOnly } from "./keys";
import { generateTaprootPayment } from "./address";

export interface CreateTransactionParams {
    signer: Signer;
    recipients: {
        amountInSats: number;
        address: string;
    }[];
    utxos: {
        txid: string;
        vout: number;
        valueInSats: number;
    }[];
    network: Network;
}

export function createTransaction(params: CreateTransactionParams) {
    const psbt = new Psbt({
        network: params.network
    });
    const internalKey = toXOnly(params.signer.publicKey);
    const payment = generateTaprootPayment(params.signer, params.network);

    psbt.addInput({
        hash: params.utxos[0].txid,
        index: params.utxos[0].vout,
        witnessUtxo: { value: params.utxos[0].valueInSats, script: payment.output! },
        tapInternalKey: internalKey
    });

    params.recipients.forEach(({ amountInSats, address }) => {
        psbt.addOutput({
            address,
            value: amountInSats - 150,
        });
    });

    psbt.signInput(0, params.signer);
    psbt.finalizeAllInputs();

    return psbt;
}

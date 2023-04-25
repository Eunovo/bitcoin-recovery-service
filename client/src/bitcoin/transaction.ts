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

    params.utxos.forEach((utxo) => {
        psbt.addInput({
            hash: utxo.txid,
            index: utxo.vout,
            witnessUtxo: { value: utxo.valueInSats, script: payment.output! },
            tapInternalKey: internalKey
        });
    });

    params.recipients.forEach(({ amountInSats, address }) => {
        psbt.addOutput({
            address,
            value: amountInSats - 150,
        });
    });

    psbt.signAllInputs(params.signer);
    psbt.finalizeAllInputs();

    return psbt;
}

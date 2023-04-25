import { Network,Psbt, Signer } from "bitcoinjs-lib";
import { generateXOnlyPubKey } from "./keys";
import { generateTaprootPayment } from "./address";

export interface CreateTransactionParams {
    signer: Signer;
    mnemonic: string;
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

export async function createTransaction(params: CreateTransactionParams) {
    const psbt = new Psbt({
        network: params.network
    });
    const internalKey = await generateXOnlyPubKey(params.mnemonic, params.network);
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
            value: amountInSats - 6000,
        });
    });

    psbt.signAllInputs(params.signer);
    psbt.finalizeAllInputs();

    return psbt;
}

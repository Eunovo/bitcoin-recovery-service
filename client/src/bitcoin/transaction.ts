import { Network,Psbt, Signer } from "bitcoinjs-lib";
import { generateXOnlyPubKey } from "./keys";
import { generateTaprootPayment } from "./address";
import { FEE_RATE } from "../constants";
import assert from "assert";

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
    assert(params.recipients.length == 1, 'Only supports one output for now');
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

    const fee = FEE_RATE * psbt.toBuffer().byteLength;

    params.recipients.forEach(({ amountInSats, address }) => {
        psbt.addOutput({
            address,
            value: amountInSats - fee,
        });
    });

    psbt.signAllInputs(params.signer);
    psbt.finalizeAllInputs();

    return psbt;
}

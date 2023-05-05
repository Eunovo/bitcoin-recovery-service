import { initEccLib, networks, payments, Signer } from "bitcoinjs-lib";
import * as tinysecp from "tiny-secp256k1";
import { generateSigner, toXOnly, tweakSigner } from "./keys";

initEccLib(tinysecp as any);

export function generateTaprootPayment(signer: Signer, network: networks.Network) {
    return payments.p2tr({
        pubkey: toXOnly(signer.publicKey),
        network
    });
}

export function generateTaprootAddress(signer: Signer, network: networks.Network) {
    // Generate an address from the tweaked signer
    const p2pktr = generateTaprootPayment(signer, network);
    return p2pktr.address;
}

export async function generateSignerAndTaprootAddress(mnemonic: string, network: networks.Network) {
    let signer: Signer = await generateSigner(mnemonic, network);
    signer = tweakSigner(signer, { network: network });
    const address = generateTaprootAddress(signer, network);

    return { signer, address };
}

import { initEccLib, networks, payments, Signer } from "bitcoinjs-lib";
import * as tinysecp from "tiny-secp256k1";
import { toXOnly } from "./keys";

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


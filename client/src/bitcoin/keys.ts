import BIP32Factory from 'bip32';
import * as ecc from 'tiny-secp256k1';
import * as bip39 from "bip39";

const bip32 = BIP32Factory(ecc);

export function generateMnemonic() {
    return bip39.generateMnemonic();
}

export async function generateInternalKey(mnemonic: string) {
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const rootKey = bip32.fromSeed(seed);
    return rootKey.publicKey.slice(1, 33);
}

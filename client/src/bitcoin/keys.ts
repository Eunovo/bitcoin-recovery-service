import BIP32Factory from 'bip32';
import { crypto, initEccLib, Network, Signer } from "bitcoinjs-lib";
import * as ecc from 'tiny-secp256k1';
import * as bip39 from "bip39";
import { ECPairFactory, ECPairAPI } from 'ecpair';

const bip32 = BIP32Factory(ecc);
initEccLib(ecc);
const ECPair: ECPairAPI = ECPairFactory(ecc);

export function generateMnemonic() {
    return bip39.generateMnemonic();
}

export async function generateKeyFrom(mnemonic: string, network: Network) {
    const seed = await bip39.mnemonicToSeed(mnemonic);
    return bip32.fromSeed(seed, network);
}

export async function generateXOnlyPubKey(mnemonic: string, network: Network) {
    const rootKey = await generateKeyFrom(mnemonic, network);
    return rootKey.publicKey.slice(1, 33);
}

export async function generateSigner(mnemonic: string, network: Network) {
    const rootKey = await generateKeyFrom(mnemonic, network);
    return ECPair.fromPrivateKey(rootKey.privateKey!, { network });
}

export function tweakSigner(signer: Signer, opts: any = {}): Signer {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    let privateKey: Uint8Array | undefined = signer.privateKey!;
    if (!privateKey) {
        throw new Error('Private key is required for tweaking signer!');
    }
    if (signer.publicKey[0] === 3) {
        privateKey = ecc.privateNegate(privateKey);
    }

    const tweakedPrivateKey = ecc.privateAdd(
        privateKey,
        tapTweakHash(toXOnly(signer.publicKey), opts.tweakHash),
    );
    if (!tweakedPrivateKey) {
        throw new Error('Invalid tweaked private key!');
    }

    return ECPair.fromPrivateKey(Buffer.from(tweakedPrivateKey), {
        network: opts.network,
    });
}

function tapTweakHash(pubKey: Buffer, h: Buffer | undefined): Buffer {
    return crypto.taggedHash(
        'TapTweak',
        Buffer.concat(h ? [pubKey, h] : [pubKey]),
    );
}

export function toXOnly(pubkey: Buffer): Buffer {
    return pubkey.subarray(1, 33)
}
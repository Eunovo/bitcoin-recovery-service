import { crypto, initEccLib, networks, payments, Signer } from "bitcoinjs-lib";
import * as tinysecp from "tiny-secp256k1";
import { ECPairFactory, ECPairAPI } from 'ecpair';

initEccLib(tinysecp as any);
const ECPair: ECPairAPI = ECPairFactory(tinysecp);
const network = networks.testnet;

export function generateTaprootAddress(internalKey: Buffer) {
    // Tweak the internal key
    const tweakHash = tapTweakHash(toXOnly(internalKey), undefined);
    const result = tinysecp.xOnlyPointAddTweak(internalKey, tweakHash);
    const tweakedKey = result ? Buffer.from(result.xOnlyPubkey) : undefined;
    // Generate an address from the tweaked public key
    const p2pktr = payments.p2tr({
        pubkey: tweakedKey,
        network
    });

    return p2pktr.address;
}

function tweakSigner(signer: Signer, opts: any = {}): Signer {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    let privateKey: Uint8Array | undefined = signer.privateKey!;
    if (!privateKey) {
        throw new Error('Private key is required for tweaking signer!');
    }
    if (signer.publicKey[0] === 3) {
        privateKey = tinysecp.privateNegate(privateKey);
    }

    const tweakedPrivateKey = tinysecp.privateAdd(
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

function toXOnly(pubkey: Buffer): Buffer {
    return pubkey.subarray(1, 33)
}

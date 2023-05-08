import * as tinysecp from "tiny-secp256k1";
import * as descriptors from "@bitcoinerlab/descriptors";
import { Network } from "bitcoinjs-lib";
import { State } from "../State/State";
import { generateKeyFrom, generateXOnlyPubKey, toXOnly } from "./keys";

const { Descriptor } = descriptors.DescriptorsFactory(tinysecp);

export const DESCRIPTORS = {
    pay_to_pubkey: (pubkey: string) => `pk(${pubkey})`,
    script_tree: (scripts: string[]) => `{${scripts.join(',')}}`,
    taproot: (pubkey: string, script_tree?: string) => script_tree
        ? `tr(${pubkey},${script_tree})`
        : `tr(${pubkey})`
};

export async function createTaprootDescriptorsForBackupkeys(
    masterMnemonic: string,
    backupKeys: State['backupKeys'],
    network: Network
) {
    const keys = await Promise.all(backupKeys.map(async (backupKey) => {
        const key = await generateKeyFrom(backupKey.mnemonic, network);
        const xOnlyPk = toXOnly(key.publicKey).toString('hex');
        return { name: backupKey.name, wifPrivKey: key.toWIF(), xOnlyPk };
    }));
    const internalKey = await generateXOnlyPubKey(masterMnemonic, network);

    if (keys.length == 0) {
        return [
            {
                name: 'watch-only',
                value: DESCRIPTORS.taproot(internalKey.toString('hex'))
            }
        ]
    }

    const outputTree = keys.length > 1
        ? DESCRIPTORS.script_tree(
            keys.map(({ xOnlyPk }) => DESCRIPTORS.pay_to_pubkey(xOnlyPk))
        )
        : DESCRIPTORS.pay_to_pubkey(keys[0].xOnlyPk);

    return [
        {
            name: 'watch-only',
            value: DESCRIPTORS.taproot(internalKey.toString('hex'), outputTree)
        }
    ].concat(
        keys.map((key) => {
            return {
                name: key.name,
                value: DESCRIPTORS.taproot(
                    internalKey.toString('hex'),
                    outputTree.replace(
                        new RegExp(key.xOnlyPk, 'g'),
                        key.wifPrivKey
                    )
                )
            };
        }));
}

export function getAddressesFromDescriptor(descriptors: string[], network: Network) {
    return descriptors.map((value) => {
        const descriptor = new Descriptor({
            expression: value,
            network
        });

        return descriptor.getAddress();
    })
}

export function getChecksumForDescriptor(descriptor: string) {
    return descriptors.checksum(descriptor);
}

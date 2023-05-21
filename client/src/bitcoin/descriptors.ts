import * as tinysecp from "tiny-secp256k1";
import * as descriptors from "@bitcoinerlab/descriptors";
import { Network } from "bitcoinjs-lib";
import { State } from "../State/State";
import { generateKeyFrom, generateXOnlyPubKey, toXOnly } from "./keys";
import assert from "assert";

const { Descriptor } = descriptors.DescriptorsFactory(tinysecp);

export const DESCRIPTORS = {
    pay_to_pubkey: (pubkey: string) => `pk(${pubkey})`,
    older: (n: number) => `older(${n})`,
    and_b: (a: string, b: string) => `and_b(${a},${b})`,
    script_tree: (scripts: string[]) => {
        assert(scripts.length === 2, "Two script children must be supplied");
        return `{${scripts.join(',')}}`;
    },
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
        let timelockNBlocks = backupKey.validFrom
            ? millisecondsToBlockCount(backupKey.validFrom.getTime() - Date.now())
            : undefined;

        return {
            name: backupKey.name,
            wifPrivKey: key.toWIF(),
            xOnlyPk,
            timelockNBlocks
        };
    }));

    const masterKey = await generateKeyFrom(masterMnemonic, network);
    const masterWifPrivKey = masterKey.toWIF();
    const internalKey = toXOnly(masterKey.publicKey);

    if (keys.length == 0) {
        return [
            {
                name: 'watch-only',
                value: DESCRIPTORS.taproot(internalKey.toString('hex'))
            }
        ]
    }

    function createScript(key: typeof keys[number]) {
        const { xOnlyPk, timelockNBlocks } = key;
        return timelockNBlocks
            ? DESCRIPTORS.and_b(DESCRIPTORS.pay_to_pubkey(xOnlyPk), DESCRIPTORS.older(timelockNBlocks))
            : DESCRIPTORS.pay_to_pubkey(xOnlyPk);
    }

    const outputTree = keys.length > 1
        ? createScriptTreeFromList(keys.map(createScript))
        : createScript(keys[0]);

    return [
        {
            name: 'Master Signing Wallet',
            value: DESCRIPTORS.taproot(masterWifPrivKey, outputTree)
        },
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

export function createScriptTreeFromList(scripts: string[]) {
    assert(scripts.length > 1, "Expected at least 2 scripts");
    while (scripts.length > 1) {
        scripts.push(
            DESCRIPTORS.script_tree([
                scripts[0],
                scripts[1]
            ])
        );
        scripts = scripts.slice(2);
    }
    assert(scripts.length === 1, "Expected only root to be left in list");
    return scripts[0];
}

function millisecondsToBlockCount(ms: number) {
    const BLOCK_RATE_PER_MIN = 0.1;
    const minutes = ms / (60 * 1000);
    
    return Math.round(minutes * BLOCK_RATE_PER_MIN);
}

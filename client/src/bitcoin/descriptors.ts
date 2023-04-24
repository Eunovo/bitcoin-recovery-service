import * as tinysecp from "tiny-secp256k1";
import * as descriptors from "@bitcoinerlab/descriptors";
import { Network } from "bitcoinjs-lib";
import { State } from "../State/State";
import { generateXOnlyPubKey } from "./keys";

const { Descriptor } = descriptors.DescriptorsFactory(tinysecp);

export const DESCRIPTORS = {
    pay_to_pubkey: (pubkey: string) => `pk(${pubkey})`,
    script_tree: (scripts: string[]) => `{${scripts.join(',')}}`,
    taproot: (pubkey: string, script_tree?: string) => script_tree
        ? `tr(${pubkey},${script_tree})`
        : `tr(${pubkey})`
};

export async function createTaprootDescriptorsForBackupkeys(masterMnemonic: string, backupKeys: State['backupKeys']) {
    // Each tree node must have two leaves
    if (backupKeys.length == 1) backupKeys.push(backupKeys[0]);
    
    const scriptTree = await Promise.all(backupKeys.map(async (backupKey) => {
        const xOnlyPk = (await generateXOnlyPubKey(backupKey.mnemonic)).toString('hex');
        return xOnlyPk;
    }));
    const internalKey = await generateXOnlyPubKey(masterMnemonic);

    const outputTree = DESCRIPTORS.script_tree(
        scriptTree.map((xOnlyPk) => DESCRIPTORS.pay_to_pubkey(xOnlyPk))
    );

    return [DESCRIPTORS.taproot(internalKey.toString('hex'), outputTree)];
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

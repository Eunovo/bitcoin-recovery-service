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
        ? `tr(${pubkey}, ${script_tree})`
        : `tr(${pubkey})`
};

export async function createTaprootDescriptorsForBackupkeys(masterMnemonic: string, backupKeys: State['backupKeys']) {
    const scriptTree = DESCRIPTORS.script_tree(
        await Promise.all(backupKeys.map(async (backupKey) => {
            const xOnlyPk = await generateXOnlyPubKey(backupKey.mnemonic);
            return DESCRIPTORS.pay_to_pubkey(xOnlyPk.toString('hex'));
        }))
    );
    const internalKey = await generateXOnlyPubKey(masterMnemonic);
    return [DESCRIPTORS.taproot(internalKey.toString('hex'), scriptTree)];
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

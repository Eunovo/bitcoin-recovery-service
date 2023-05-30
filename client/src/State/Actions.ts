import { Signer } from "bitcoinjs-lib"
import { State } from "./State"

export enum ActionKind {
    set_stage = 'set_stage',
    set_mnemonic = 'set_mnemonic',
    set_address = 'set_address',
    set_utxos = 'set_utxos',
    add_backup_key = 'add_backup_key',
    remove_backup_key = 'remove_backup_key',
    set_tx = 'set_tx'
}

export type Action = 
| {
    kind: ActionKind.set_stage,
    payload: State['stage']
}
| {
    kind: ActionKind.set_mnemonic,
    payload: string
}
| {
    kind: ActionKind.set_address,
    payload: {
        address: string;
        signer: Signer;
    }
}
| {
    kind: ActionKind.set_utxos,
    payload: State['utxos']
}
| {
    kind: ActionKind.add_backup_key,
    payload: State['backupKeys'][number]
}
| {
    kind: ActionKind.remove_backup_key,
    payload: {
        by: 'mnemonic',
        value: string
    }
}
| {
    kind: ActionKind.set_tx,
    payload: State['tx']
};
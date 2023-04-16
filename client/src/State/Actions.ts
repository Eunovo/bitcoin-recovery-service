import { State } from "./State"

export enum ActionKind {
    set_stage = 'set_stage',
    set_mnemonic = 'set_mnemonic',
    set_address = 'set_address',
    add_backup_key = 'add_backup_key',
    remove_backup_key = 'remove_backup_key'
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
    payload: string
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
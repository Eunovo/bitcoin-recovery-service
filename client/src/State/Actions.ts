import { State } from "./State"

export enum ActionKind {
    set_stage = 'set_stage',
    set_mnemonic = 'set_mnemonic'
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
import { State } from "./State"

export enum ActionKind {
    set_stage = 'set_stage',
    set_internal_key = 'set_internal_key',
}

export type Action = 
| {
    kind: ActionKind.set_stage,
    payload: State['stage']
}
| {
    kind: ActionKind.set_internal_key,
    payload: string
}

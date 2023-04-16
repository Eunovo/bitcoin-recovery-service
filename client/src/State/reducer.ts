import { Action, ActionKind } from './Actions';
import { State } from './State';

export function reducer(state: State, action: Action) {
    switch (action.kind) {
        case ActionKind.set_stage:
            return { ...state, stage: action.payload };

        case ActionKind.set_mnemonic:
            return { ...state, mnemonic: action.payload };

        default:
            return state;
    }
}

import { Action, ActionKind } from './Actions';
import { State } from './State';

export function reducer(state: State, action: Action) {
    switch (action.kind) {
        case ActionKind.set_stage:
            return { ...state, stage: action.payload };

        case ActionKind.set_mnemonic:
            return { ...state, mnemonic: action.payload };

        case ActionKind.set_address:
            return {
                ...state,
                address: action.payload.address,
                signer: action.payload.signer
            };

        case ActionKind.set_utxos:
            return { ...state, utxos: action.payload };

        case ActionKind.add_backup_key:
            return { ...state, backupKeys: [...state.backupKeys, action.payload] };

        case ActionKind.remove_backup_key:
            const { by, value } = action.payload;
            return {
                ...state,
                backupKeys: state.backupKeys
                    .filter((backupKey) => backupKey[by] !== value)
            };

        case ActionKind.set_tx:
            return {
                ...state,
                tx: action.payload
            };

        default:
            return state;
    }
}

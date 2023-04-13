import { Dispatch } from "react";
import { Action } from "../State/Actions";
import { State } from "../State/State";

export interface StageProps {
    state: State;
    dispatch: Dispatch<Action>
    navigation: JSX.Element;
}

import { FC, Dispatch } from "react";
import { Button, Box } from "@mui/material";
import { State } from "../State/State";
import { Action, ActionKind } from "../State/Actions";

export interface NavigationProps {
    next?: State['stage'];
    prev?: State['stage'];
    dispatch: Dispatch<Action>;
}

export function makeNavigation(dispatch: NavigationProps['dispatch']) {
    return (props: Omit<NavigationProps, 'dispatch'>) => <Navigation dispatch={dispatch} {...props} />
}

export const Navigation: FC<NavigationProps> = ({ prev, next, dispatch }) => {
    return <Box display='flex' alignItems='center' mt={10}>
        {prev && <Button
            onClick={() => dispatch({ kind: ActionKind.set_stage, payload: prev })}
            sx={{ mr: 2 }}
            variant='outlined'
            size='small'
        >Go Back</Button>}
        {next && <Button
            onClick={() => dispatch({ kind: ActionKind.set_stage, payload: next })}
            variant='contained'
            size='small'
        >
            Next
        </Button>}
    </Box>
}

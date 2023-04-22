import { FC, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { ActionKind } from "../State/Actions";
import { StageProps } from "./StageProps";
import { generateMnemonic } from "../bitcoin/keys";

export const GenerateMnemonic: FC<StageProps> = ({ state, dispatch, navigation }) => {
    const mnemonic = useMemo(() => {
        if (state.mnemonic) return state.mnemonic;
        const mnemonic = generateMnemonic();
        dispatch({ kind: ActionKind.set_mnemonic, payload: mnemonic });
        return mnemonic;
    }, [state, dispatch]);

    return <Box>
        <Typography variant='h3'>Write down these words</Typography>
        
        <Typography variant='h6' sx={{
            mt: 4,
            p: 2,
            borderRadius: 2,
            backgroundColor: '#f8f8ff'
        }}>
            {mnemonic}
        </Typography>

        {navigation}
    </Box>
}

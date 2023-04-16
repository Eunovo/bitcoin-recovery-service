import React, { useCallback } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { ContentCopy } from "@mui/icons-material";
import { StageProps } from "./StageProps";
import { generateXOnlyPubKey } from "../bitcoin/keys";
import { usePromise, copyTextToClipboard } from "../utils";
import { generateTaprootAddress } from "../bitcoin/address";
import { ActionKind } from "../State/Actions";

export const PayToApp: React.FC<StageProps> = ({ state, dispatch, navigation }) => {
    const generateAddress = useCallback(async () => {
        if (!state.mnemonic)
            throw new Error('Cannot generate address without mnemonic');

        const internalKey = await generateXOnlyPubKey(state.mnemonic);
        const address = generateTaprootAddress(internalKey);
        if (address) dispatch({ kind: ActionKind.set_address, payload: address });
        return address;
    }, [state.mnemonic]);
    const address = usePromise(generateAddress);

    return <Box>
        <Typography variant='h3'>To continue, send the coins you want to secure to this address:</Typography>

        <Typography variant='h6' sx={{
            mt: 4,
            p: 2,
            borderRadius: 2,
            backgroundColor: '#f8f8ff',
            display: 'flex',
            alignItems: 'center'
        }}>
            {address.value ?? 'Loading...'}
            
            <IconButton
                color='primary'
                sx={{ ml: 'auto' }}
                disabled={!address.value}
                onClick={() => {
                    if (!address.value) return;
                    copyTextToClipboard(address.value);
                }}
            >
                <ContentCopy />
            </IconButton>
        </Typography>

        {navigation}
    </Box>
}

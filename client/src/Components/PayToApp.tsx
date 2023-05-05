import React, { useCallback } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { ContentCopy } from "@mui/icons-material";
import { Signer } from "bitcoinjs-lib";
import { StageProps } from "./StageProps";
import { usePromise, copyTextToClipboard } from "../utils";
import { generateSignerAndTaprootAddress } from "../bitcoin/address";
import { ActionKind } from "../State/Actions";

export const PayToApp: React.FC<StageProps> = ({ state, dispatch, navigation }) => {
    const generateAddress = useCallback(async () => {
        if (!state.mnemonic)
            throw new Error('Cannot generate address without mnemonic');

        const { signer, address } = await generateSignerAndTaprootAddress(state.mnemonic, state.network);
        if (address) dispatch({ kind: ActionKind.set_address, payload: { address, signer } });
        return address;
    }, [state.mnemonic, state.network, dispatch]);
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

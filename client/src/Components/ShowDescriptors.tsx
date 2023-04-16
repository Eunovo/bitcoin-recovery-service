import { FC, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { StageProps } from "./StageProps";
import { TextBoxWithCopy } from "./TextBoxWithCopy";
import { createTaprootDescriptorsForBackupkeys } from "../bitcoin/descriptors";
import { usePromise } from "../utils";

export const ShowDescriptors: FC<StageProps> = ({ state, navigation }) => {
    const createWalletDescriptors = useCallback(() => {
        if (!state.mnemonic) return Promise.resolve(['']);
        return createTaprootDescriptorsForBackupkeys(state.mnemonic, state.backupKeys);
    }, [state.mnemonic, state.backupKeys]);
    const walletDescriptors = usePromise(createWalletDescriptors);
    
    return <Box>
        <Typography variant='h3' sx={{ mb: 4 }}>Copy these Wallet Descriptors</Typography>
        
        {
            walletDescriptors.value?.map((descriptor) => {
                return <Box key={descriptor} sx={{ py: 2 }}>
                    <TextBoxWithCopy content={descriptor} />
                </Box>
            })
        }

        {navigation}
    </Box>
}

import { FC, useCallback } from "react";
import { Box, Button, Typography } from "@mui/material";
import { StageProps } from "./StageProps";
import { ActionKind } from "../State/Actions";
import { generateMnemonic } from "../bitcoin/keys";

export const AddBackupKeys: FC<StageProps> = ({ state, dispatch, navigation }) => {
    const addNewKey = useCallback(() => {
        const mnemonic = generateMnemonic();
        dispatch({
            kind: ActionKind.add_backup_key,
            payload: {
                name: 'Carol',
                mnemonic
            }
        })
    }, [dispatch]);

    return <Box>
        <Typography variant='h3'>Add Backup keys</Typography>
        <Box sx={{ mt: 2, mb: 4, display: 'flex', alignItems: 'center' }}>
            <Button
                color='primary'
                variant='contained'
                onClick={() => addNewKey()}
            >
                Add New Key
            </Button>
        </Box>

        {
            state.backupKeys.map((backupKey) => <Box
                key={backupKey.mnemonic}
                sx={{ py: 2 }}
            >
                <Typography variant='h6' sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: '#f8f8ff'
                }}>
                    {backupKey.mnemonic}
                </Typography>

            </Box>)
        }

        {navigation}
    </Box>
}

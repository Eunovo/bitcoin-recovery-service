import { FC, useCallback, useState } from "react";
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { StageProps } from "./StageProps";
import { ActionKind } from "../State/Actions";
import { generateMnemonic } from "../bitcoin/keys";
import { BackupKeySettings } from "./BackupKeySetting";
import { State } from "../State/State";

export const AddBackupKeys: FC<StageProps> = ({ state, dispatch, navigation }) => {
    const addNewKey = useCallback((settings: Omit<State['backupKeys'][number], 'mnemonic'>) => {
        const mnemonic = generateMnemonic();
        dispatch({
            kind: ActionKind.add_backup_key,
            payload: {
                mnemonic,
                name: settings.name,
                validFrom: settings.validFrom
            }
        })
    }, [dispatch]);
    const removeKeyByMnemonic = useCallback((mnemonic: string) => {
        dispatch({
            kind: ActionKind.remove_backup_key,
            payload: {
                by: 'mnemonic',
                value: mnemonic
            }
        })
    }, [dispatch]);

    return <Box>
        <Typography variant='h3'>Add Backup keys</Typography>
        <Box sx={{ mt: 2, mb: 4, display: 'flex', alignItems: 'center' }}>
            <AddBackupKey addNewKey={addNewKey} />
        </Box>

        {
            state.backupKeys.map((backupKey) => <Box
                key={backupKey.mnemonic}
                sx={{ py: 2 }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant='h6' sx={{ textTransform: 'capitalize', mr: 'auto' }}>
                        {backupKey.name}</Typography>

                    <IconButton
                        color='error'
                        onClick={() => removeKeyByMnemonic(backupKey.mnemonic)}
                    >
                        <DeleteOutline />
                    </IconButton>
                </Box>

                <Typography variant='caption'>
                    {
                        backupKey.validFrom
                            ? `Valid from ${backupKey.validFrom}`
                            : 'Valid immediately'
                    }
                </Typography>

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


const AddBackupKey: FC<{
    addNewKey: (settings: { name: string }) => void
}> = ({ addNewKey }) => {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return <>
        <Button
            color='primary'
            variant='contained'
            onClick={handleClickOpen}
        >
            Add New Key
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Backup key</DialogTitle>
            <DialogContent sx={{ width: '30rem' }}>
                <BackupKeySettings
                    addKey={(settings) => {
                        addNewKey(settings);
                        handleClose();
                    }}
                />
            </DialogContent>
        </Dialog>
    </>
}

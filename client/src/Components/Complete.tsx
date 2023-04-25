import { FC, useCallback } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { StageProps } from "./StageProps";
import { createTransaction } from "../bitcoin/transaction";
import { broadcast, deriveAddresses } from "../bitcoin/network-api";
import { BTC_TO_SATS } from "../constants";
import { createTaprootDescriptorsForBackupkeys } from "../bitcoin/descriptors";
import { usePromise } from "../utils";
import { TextBoxWithCopy } from "./TextBoxWithCopy";

export const Complete: FC<StageProps> = ({ state, navigation }) => {
    const broadcastTx = useCallback(async () => {
        if (!state.signer) return;
        if (!state.mnemonic) return;

        const descriptors = await createTaprootDescriptorsForBackupkeys(
            state.mnemonic,
            state.backupKeys,
            state.network
        );
        const watchOnly = descriptors.find(
            (desc) => desc.name == 'watch-only');
        if (!watchOnly) throw new Error("Could not find watch-only wallet descriptor");
        
        const addresses = await deriveAddresses(watchOnly.value);
        const utxos = state.utxos.map((utxo) => ({
            txid: utxo.txid,
            vout: utxo.vout,
            valueInSats: utxo.amount * BTC_TO_SATS
        }));

        const psbt = createTransaction({
            signer: state.signer,
            network: state.network,
            utxos,
            recipients: [
                {
                    amountInSats: utxos.reduce(
                        (agg, utxo) => agg + utxo.valueInSats, 0
                    ),
                    address: addresses[0]
                }
            ]
        });
        return broadcast(psbt.extractTransaction().toHex())
    }, [state.mnemonic, state.signer, state.backupKeys, state.network, state.utxos]);
    const tx = usePromise(broadcastTx);

    return <Box>
        <Typography sx={{ mb: 4}} variant='h3'>Broadcast transactions</Typography>
        
        {
            tx.loading &&
            <Box sx={{
                display: 'flex'
            }}>
                <CircularProgress thickness={1.0} size={200} sx={{
                    mx: 'auto'
                }} />
            </Box>
        }

        {
            !tx.loading && !tx.error && tx.value?.txid &&
            <Box>
                <Typography sx={{ mb: 2 }} variant='h5'>Success</Typography>

                <Typography>TxId: </Typography>
                <TextBoxWithCopy content={tx.value.txid} />
            </Box>
        }

        {
            !tx.loading && tx.error &&
            <Box>
                <Typography sx={{ mb: 2 }} variant='h5'>An error occurred</Typography>
                <Typography component='div' sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: '#f8f8ff',
                    color: 'error.dark'
                }}>
                    {tx.error.message}
                </Typography>
            </Box>
        }

        {navigation}
    </Box>
}


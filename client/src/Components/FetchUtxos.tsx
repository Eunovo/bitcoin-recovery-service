import { FC, useRef, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { StageProps } from './StageProps';
import { fetchUtxosForAddress } from '../bitcoin/blockstream';
import { ActionKind } from '../State/Actions';

export const FetchUtxos: FC<StageProps> = ({ state, dispatch, navigation }) => {
    const intervalId = useRef<{ state: 'set', value: any } | { state: 'not_set' }>({ state: 'not_set' });

    useEffect(() => {
        const unsetInterval = () => {
            if (intervalId.current.state === 'set') {
                clearInterval(intervalId.current.value);
                intervalId.current = { state: 'not_set' };
            }
        };

        const checkForUtxo = () => {
            if (!state.address) {
                unsetInterval();
                return;
            }
            fetchUtxosForAddress(state.address, state.network)
                .then((data) => {
                    if (data.length > 0) {
                        dispatch({
                            kind: ActionKind.set_utxos,
                            payload: data
                        });
                        unsetInterval();
                    }
                })
                .catch((error) => {
                    console.log(error);
                    unsetInterval();
                });
        };
        unsetInterval();
        intervalId.current = {
            state: 'set',
            value: setInterval(checkForUtxo, 10000)
        };

        return () => { unsetInterval(); }
    }, [state.address, state.network, dispatch]);

    const isLoading = intervalId.current.state === 'set';
    const totalInSatoshis = state.utxos.reduce((agg, utxo) => agg + utxo.value, 0);
    const amountFormatter = new Intl.NumberFormat('en-Us', {
        useGrouping: true
    })

    return <Box>
        <Typography sx={{ mb: 4 }} variant='h3'>
            Please wait while we collect your UTXOs
        </Typography>

        {
            isLoading &&
            <Box sx={{
                display: 'flex'
            }}>
                <CircularProgress thickness={1.0} size={200} sx={{
                    mx: 'auto'
                }} />
            </Box>
        }
        {
            !isLoading &&
            <>
                <Typography component='div' variant='h6' sx={{ mb: 4 }}>
                    Found {amountFormatter.format(totalInSatoshis)} Satoshis
                </Typography>

                {
                    state.utxos.map((utxo) => <Box key={utxo.txid} sx={{
                        py: 2,
                        borderTop: '1px solid #c1c1c1',
                        borderBottom: '1px solid #c1c1c1'
                    }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%'
                        }}>
                            <Typography variant='body2'>Tx ID: {utxo.txid}</Typography>

                            <Typography
                                variant='body2'
                                sx={{
                                    p: 0.5,
                                    backgroundColor: utxo.status.confirmed ? '#a4ffa4' : '#FEBA4F',
                                    ml: 'auto',
                                    borderRadius: 1
                                }}
                            >
                                {utxo.status.confirmed ? 'confirmed' : 'unconfirmed'}
                            </Typography>
                        </Box>
                        <Typography variant='body1'>{amountFormatter.format(utxo.value)} Satoshis</Typography>
                    </Box>)
                }

                {navigation}
            </>
        }
    </Box>
}

import React, { useReducer } from 'react';
import { Box, Container } from '@mui/material';
import { networks } from 'bitcoinjs-lib';
import { reducer } from './State/reducer';
import { State } from './State/State';
import { GenerateMnemonic } from './Components/GenerateMnemonic';
import { PayToApp } from './Components/PayToApp';
import { makeNavigation } from './Components/Navigation';
import { AddBackupKeys } from './Components/AddBackupKeys';
import { ShowDescriptors } from './Components/ShowDescriptors';
import { Complete } from './Components/Complete';
import { FetchUtxos } from './Components/FetchUtxos';

const INITIAL_STATE: State = {
  stage: 'generate_mnemonic',
  network: networks.testnet,
  mnemonic: 'unable famous street merit easily shallow energy target wild hello type electric',
  utxos: [],
  backupKeys: []
};

function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const stage = state.stage;
  const Navigation = makeNavigation(dispatch);
  return (
    <Box sx={{ width: '100vw', minHeight: '100vh' }}>
      <Container maxWidth="md" sx={{ py: 10 }}>
        {
          stage === 'generate_mnemonic' &&
          <GenerateMnemonic
            state={state}
            dispatch={dispatch}
            navigation={Navigation({ next: 'pay_to_app' })} />
        }
        {
          stage === 'pay_to_app' &&
          <PayToApp
            state={state}
            dispatch={dispatch}
            navigation={Navigation({ prev: 'generate_mnemonic', next: 'fetch_utxos' })}
          />
        }
        {
          stage === 'fetch_utxos' &&
          <FetchUtxos
            state={state}
            dispatch={dispatch}
            navigation={Navigation({ prev: 'pay_to_app', next: 'add_backup_keys' })}
          />
        }
        {
          stage === 'add_backup_keys' &&
          <AddBackupKeys
            state={state}
            dispatch={dispatch}
            navigation={Navigation({ prev: 'pay_to_app', next: 'show_descriptors' })}
          />
        }
        {
          stage === 'show_descriptors' &&
          <ShowDescriptors
            state={state}
            dispatch={dispatch}
            navigation={Navigation({ prev: 'add_backup_keys', next: 'complete' })}
          />
        }
        {
          stage === 'complete' &&
          <Complete
            state={state}
            dispatch={dispatch}
            navigation={Navigation({ prev: 'show_descriptors' })}
          />
        }
      </Container>
    </Box>
  );
}

export default App;

import React, { useReducer } from 'react';
import { Box, Container } from '@mui/material';
import { reducer } from './State/reducer';
import { State } from './State/State';
import { GenerateInternalKey } from './Components/GenerateInternalKey';
import { PayToApp } from './Components/PayToApp';
import { makeNavigation } from './Components/Navigation';
import { AddBackupKeys } from './Components/AddBackupKeys';
import { ShowDescriptors } from './Components/ShowDescriptors';
import { Complete } from './Components/Complete';

const INITIAL_STATE: State = {
  stage: 'generate_internal_key'
};

function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const stage = state.stage;
  const Navigation = makeNavigation(dispatch);
  return (
    <Box sx={{ width: '100vw', minHeight: '100vh' }}>
      <Container maxWidth="md" sx={{ py: 10 }}>
        {
          stage === 'generate_internal_key' &&
          <GenerateInternalKey navigation={Navigation({ next: 'pay_to_app' })} />
        }
        {
          stage === 'pay_to_app' &&
          <PayToApp
            navigation={Navigation({ prev: 'generate_internal_key', next: 'add_backup_keys' })}
          />
        }
        {
          stage === 'add_backup_keys' &&
          <AddBackupKeys
            navigation={Navigation({ prev: 'pay_to_app', next: 'show_descriptors' })}
          />
        }
        {
          stage === 'show_descriptors' &&
          <ShowDescriptors
            navigation={Navigation({ prev: 'add_backup_keys', next: 'complete' })}
          />
        }
        {
          stage === 'complete' &&
          <Complete
            navigation={Navigation({ prev: 'show_descriptors' })}
          />
        }
      </Container>
    </Box>
  );
}

export default App;

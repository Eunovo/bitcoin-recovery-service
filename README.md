# Bitcoin Recovery Wallet Generator

This application allows users to generate wallet descriptors for complex spending conditions. It allows the user to create alternative spend-paths that can be used in the event of a lost key. It comes with an easy-to-use Web UI built in React.  
It uses TapScript to create complex outputs and generates the descriptors for this output.

## Running the application

### Running the client  
`cd client & yarn start`

### Client Variables
`REACT_APP_MASTER_MNEMONIC` Used during testing to set a master mnemonic to be used for generating a master key  
`REACT_APP_BACKUP_KEYS` Used during testing to set backup keys. It accepts a stringified array of backup keys in the format `{ "name": "alice", "mnemonic": "..." }`  
`REACT_APP_LOCAL_BITAPI` Url to a Local Bitapi server

## Features

- Regtest support
- Generate wallet master key
- Automatically gather UTXO from master key taproot address
- Add backup keys
- Generate signing wallets for each backup key

## Roadmap

- Add timelock setting to backup keys
- Add expiry date setting to backup keys
- Add threshold settings for backup keys, so that it is possible to require more than one backup key
- Testnet support

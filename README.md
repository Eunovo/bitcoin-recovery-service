# Bitcoin Recovery Wallet Generator

This application allows users to generate wallet descriptors for complex spending conditions. It allows the user to create alternative spend-paths that can be used in the event of a lost key. It comes with an easy-to-use Web UI built in React.  
It uses TapScript to create complex outputs and generates the descriptors for this output.

This project uses tapminiscript features which are still in development and are not supported by the bitcoind release.

## Running the application

### Running the client  
`cd client & yarn start`

### Client Variables
`REACT_APP_MASTER_MNEMONIC` Used during testing to set a master mnemonic to be used for generating a master key  
`REACT_APP_BACKUP_KEYS` Used during testing to set backup keys. It accepts a stringified array of backup keys in the format `{ "name": "alice", "mnemonic": "..." }`  
`REACT_APP_LOCAL_BITAPI` Url to a [Local Bitapi](https://github.com/Eunovo/local-bitapi) server. Local Bitapi acts as a proxy server to the bitcoind server

## Running the tests
`cd client & yarn test:functions`

## Features

- Regtest support
- Generate wallet master key
- Automatically gather UTXO from master key taproot address
- Add backup keys
- Set timelocks on backup keys
- Generate signing wallet descriptor for master key
- Generate watch-only wallet descriptor(with checksum)
- Generate signing wallets descriptors(with checksum) for each backup key


## Roadmap

- Add expiry date setting to backup keys
- Add threshold settings for backup keys, so that it is possible to require more than one backup key
- Testnet support

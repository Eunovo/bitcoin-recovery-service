import { Network, networks } from 'bitcoinjs-lib';
import { Axios, AxiosResponse } from 'axios';

export async function fetchUtxosForAddress(address: string, network: Network) {
    const response: AxiosResponse<string> = await makeBaseAxiosFor(network)
        .get(`/address/${address}/utxo`);
    const data: BlockstreamUTXO[] = response.data ? JSON.parse(response.data) : undefined;
    return data;
}

export async function broadcast(txHex: string, network: Network) {
    const response: AxiosResponse<string> = await makeBaseAxiosFor(network)
        .post('/tx', txHex);
    return response.data;
}

function makeBaseAxiosFor(network: Network) {
    const baseAxios = {
        [networks.testnet.messagePrefix]: new Axios({
            baseURL: `https://blockstream.info/testnet/api`
        })
    }[network.messagePrefix];

    if (!baseAxios)
        throw new Error(`Unsupported Network: Cannot create blockstream api for the network`);

    return baseAxios;
}

export interface BlockstreamUTXO {
    txid: string;
    vout: number;
    status: {
        confirmed: boolean;
        block_height: number;
        block_hash: string;
        block_time: number;
    };
    value: number;
}

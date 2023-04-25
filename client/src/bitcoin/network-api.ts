import { Axios, AxiosResponse } from "axios";
import { Network } from "bitcoinjs-lib";
import { UTXO } from "./UTXO";

const axios = new Axios({
    baseURL: 'http://localhost:4000/api'
})

export async function fetchUtxosForAddress(address: string, _network: Network) {
    const response: AxiosResponse<string> = await axios.get(`/utxos/${address}`);
    const data: UTXO[] = response.data ? JSON.parse(response.data) : undefined;
    return data;
}

export async function broadcast(rawTransaction: string) {
    const response: AxiosResponse<{ txid: string }> = await axios.post(`/transaction`);
    return response.data;
}

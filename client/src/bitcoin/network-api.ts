import { Axios, AxiosResponse } from "axios";
import { Network } from "bitcoinjs-lib";
import { UTXO } from "./UTXO";

const axios = new Axios({
    baseURL: process.env.REACT_APP_LOCAL_BITAPI
})

export async function fetchUtxosForAddress(address: string, _network: Network) {
    const response: AxiosResponse<string> = await axios.get(`/api/utxos/${address}`);
    const data: UTXO[] = response.data ? JSON.parse(response.data) : undefined;
    return data;
}

export async function deriveAddresses(descriptor: string) {
    const response: AxiosResponse<string> = await axios
        .post(
            `/api/descriptor/derive-addresses`,
            JSON.stringify({ descriptor }),
            {
                headers: { 'Content-type': 'application/json' }
            }
        );

    return JSON.parse(response.data).addresses as string[];
}

export async function broadcast(rawTransaction: string): Promise<{ txid: string }> {
    const response: AxiosResponse<string> = await axios
        .post(
            `/api/transaction`,
            JSON.stringify({ rawTransaction }),
            {
                headers: { 'Content-type': 'application/json' }
            }
        );
    return JSON.parse(response.data) as { txid: string };
}

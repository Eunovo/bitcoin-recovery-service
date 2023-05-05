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

export async function deriveAddresses(descriptor: string) {
    const response: AxiosResponse<string> = await axios
        .post(
            `/descriptor/derive-addresses`,
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
            `/transaction`,
            JSON.stringify({ rawTransaction }),
            {
                headers: { 'Content-type': 'application/json' }
            }
        );
    return JSON.parse(response.data) as { txid: string };
}

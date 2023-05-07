import { generateSignerAndTaprootAddress } from '../src/bitcoin/address';
import { fixtures } from './fixtures';

test('generates taproot address for master mnemonic', async () => {
    const { signer, address } = await generateSignerAndTaprootAddress(
        fixtures.master_mnemonic, fixtures.regtest
    );

    expect(address).toBe(fixtures.master_regtest_address);
});

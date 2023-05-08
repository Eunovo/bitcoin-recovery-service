import { generateSignerAndTaprootAddress } from '../src/bitcoin/address';
import { createTaprootDescriptorsForBackupkeys, getChecksumForDescriptor } from '../src/bitcoin/descriptors';
import { fixtures } from './fixtures';

test('generates taproot address for master mnemonic', async () => {
    const { address } = await generateSignerAndTaprootAddress(
        fixtures.master_mnemonic, fixtures.regtest
    );
    expect(address).toBe(fixtures.master_regtest_address);
});

test('generates regtest wallet descriptors', async () => {
    const descriptors = await createTaprootDescriptorsForBackupkeys(
        fixtures.master_mnemonic, fixtures.backup_keys, fixtures.regtest
    );
    expect(descriptors).toStrictEqual(fixtures.regtest_descriptors);
});

test('generates descriptor checksum', async () => {
    const checksum = getChecksumForDescriptor(fixtures.descriptor);
    expect(checksum).toBe(fixtures.checksum);
});

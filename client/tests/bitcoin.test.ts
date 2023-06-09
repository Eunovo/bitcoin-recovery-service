import { generateSignerAndTaprootAddress } from '../src/bitcoin/address';
import {
    createTaprootDescriptorsForBackupkeys,
    getChecksumForDescriptor,
    createScriptTreeFromList
} from '../src/bitcoin/descriptors';
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

test('generates regtest wallet descriptors with odd number of backup keys', async () => {
    const root = createScriptTreeFromList(['a', 'b', 'c', 'd', 'e']);
    expect(root).toBe("{{c,d},{e,{a,b}}}");
});

test('generates descriptor checksum', async () => {
    const checksum = getChecksumForDescriptor(fixtures.descriptor);
    expect(checksum).toBe(fixtures.checksum);
});

test('generate descriptor for timelocked key', async () => {
    const descriptors = await createTaprootDescriptorsForBackupkeys(
        fixtures.mnemonics[0],
        [
            {
                name: 'test-1',
                mnemonic: fixtures.mnemonics[1]
            },
            {
                name: 'test-2',
                mnemonic: fixtures.mnemonics[2],
                validFrom: new Date(Date.now() + fixtures.timelock.period_ms)
            }
        ],
        fixtures.regtest
    );
    expect(descriptors[0].value)
        .toStrictEqual(`tr(${fixtures.privkeys[0]},{pk(${fixtures.pubkeys[1]}),and_v(${fixtures.timelock.fragment},pk(${fixtures.pubkeys[2]}))})`);
});

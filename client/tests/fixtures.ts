import { networks } from 'bitcoinjs-lib';

const mnemonics = [
    "unable famous street merit easily shallow energy target wild hello type electric",
    "apple scorpion artwork onion current exile mention remember bean wave half act",
    "category venue art angry feel spread theory disease lady chair evoke zero"
];
const pubkeys = [
    "0a37756596358b760e3ba6bcce24619373ad933da6e769014b7533dc45c26647",
    "682fb798c690bef83058ee0add8abffe632e308d79ed0f66f4132ca9b4a1d0b2",
    "8386eab71009d1a8d6f04dc39ded027303922cd186a3a2fb9fad19501951c1cc"
];
const privkeys = [
    "",
    "cMntQjDbQ7gwVEtB869fRAFCPw6pxS8XbWnJGvmxkG5AASPNJDZQ",
    "cUMNXaeqtJECFLZ2czc24qZns5GUPSN4Nw25TfC6EQKGqr9LDx22"
];

export const fixtures = {
    master_mnemonic: mnemonics[0],
    master_regtest_address: 'bcrt1p848huu5tyvr8wr92nnhj2rch7xqr7gcvp50skhtewveppcmhkncshh8c3y',
    regtest: networks.regtest,
    mnemonics,
    pubkeys,
    privkeys,
    backup_keys: [
        { "name": "alice", "mnemonic": mnemonics[1] },
        { "name": "bob", "mnemonic": mnemonics[2] }
    ],
    regtest_descriptors: [
        {"name":"watch-only","value":`tr(${pubkeys[0]},{pk(${pubkeys[1]}),pk(${pubkeys[2]})})`},
        {"name":"alice","value":`tr(${pubkeys[0]},{pk(${privkeys[1]}),pk(${pubkeys[2]})})`},
        {"name":"bob","value":`tr(${pubkeys[0]},{pk(${pubkeys[1]}),pk(${privkeys[2]})})`}
    ],
    descriptor: `tr(${pubkeys[0]},{pk(${pubkeys[1]}),pk(${pubkeys[2]})})`,
    checksum: 'ggzu4y5v',
    timelock: {
        period_ms: 90 * 24 * 3600 * 1000, // 90 days in milliseconds
        fragment: 'older(12960)'
    }
}

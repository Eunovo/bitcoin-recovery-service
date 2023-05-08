import { networks } from 'bitcoinjs-lib';

export const fixtures = {
    master_mnemonic: 'unable famous street merit easily shallow energy target wild hello type electric',
    master_regtest_address: 'bcrt1p848huu5tyvr8wr92nnhj2rch7xqr7gcvp50skhtewveppcmhkncshh8c3y',
    regtest: networks.regtest,
    backup_keys: [
        { "name": "alice", "mnemonic": "apple scorpion artwork onion current exile mention remember bean wave half act" },
        { "name": "bob", "mnemonic": "category venue art angry feel spread theory disease lady chair evoke zero" }
    ],
    regtest_descriptors: [
        {"name":"watch-only","value":"tr(0a37756596358b760e3ba6bcce24619373ad933da6e769014b7533dc45c26647,{pk(682fb798c690bef83058ee0add8abffe632e308d79ed0f66f4132ca9b4a1d0b2),pk(8386eab71009d1a8d6f04dc39ded027303922cd186a3a2fb9fad19501951c1cc)})"},
        {"name":"alice","value":"tr(0a37756596358b760e3ba6bcce24619373ad933da6e769014b7533dc45c26647,{pk(cMntQjDbQ7gwVEtB869fRAFCPw6pxS8XbWnJGvmxkG5AASPNJDZQ),pk(8386eab71009d1a8d6f04dc39ded027303922cd186a3a2fb9fad19501951c1cc)})"},
        {"name":"bob","value":"tr(0a37756596358b760e3ba6bcce24619373ad933da6e769014b7533dc45c26647,{pk(682fb798c690bef83058ee0add8abffe632e308d79ed0f66f4132ca9b4a1d0b2),pk(cUMNXaeqtJECFLZ2czc24qZns5GUPSN4Nw25TfC6EQKGqr9LDx22)})"}
    ],
    descriptor: 'tr(0a37756596358b760e3ba6bcce24619373ad933da6e769014b7533dc45c26647,{pk(682fb798c690bef83058ee0add8abffe632e308d79ed0f66f4132ca9b4a1d0b2),pk(8386eab71009d1a8d6f04dc39ded027303922cd186a3a2fb9fad19501951c1cc)})',
    checksum: 'ggzu4y5v'
}

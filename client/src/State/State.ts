export interface State {
    stage: 'generate_mnemonic' | 'pay_to_app' | 'add_backup_keys' | 'show_descriptors' | 'complete';
    mnemonic?: string;
    address?: string;
    backupKeys: {
        mnemonic: string;
        validFrom?: Date;
    }[];
}

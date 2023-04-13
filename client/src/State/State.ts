export interface State {
    stage: 'generate_internal_key' | 'pay_to_app' | 'add_backup_keys' | 'show_descriptors' | 'complete';
    internal_key?: string;
}

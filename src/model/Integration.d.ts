import Resource from './Resource'

export default Integration;

declare class Integration extends Resource {
    id: string;
    type: Integration.Types;

    triggerHook(): Promise<any>
}

declare namespace Integration {
    export enum Types {
        BitBucket = 'bitbucket',
        HipChat = 'hipchat',
        GitHub = 'github',
        Webhook = 'webhook',
    }
}

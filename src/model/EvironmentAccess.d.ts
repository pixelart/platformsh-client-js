import Account from './Account';
import Resource from './Resource'
import User from './User';

export default EnvironmentAccess;

declare class EnvironmentAccess extends Resource {
    id: string;
    user: string;
    email: string;
    role: EnvironmentAccess.Roles;
    environment: string;

    getAccount(): Account;

    getUser(): User;
}

declare namespace EnvironmentAccess {
    export enum Roles {
        ROLE_ADMIN = 'admin',
        ROLE_VIEWER = 'viewer',
        ROLE_CONTRIBUTOR = 'contributor',
    }
}

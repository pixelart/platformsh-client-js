import Account from './Account';
import Resource from './Resource'
import User from './User';

export default ProjectAccess;

declare class ProjectAccess extends Resource {
    id: string;
    role: ProjectAccess.Roles;
    user: string;

    getAccount(): Account;

    getUser(): User;
}

declare namespace ProjectAccess {
    export enum Roles {
        ROLE_ADMIN = 'admin',
        ROLE_VIEWER = 'viewer',
    }
}

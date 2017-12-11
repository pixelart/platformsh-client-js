import {authentication} from './authentication';
import Project from './model/Project';

export default class Client {
    constructor(authenticationConfig: authentication.AuthenticationConfig);

    getProjects(): Promise<Project[]>;
    getProject(id: string): Promise<Project>;
}

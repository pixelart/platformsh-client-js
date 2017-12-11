import Activity from './Activity';
import Certificate from './Certificate';
import Domain from './Domain';
import Environment from './Environment';
import Integration from './Integration';
import ProjectAccess from './ProjectAccess';
import ProjectLevelVariable from './ProjectLevelVariable';
import Resource from './Resource'
import Result from './Result';

export default Project;

declare class Project extends Resource {
    id: string;
    title: string;
    created_at: string;
    updated_at: string;
    owner: string;
    subscription: Project.Subscription;
    subscription_id: string;
    status: string;
    endpoint: string;
    repository: Project.Repository;
    region: string;
    region_label: string;

    getSubscriptionId(): number;

    getGitUrl(): string;

    getUsers(): ProjectAccess[];

    addUser(user: string, role: ProjectAccess.Roles, byUuid: boolean): Result;

    getEnvironment(id: string): Promise<Environment>;

    getEnvironments(limit?: number): Promise<Environment[]>;

    getDomains(limit: number): Domain[];

    addDomain(name: string, ssl: any[]): Result;

    getIntegrations(limit: number): Integration[];

    addIntegration(type: Integration.Types, data: object): Result;

    getActivity(id: string): Activity|false;

    getActivities(types: Integration.Types[], starts_at: number): Activity[];

    isSuspended(): boolean;

    getVariables(): ProjectLevelVariable[];

    setVariable(name: string, value: any, json: boolean , visibleBuild: boolean , visibleRuntime: boolean): Result

    getVariable(name: string): ProjectLevelVariable|false;

    getCertificates(): Certificate[]

    addCertificate(certificate: string, key: string, chain: string[]): Result;
}

declare namespace Project {
    interface Repository {
        client_ssh_key: string;
        url: string;
    }

    interface Subscription {
        environments: number;
        included_users: 1;
        license_uri: string;
        plan: string;
        restricted: boolean;
        storage: number;
        subscription_management_uri: string;
        suspended: boolean;
        user_licenses: number;
    }
}

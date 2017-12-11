import Activity from './Activity';
import EnvironmentAccess from './EvironmentAccess';
import Integration from './Integration';
import Metrics from './Metrics';
import Resource from './Resource'
import Result from './Result';
import Route from './Route';
import Variable from './Variable';

export default Environment;

declare class Environment extends Resource {
    data: any;
    id: string;
    status: string;
    head_commit: string;
    name: string;
    parent: string;
    machine_name: string;
    restrict_robots: boolean;
    title: string;
    created_at: string;
    updated_at: string;
    project: string;
    is_dirty: boolean;
    enable_smtp: boolean;
    has_code: boolean;
    deployment_target: string;
    http_access: Environment.HttpAccess;
    is_main: boolean;

    getSshUrl(app?: string): string;

    branch(title: string, id: string): Activity;

    sanitizeId(proposed: string): string;

    delete(): Result;

    isActive(): boolean;

    deactivate(): Activity;

    merge(): Activity;

    synchronize(data: boolean, code: boolean): Activity;

    backup(): Promise<Activity>;

    getActivity(id: string): Activity|false;

    getActivities(types: Integration.Types[], starts_at: number): Activity[];

    getVariables(limit: number): Variable[];

    setVariable(name: string, value: any, isJson: boolean): Result;

    getVariable(id: string): Variable|false;

    setRoute(values: Route.Route): Route;

    getRoute(id: string): Route;

    getRoutes(): Route[];

    getRouteUrls(): string[];

    initialize(profile: string, repository: string): Activity;

    getUser(id: string): EnvironmentAccess|false;

    getUsers(): EnvironmentAccess[];

    addUser(user: string, role: EnvironmentAccess.Roles, byUuid: boolean): Result

    removeUser(id: string): EnvironmentAccess|false;

    getMetrics(query: string): Metrics;
}

declare namespace Environment {
    interface HttpAccess {
        addresses: HttpAccessAddresses[];
        basic_auth: object;
    }

    interface HttpAccessAddresses {
        permission: string;
        address: string;
    }
}

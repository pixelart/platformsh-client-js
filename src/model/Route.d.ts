import Resource from './Resource'

export default Route;

declare class Route extends Resource implements Route.Route {
    id: string;
    project: string;
    environment: string;
    route: Route.RouteDefinition;
    cache: Route.CacheSettings;
    ssi: Route.SsiSettings;
    upstream: string;
    to: string;
    type: string;
}

declare namespace Route {
    export interface Route {
        id: string;
        project: string;
        environment: string;
        route: RouteDefinition;
        cache: CacheSettings;
        ssi: SsiSettings;
        upstream: string;
        to: string;
        type: string;
    }

    interface RouteDefinition {
        host: string,
        path: string,
        scheme: string,
    }

    interface CacheSettings {
        cookies: string[];
        default_ttl: number;
        enabled: boolean;
        headers: string[];
    }

    interface SsiSettings {
        enabled: boolean
    }
}

export function setConfig(newConfig: config.Config): void;
export function getConfig(): config.Config;

declare namespace config {
    export interface Config {
        client_id?: string;
        account_url?: string;
        api_url?: string;
        authentication_url?: string;
        scope?: string[];
        authorization?: string;
        logout_url?: string;
        redirect_uri?: string;
    }
}

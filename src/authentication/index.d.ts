import {config} from '../config';

export default function (authenticationConfig: authentication.AuthenticationConfig, reset: boolean): Promise<string>

declare namespace authentication {
    export interface AuthenticationConfig extends config.Config {
        api_token?: string;
        access_token?: string;
    }
}

import Resource from './Resource'
import Result from './Result';

export default Variable;

declare class Variable extends Resource {
    id: string;
    name: string;
    project: string;
    environment: string;
    value: string;
    is_enabled: boolean;
    is_json: boolean;
    created_at: string;
    updated_at: string;
    inherited: boolean;

    disable(): Result;
}

import Resource from './Resource'

export default Domain;

declare class Domain extends Resource {
    key: string;
    id: string;
    certificate: string;
    chain: string[];
    domains: string[];
    expires_at: string;
    updated_at: string;
    is_provisioned: boolean;
    issuer: string[];
}

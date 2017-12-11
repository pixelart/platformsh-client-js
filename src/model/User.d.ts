import Resource from './Resource'

export default User;

declare class User extends Resource {
    id: string;
    created_at: string;
    updated_at: string;
    has_key: boolean;
    display_name: string;
    email: string;
}

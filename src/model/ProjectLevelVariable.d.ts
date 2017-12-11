import Resource from './Resource'

export default ProjectLevelVariable;

declare class ProjectLevelVariable extends Resource {
    id: string;
    name: string;
    value: string;
    is_json: boolean;
    visible_build: boolean;
    visible_runtime: boolean;
    created_at: string;
    updated_at: string;
}

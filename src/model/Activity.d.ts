export default Activity;

declare class Activity {
    id: string;
    completion_percent: number;
    log: string;
    created_at: string;
    updated_at: string;
    environments: string[];
    completed_at: string;
    parameters: object;
    project: string;
    state: Activity.State;
    result: string;
    started_at: string;
    type: string;
    payload: object;

    wait(onPoll?: Activity.OnPoll, onLog?: Activity.OnLog, pollInterval?: number): Promise<Activity>;

    isComplete(): boolean;

    getCompletionPercent(): number;

    restore(): Activity;

    getDescription(): string;
}

declare namespace Activity {
    type OnPoll = (activity: Activity) => void;
    type OnLog = (message: string) => void;

    enum State {
        RESULT_SUCCESS = 'success',
        RESULT_FAILURE = 'failure',
        STATE_COMPLETE = 'complete',
        STATE_IN_PROGRESS = 'in_progress',
        STATE_PENDING = 'pending',
    }
}

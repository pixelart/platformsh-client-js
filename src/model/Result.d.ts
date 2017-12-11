import Activity from './Activity';
import Resource from './Resource';

export default Result;

declare class Result {
    data: object;

    countActivities(): number;

    getActivities(): Activity[];

    getEntity(): Resource;
}

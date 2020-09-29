import { IAngularProject } from './i-angular-project';

export interface IAngularJson {
    projects: {[name: string]: IAngularProject};
}

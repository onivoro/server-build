import { IAngularProject } from './angular-project.interface';

export interface IAngularJson {
    projects: {[name: string]: IAngularProject};
}

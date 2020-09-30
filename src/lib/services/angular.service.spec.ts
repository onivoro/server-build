import { AngularJsonPath } from '../env/angular-json-path';
import { AngularService } from './angular.service';

xdescribe(AngularService.name, () => {
    let subject: AngularService;
    let pathToJson: AngularJsonPath;

    beforeAll(() => {
        pathToJson = new AngularJsonPath();
        subject = new AngularService(pathToJson);
    });

    describe(AngularService.prototype.buildProject.name, () => {
        let projectName: string;

        describe('GIVEN project name is defined', () => {
            beforeEach(() => {
                projectName = 'server-app-vscx';
            });

            describe('GIVEN building a node project', () => {

                it('worx', (done) => {
                    subject.buildProject(projectName).subscribe(
                        (d) => {
                            expect(d).toEqual(expect.anything());
                        },
                        fail,
                        () => {
                            done();
                        },
                    );
                }, 45999);
            });
        });
    });
});

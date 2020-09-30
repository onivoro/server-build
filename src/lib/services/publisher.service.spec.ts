import { parse } from 'path';
import { AngularJsonPath } from '../env/angular-json-path';
import { OniJsonPath } from '../env/oni-json-path';
import { AngularService } from './angular.service';
import { OniService } from './oni.service';
import { PublisherService } from './publisher.service';
import { UtilService } from './util.service';
import { PackageJsonTemplatePipe } from '../templates/package-json-template.pipe';


xdescribe(PublisherService.name, () => {
    let subject: PublisherService;
    let pathToAngularJson: AngularJsonPath;
    let pathToOniJson: OniJsonPath;
    let cwd: string;

    beforeAll(() => {
        pathToAngularJson = new AngularJsonPath();
        cwd = parse(pathToAngularJson.value()).dir;
    });

    beforeAll(() => {
        pathToOniJson = new OniJsonPath();
    });

    beforeEach(async () => {
        subject = new PublisherService(new AngularService(pathToAngularJson), new OniService(pathToOniJson, new PackageJsonTemplatePipe()), new UtilService());
    });

    describe('publishProject', () => {

        describe.each([
            'arbitraryNameGoesHere'
        ])('GIVEN project name is defined', (projectName) => {

            describe('GIVEN building a node project', () => {

                it('worx', (done) => {
                    subject.publishProject(projectName, cwd).subscribe(
                        (d) => {
                            expect(d).toEqual(expect.anything());
                        },
                        (e) => fail(e),
                        () => {
                            done();
                        },
                    );
                }, 45999);
            });
        });
    });
});

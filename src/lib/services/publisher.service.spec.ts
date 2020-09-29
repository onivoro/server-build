import { Test } from '@nestjs/testing';
import { parse } from 'path';
import { AngularJsonPath } from '../env/angular-json-path';
import { OniJsonPath } from '../env/oni-json-path';
import { AngularService } from './angular.service';
import { OniService } from './oni.service';
import { PublisherService } from './publisher.service';
import { UtilService } from './util.service';

describe(PublisherService.name, () => {
    let subject: PublisherService;
    let pathToAngularJson: AngularJsonPath;
    let pathToOniJson: OniJsonPath;
    let cwd: string;

    beforeAll(() => {
        pathToAngularJson = new AngularJsonPath();
        pathToAngularJson.value = '/Users/lee.norris/github.com/onivoro/oni/angular.json';
        cwd = parse(pathToAngularJson.value).dir;
    });

    beforeAll(() => {
        pathToOniJson = new OniJsonPath();
        pathToOniJson.value = '/Users/lee.norris/github.com/onivoro/oni/oni.json';
    });

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                { provide: AngularJsonPath, useValue: pathToAngularJson },
                { provide: OniJsonPath, useValue: pathToOniJson },
                AngularService,
                OniService,
                PublisherService,
                UtilService
            ]
        }).compile();

        subject = moduleRef.get<PublisherService>(PublisherService);
    });

    describe('publishProject', () => {

        describe.each([
            'server-app-vscx',
            'server-disk'
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

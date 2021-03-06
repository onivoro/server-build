import { Module } from '@nestjs/common';
import { AngularJsonPath } from '../env/angular-json-path';
import { NxJsonPath } from '../env/nx-json-path';
import { OniJsonPath } from '../env/oni-json-path';

import { AngularService } from '../service/angular.service';
// import { AwsService } from '../service/aws.service'; // make separate module
import { NxService } from '../service/nx.service';
import { OniService } from '../service/oni.service';
import { PublisherService } from '../service/publisher.service';
// import { S3Service } from '../service/s3.service'; // w/ awsservice
import { UtilService } from '../service/util.service';
import { ArchitectBuildTemplatePipe } from '../templates/architect-build-template.pipe';
import { PackageJsonTemplatePipe } from '../templates/package-json-template.pipe';

const paths = [
    AngularJsonPath,
    NxJsonPath,
    OniJsonPath
];

const pipes = [
    ArchitectBuildTemplatePipe,
    PackageJsonTemplatePipe
];

const providers = [
    ...paths,
    ...pipes,
    AngularService,
    NxService,
    OniService,
    PublisherService,
    UtilService,
];
@Module({
    providers,
    exports: providers
})
export class ServerBuildModule {

}
import { Module } from '@nestjs/common';
import { AngularJsonPath } from '../env/angular-json-path';
import { NxJsonPath } from '../env/nx-json-path';
import { OniJsonPath } from '../env/oni-json-path';

import { AngularService } from '../service/angular.service';
import { AwsService } from '../service/aws.service';
import { NxService } from '../service/nx.service';
import { OniService } from '../service/oni.service';
import { PublisherService } from '../service/publisher.service';
import { S3Service } from '../service/s3.service';
import { UtilService } from '../service/util.service';

const paths = [
    AngularJsonPath,
    NxJsonPath,
    OniJsonPath
];

const providers = [
    ...paths,
    AngularService,
    AwsService,
    NxService,
    OniService,
    PublisherService,
    S3Service,
    UtilService,
];
@Module({
    providers,
    exports: providers
})
export class ServerBuildModule {

}
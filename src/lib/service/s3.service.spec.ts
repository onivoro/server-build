import { of } from 'rxjs';
import { S3Service } from './s3.service';

describe(S3Service.name, () => {
    let s3Svc: S3Service;
    let execRx: any;

    beforeAll(() => {
        execRx = jest.fn().mockReturnValue(of('result'));
        s3Svc = new S3Service({ endpointUrl: 'endpointUrl', profile: 'profile', execRx });
    });
    describe(S3Service.prototype.publish.name, () => {
        it('invokes s3 cp', (done) => {
            const src = 'src';
            const dest = 'dest';
            s3Svc.publish(src, dest).subscribe((_result: any) => {
                expect(execRx).toHaveBeenCalledWith('awslocal --endpoint-url=endpointUrl s3 rm s3://dest/ --recursive  && awslocal --endpoint-url=endpointUrl s3 cp src s3://dest/ --acl public-read --recursive --profile profile');
                done();
            }, fail)
        });
    });
});
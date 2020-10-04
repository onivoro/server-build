export class AwsService {
    program: string;
    constructor(props: {endpointUrl?: string}) {
        this.program = props?.endpointUrl ? `awslocal --endpoint-url=${props?.endpointUrl}` : `aws`;
    }
}
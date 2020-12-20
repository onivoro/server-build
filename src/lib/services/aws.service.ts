import { execRx } from '@onivoro/server-process';

export class AwsService {
    program: string;
    profile: string;
    endpointUrl: string;
    execRx: any;

    constructor(props: {endpointUrl?: string, profile?: string, execRx?: any}) {
        this.execRx = props.execRx || execRx;
        this.profile = props.profile;
        this.endpointUrl = props.endpointUrl;
        this.program = props?.endpointUrl ? `awslocal --endpoint-url=${props?.endpointUrl}` : `aws`;
    }

    protected exec (cmd: string) {
        const profile = this.profile ? ` --profile ${this.profile}` : '';
        return this.execRx(`${cmd}${profile}`);
    }
}
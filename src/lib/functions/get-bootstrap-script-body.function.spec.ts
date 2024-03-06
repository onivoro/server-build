import { getBootstrapScriptBody } from './get-bootstrap-script-body.function';

describe('getBootstrapScriptBody', () => {
    it('templates a script file', () => {
        expect(getBootstrapScriptBody('region-goes-here', 'bucket.goes.here', 'app-goes-here')).toMatchSnapshot();
    });
});
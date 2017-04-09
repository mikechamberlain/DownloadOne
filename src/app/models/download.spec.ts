import { Download } from './download';

describe('Download', () => {

    it('should create an instance', () => {
        const download = new Download('url');

        expect(download.url).toEqual('url');
    });

    it('should create an id', () => {
        const download = new Download('');

        expect(typeof download.id).toEqual('string');
    });

});

import { DownloadQueueService } from './download-queue.service';
import { Download } from "../models/download";

describe('DownloadQueueService', () => {
    let service: DownloadQueueService;

    beforeEach(() => {
        service = new DownloadQueueService();
    });

    it('should initialize with an empty queue', () => {
        expect(service.queue).toEqual([]);
    });

    it('should enqueue a download', () => {
        const download = new Download('');

        service.enqueue(download);

        expect(service.queue).toEqual([download]);
    });
});

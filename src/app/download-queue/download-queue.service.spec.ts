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

    it('should emit an empty queue on intialization', () => {
        let queue: Download[];
        service.changes.subscribe(q => queue = q);

        expect(queue).toEqual([]);
    });

    it('should enqueue a download', () => {
        const download = new Download('');

        service.enqueue(download);

        expect(service.queue).toEqual([download]);
    });

    it('should emit a change on enqueue', () => {
        let queue: Download[];
        service.changes.subscribe(q => queue = q);
        const download = new Download('');

        service.enqueue(download);

        expect(queue).toEqual([download]);
    });
});

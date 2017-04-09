import { DownloadQueueService } from './download-queue.service';
import { Download } from "../models/download";
import { DownloadMessage } from "../messaging/download-message";
import { Subject } from "rxjs";

describe('DownloadQueueService', () => {
    let service: DownloadQueueService;
    let messageBusService: any;

    beforeEach(() => {
        messageBusService = {
            messages: new Subject<DownloadMessage>(),
            sendPrepareDownload: () => {}
        };
        service = new DownloadQueueService(messageBusService);

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

    it('should add to downloads object', () => {
        const download = new Download('');

        service.enqueue(download);

        expect(service.downloads[download.id]).toEqual(download);
    });
});

import { Injectable } from '@angular/core';
import { Download } from "../models/download";
import { Observable, ReplaySubject } from "rxjs";
import { MessageBusService } from "../messaging/message-bus.service";
import { DownloadPreparedMessage, DownloadMessage, DownloadProgressMessage } from "../messaging/download-message";

@Injectable()
export class DownloadQueueService {
    private _downloads: { [key: string]: Download };
    private _queue: Download[];
    private queueSubject: ReplaySubject<Download[]>;

    constructor(private bus: MessageBusService) {
        this._queue = [];
        this._downloads = {};
        this.queueSubject = new ReplaySubject<Download[]>();
        this.queueSubject.next(this._queue);

        bus.messages.subscribe((msg: DownloadPreparedMessage) => {
            const download = this._downloads[msg.downloadId];

            if (msg instanceof DownloadPreparedMessage) {
                download.length = msg.length;
                download.fullPath = msg.fullPath;
                download.fd = msg.fd;

                // TODO: move to director
                this.bus.sendDownloadFile(download);
                download.state = 'active';
            }

            if (msg instanceof DownloadProgressMessage) {
                download.bytesDownloaded = msg.bytesDownloaded;

                if (download.length === msg.bytesDownloaded) {
                    download.state = 'completed';
                }
            }
        });
    }

    enqueue(download: Download): void {
        this._queue.push(download);
        this._downloads[download.id] = download;
        this.queueSubject.next(this._queue);
        this.bus.sendPrepareDownload(download);
    }

    get queue(): Download[] {
        return this._queue;
    }

    get downloads(): { [key: string]: Download } {
        return this._downloads;
    }

    get changes(): Observable<Download[]> {
        return this.queueSubject.asObservable();
    }
}

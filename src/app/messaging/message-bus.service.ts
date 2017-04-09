import { Injectable, NgZone } from '@angular/core';
import { Download } from "../models/download";
import { Observable, Subject } from "rxjs";
import { DownloadPreparedMessage, DownloadMessage, DownloadProgressMessage } from "./download-message";
declare const electron: any;

@Injectable()
export class MessageBusService {
    private messagesSubject: Subject<DownloadMessage>;

    constructor(private zone: NgZone) {
        this.messagesSubject = new Subject<DownloadMessage>();

        electron.ipcRenderer.on('download-prepared', (event, arg: any) => {
            zone.run(() => {
                const msg = new DownloadPreparedMessage(arg.downloadId, arg.fd, arg.fullPath, arg.length);
                this.messagesSubject.next(msg);
            });
        });

        electron.ipcRenderer.on('download-progress', (event, arg: any) => {
            zone.run(() => {
                const msg = new DownloadProgressMessage(arg.downloadId, arg.bytesDownloaded);
                this.messagesSubject.next(msg);
            });
        });
    }

    get messages(): Observable<DownloadMessage> {
        return this.messagesSubject.asObservable();
    }

    sendPrepareDownload(download: Download): void {
        electron.ipcRenderer.send('prepare-download', {
            url: download.url,
            downloadId: download.id
        });
    }

    sendDownloadFile(download: Download): void {
        electron.ipcRenderer.send('download-chunk', {
            url: download.url,
            downloadId: download.id,
            fd: download.fd
        });
    }
}

import { Injectable } from '@angular/core';
import { Download } from "../models/download";
import { Observable, ReplaySubject } from "rxjs";
declare const electron: any;
const http = electron.remote.require('http');
const fs = electron.remote.require('fs');


@Injectable()
export class DownloadQueueService {
    private downloads: Download[];
    private queueSubject: ReplaySubject<Download[]>;

    constructor() {
        this.downloads = [];
        this.queueSubject = new ReplaySubject<Download[]>();
        this.queueSubject.next(this.downloads);
    }

    enqueue(download: Download): void {
        var req = http.get('http://speedtest.ftp.otenet.gr/files/test100k.db');
        req.on('connect', function(res) {
            res.pipe(fs.createWriteStream('~/Downloads/poo'));
        });

        this.downloads.push(download);
        this.queueSubject.next(this.downloads);
    }

    get queue(): Download[] {
        return this.downloads;
    }

    get changes(): Observable<Download[]> {
        return this.queueSubject.asObservable();
    }
}

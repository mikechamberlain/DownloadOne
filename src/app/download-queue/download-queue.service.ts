import { Injectable } from '@angular/core';
import { Download } from "../models/download";
import { Observable, ReplaySubject } from "rxjs";

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

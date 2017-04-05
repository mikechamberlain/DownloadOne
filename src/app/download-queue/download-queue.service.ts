import { Injectable } from '@angular/core';
import { Download } from "../models/download";
import { Observable } from "rxjs";

@Injectable()
export class DownloadQueueService {
    private downloads: Download[] = [];

    enqueue(download: Download): void {
        this.downloads.push(download);
    }

    get queue(): Download[] {
        return this.downloads;
    }
}

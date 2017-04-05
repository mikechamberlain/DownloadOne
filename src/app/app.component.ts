import { Component, OnInit } from '@angular/core';
import { Download } from "./models/download";
import { DownloadQueueService } from "./download-queue/download-queue.service";

@Component({
    selector: 'dl-root',
    styleUrls: ['./app.component.scss'],
    template: `
        <dl-new-download (newDownload)="addDownload($event)"></dl-new-download>
        <dl-download-queue [queue]="queue"></dl-download-queue>
    `
})
export class AppComponent implements OnInit {
    queue: Download[];

    constructor(private queueService: DownloadQueueService) {
    }

    ngOnInit(): void {
        this.queueService.changes.subscribe(q => this.queue = q);
    }

    addDownload(download: Download) {
        this.queueService.enqueue(download);
    }
}

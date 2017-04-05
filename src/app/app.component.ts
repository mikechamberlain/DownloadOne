import { Component } from '@angular/core';
import { Download } from "./models/download";
import { DownloadQueueService } from "./download-queue/download-queue.service";

@Component({
    selector: 'dl-root',
    styleUrls: ['./app.component.scss'],
    template: `
        <dl-new-download (newDownload)="addDownload($event)"></dl-new-download>
        <dl-download-queue></dl-download-queue>
    `
})
export class AppComponent {
    constructor(private queueService: DownloadQueueService) {
    }

    addDownload(download: Download) {
        this.queueService.enqueue(download);
    }
}

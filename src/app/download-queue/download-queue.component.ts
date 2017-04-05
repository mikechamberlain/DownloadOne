import { Component, OnInit } from '@angular/core';
import { DownloadQueueService } from "./download-queue.service";

@Component({
    selector: 'dl-download-queue',
    template: `
        <p>
            Downloads:
        </p>
        <div *ngFor="let download of queueService.queue">
            {{download.url}}
        </div>
    `,
    styleUrls: ['./download-queue.component.scss']
})
export class DownloadQueueComponent implements OnInit {

    constructor(public queueService: DownloadQueueService) {
    }

    ngOnInit() {
    }

}

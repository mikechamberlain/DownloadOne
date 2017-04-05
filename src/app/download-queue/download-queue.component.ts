import { Component, Input, OnInit } from '@angular/core';
import { DownloadQueueService } from "./download-queue.service";
import { Download } from "../models/download";

@Component({
    selector: 'dl-download-queue',
    template: `
        <p>
            Downloads:
        </p>
        <div *ngFor="let download of queue">
            {{download.url}}
        </div>
    `,
    styleUrls: ['./download-queue.component.scss']
})
export class DownloadQueueComponent implements OnInit {
    @Input() queue: Download[];

    ngOnInit(): void {
    }
}

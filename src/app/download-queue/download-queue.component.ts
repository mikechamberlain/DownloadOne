import { Component, Input, OnInit } from '@angular/core';
import { Download } from "../models/download";

@Component({
    selector: 'dl-download-queue',
    template: `
        <p>
            Downloads:
        </p>
        <dl-download-file *ngFor="let download of queue"
            [download]="download">
        </dl-download-file>
    `
})
export class DownloadQueueComponent implements OnInit {
    @Input() queue: Download[];

    ngOnInit(): void {
    }
}

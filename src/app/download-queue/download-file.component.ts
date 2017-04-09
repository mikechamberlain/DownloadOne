import { Component, Input, OnInit } from '@angular/core';
import { Download } from "../models/download";

@Component({
    selector: 'dl-download-file',
    styleUrls: ['download-file.component.scss'],
    template: `        
        <h3>{{download.url}}</h3>
        <p>{{download.state}}</p>
        <p>{{download.fullPath}}</p>
        <p *ngIf="download.bytesDownloaded">{{download.bytesDownloaded}} / {{download.length}}</p>
        <div class="progress" [style.width]="(download.fractionComplete * 100) + '%'"></div>
    `
})
export class DownloadFileComponent implements OnInit {
    @Input() download: Download;

    ngOnInit(): void {
    }
}

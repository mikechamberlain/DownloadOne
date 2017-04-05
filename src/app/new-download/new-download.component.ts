import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Download } from "../models/download";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'dl-new-download',
    styleUrls: ['./new-download.component.scss'],
    template: `
        <div [formGroup]="form">
            <input type="text" formControlName="url"/>{{url}}
            <button (click)="addDownload()">Add</button>
        </div>
    `,
})
export class NewDownloadComponent implements OnInit {
    @Output() newDownload: EventEmitter<Download> = new EventEmitter<Download>();

    form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            url: ['', Validators.required]
        });
    }

    addDownload() {
        this.newDownload.emit(new Download(this.form.value.url));
        this.form.patchValue({ url: ''});
    }
}

import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { NewDownloadComponent } from './new-download.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Download } from "../models/download";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { click, typeInto } from "../../testing/helpers";

describe('NewDownloadComponent', () => {
    let component: NewDownloadComponent;
    let fixture: ComponentFixture<NewDownloadComponent>;
    let addDownloadButtonEl: DebugElement;
    let urlInputEl: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule],
            declarations: [NewDownloadComponent]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NewDownloadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    beforeEach(() => {
        addDownloadButtonEl = fixture.debugElement.query(By.css('button'));
        urlInputEl = fixture.debugElement.query(By.css('input'));
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit a new download with the URL set to the URL input box', fakeAsync(() => {
        let newDownload: Download;
        component.newDownload.subscribe(d => newDownload = d);

        typeInto(urlInputEl, 'url');
        click(addDownloadButtonEl);

        expect(newDownload.url).toEqual('url');
    }));

    it('should clear the URL input box after emitting a new download', fakeAsync(() => {
        let newDownload: Download;
        component.newDownload.subscribe(d => newDownload = d);

        typeInto(urlInputEl, 'url');
        click(addDownloadButtonEl);

        expect(urlInputEl.nativeElement.value).toEqual('');
    }));
});

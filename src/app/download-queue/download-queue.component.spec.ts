import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadQueueComponent } from './download-queue.component';
import { DownloadQueueService } from "./download-queue.service";
import { DownloadComponent } from "./download.component";

describe('DownloadQueueComponent', () => {
    let component: DownloadQueueComponent;
    let fixture: ComponentFixture<DownloadQueueComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DownloadQueueComponent, DownloadComponent],
            providers: [DownloadQueueService]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DownloadQueueComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

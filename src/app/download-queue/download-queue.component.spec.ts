import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadQueueComponent } from './download-queue.component';
import { DownloadQueueService } from "./download-queue.service";

describe('DownloadQueueComponent', () => {
    let component: DownloadQueueComponent;
    let fixture: ComponentFixture<DownloadQueueComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DownloadQueueComponent],
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

import { TestBed, async, ComponentFixtureAutoDetect, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { NewDownloadComponent } from "./new-download/new-download.component";
import { DownloadQueueComponent } from "./download-queue/download-queue.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DownloadQueueService } from "./download-queue/download-queue.service";
import { MessageBusService } from "./messaging/message-bus.service";
import { DownloadComponent } from "./download-queue/download.component";

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                FormsModule,
                ReactiveFormsModule
            ],
            declarations: [
                AppComponent,
                DownloadComponent,
                NewDownloadComponent,
                DownloadQueueComponent
            ],
            providers: [
                DownloadQueueService,
                MessageBusService,
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // it('should create the app', async(() => {
    //     expect(component).toBeTruthy();
    // }));
});

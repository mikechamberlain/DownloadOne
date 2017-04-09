import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewDownloadComponent } from './new-download/new-download.component';
import { DownloadQueueComponent } from './download-queue/download-queue.component';
import { DownloadQueueService } from "./download-queue/download-queue.service";
import { MessageBusService } from "./messaging/message-bus.service";
import { DownloadFileComponent } from "./download-queue/download-file.component";

@NgModule({
    declarations: [
        AppComponent,
        DownloadFileComponent,
        NewDownloadComponent,
        DownloadQueueComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        AppRoutingModule
    ],
    providers: [DownloadQueueService, MessageBusService],
    bootstrap: [AppComponent]
})
export class AppModule {
}

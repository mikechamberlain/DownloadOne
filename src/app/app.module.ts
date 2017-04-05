import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewDownloadComponent } from './new-download/new-download.component';
import { DownloadQueueComponent } from './download-queue/download-queue.component';
import { DownloadQueueService } from "./download-queue/download-queue.service";

@NgModule({
    declarations: [
        AppComponent,
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
    providers: [DownloadQueueService],
    bootstrap: [AppComponent]
})
export class AppModule {
}

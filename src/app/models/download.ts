import { UUID } from "angular2-uuid";

export class Download {
    id: string;
    url: string;
    fullPath: string;
    fd: number;
    length: number;
    bytesDownloaded: number;
    state: DownloadState;

    constructor(url: string) {
        this.id = UUID.UUID();
        this.url = url;
        this.bytesDownloaded = 0;
        this.state = 'queued';
    }

    get fractionComplete(): number {
        if (!this.length) {
            return 0;
        }
        return this.bytesDownloaded / this.length;
    }
}

export type DownloadState = 'active' | 'queued' | 'forced' | 'paused' | 'completed';

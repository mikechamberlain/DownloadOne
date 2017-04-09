import { Download } from "../models/download";

export abstract class DownloadMessage {
    constructor(public downloadId: string) {
    }
}

export class DownloadPreparedMessage extends DownloadMessage {

    constructor(
        downloadId: string,
        public fd: number,
        public fullPath: string,
        public length: number,
    ) {
        super(downloadId);
    }
}

export class DownloadProgressMessage extends DownloadMessage {

    constructor(
        downloadId: string,
        public bytesDownloaded: number
    ) {
        super(downloadId);
    }
}

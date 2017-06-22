/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/6/17
 * @description:
 */

export default class DownloadTask{
    constructor(song, jobId, progressCallback) {
        this.song = song;
        this.jobId = jobId;
        this.progressCallback = progressCallback;
    }
}
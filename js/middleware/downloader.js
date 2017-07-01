/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/6/17
 * @description:
 */
let RNFS = require('react-native-fs');
import showToast from '../util/toast'
import realm from '../util/realm'
import DownloadTask from '../model/bean/DownloadTask'
import { local } from '../action/song'
import {
    PRE_TASK,
    STOP_TASK,
    FINISH_TASK,
    createTask,
    finishTask,
    updateProgress
} from '../action/download'

let storeInstance;

const downloadMiddleware = store => next => action => {
    storeInstance = store;
    const thisState = store.getState();
    const result = next(action);
    const newState = store.getState();
    const actionType = String(action.type);
    switch (actionType) {
        case PRE_TASK:
            create(action.song);
            break;
        case STOP_TASK:
            RNFS.stopDownload(action.jobId);
            break;
        case FINISH_TASK:
            let currentSong = thisState.downloadTasks.filter((downloadTask) => downloadTask.jobId === action.jobId)[0].currentSong;
            realm.insertLocaledSong(currentSong);
            RNFS.stopDownload(action.jobId);
            storeInstance.dispatch(local(currentSong));
            break;
    }
    return result;
};

export default downloadMiddleware;

const beginCallback = (res, song) => {
    showToast('已添加到下载队列');
    storeInstance.dispatch(createTask(new DownloadTask(song, res.jobId, null)));
};

const progressCallback = (callback) => {
    storeInstance.dispatch(updateProgress(callback));
};

const resultCallback = (result) => {
    storeInstance.dispatch(finishTask(result.jobId));
};

async function create(song) {
    let existDir = await RNFS.exists(RNFS.ExternalStorageDirectoryPath + '/MoeFM').then(boolean => boolean);
    if (!existDir) await RNFS.mkdir(RNFS.ExternalStorageDirectoryPath + '/MoeFM');
    let exist = await RNFS.exists(RNFS.ExternalStorageDirectoryPath + '/MoeFM/' + song.title + '.mp3').then(boolean => boolean);
    if (!exist) {
        RNFS.downloadFile({
            fromUrl: song.url,
            toFile: RNFS.ExternalStorageDirectoryPath + '/MoeFM/' + song.title + '.mp3',
            background: true,
            begin: ((res) => beginCallback(res, song)),
            progress: (progressCallback)
        }).promise.then((result) => {
            resultCallback(result);
        }).catch((err) => {
                if(err.description === "cancelled") {
                    // cancelled by user
                }
                console.log(err);
        });
    }
}
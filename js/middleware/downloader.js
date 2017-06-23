/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/6/17
 * @description:
 */
let RNFS = require('react-native-fs');
import showToast from '../util/toast'
import realm from '../util/realm'
import DownloadTask from '../model/bean/DownloadTask'

//actions
const UPDATE_PROGRESS = 'UPDATE_PROGRESS';  //更新进度
const PRE_TASK = 'PRE_TASK';                //准备任务
const CREATE_TASK = 'CREATE_TASK';          //创建任务
const STOP_TASK = 'STOP_TASK';              //停止任务
const FINISH_TASK = 'FINISH_TASK';          //完成任务

let storeInstance;

const downloadMiddleware = store => next => action => {
    storeInstance = store;
    const thisState = store.getState();
    const result = next(action);
    const newState = store.getState();
    const actionType = String(action.type);
    switch (actionType) {
        case PRE_TASK:
            createTask(action.song);
            break;
        case STOP_TASK:
            RNFS.stopDownload(action.jobId);
            break;
        case FINISH_TASK:
            let currentSong = thisState.downloadTasks.filter((downloadTask) => downloadTask.jobId === action.jobId)[0].currentSong;
            realm.insertLocaledSong(currentSong);
            RNFS.stopDownload(action.jobId);
            storeInstance.dispatch({type: 'LOCAL', song: currentSong});
            break;
    }
    return result;
};

export default downloadMiddleware;

const beginCallback = (res, song) => {
    showToast('已添加到下载队列');
    storeInstance.dispatch({type: CREATE_TASK, downloadTask: new DownloadTask(song, res.jobId, null)});
};

const progressCallback = (callback) => {
    console.log(callback);
    storeInstance.dispatch({type: UPDATE_PROGRESS, progressCallback: callback});
};

const resultCallback = (result) => {
    storeInstance.dispatch({type: FINISH_TASK, jobId: result.jobId});
};

async function createTask(song) {
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
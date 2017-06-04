/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/5/19
 * @description:
 */
import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';

//actions
const ADD_SONG = 'ADD_SONG';        //增加歌曲
const ADD_SONGS = 'ADD_SONGS';      //批量增加歌曲
const PUSH_SONG = 'PUSH_SONG';      //新增歌曲并播放
const DELETE_SONG = 'DELETE_SONG';  //删除歌曲
const CLEAR_SONGS = 'CLEAR_SONGS';  //清空歌曲
const CUT_SONG = 'CUT_SONG';        //切到指定歌曲
const NEXT_SONG = 'NEXT_SONG';      //上一首歌
const LAST_SONG = 'LAST_SONG';      //下一首歌
const PAUSE = 'PAUSE';              //暂停、恢复
const SWITCH_MODE = 'SWITCH_MODE';  //切换播放模式
const PROGRESS = 'PROGRESS';            //当前进度
const SEEK_PROGRESS = 'SEEK_PROGRESS';  //指定进度

let storeInstance;

const streamMiddleware = store => next => action => {
    storeInstance = store;
    const thisState = store.getState();
    const result = next(action);
    const newState = store.getState();
    const actionType = String(action.type);

    switch (actionType) {
        case CUT_SONG:
            init(newState.playList[newState.currentIndex].url);
            break;
        case PUSH_SONG:
            init(action.song.url);
            break;
        case NEXT_SONG:
            init(newState.playList[newState.currentIndex].url);
            break;
        case LAST_SONG:
            init(newState.playList[newState.currentIndex].url);
            break;
        case PAUSE:
            play(newState.isPlaying);
            break;
        case SWITCH_MODE:
            //记录播放模式
            break;
        case SEEK_PROGRESS:
            seek(newState.progressTime);
            break;
    }
    return result;
};

export default streamMiddleware;

let progressCountDown;
let currentTime = 0;

const init = (url) => {
    console.log('url: '+ url);
    ReactNativeAudioStreaming.play(url, {showIniOSMediaCenter: true, showInAndroidNotifications: true});
    startProgress();
};

const play = (isPlaying) => {
    if (isPlaying) {
        ReactNativeAudioStreaming.pause();
        stopProgress();
    } else {
        ReactNativeAudioStreaming.resume();
        startProgress();
    }
};

const seek = (time) => {
    ReactNativeAudioStreaming.seekToTime(time);
};

const startProgress = () => {
    progressCountDown = setInterval(() => {
        storeInstance.dispatch({type: PROGRESS, time: currentTime++});
        if (currentTime >= storeInstance.getState().totalTime) {
            stopProgress();
            storeInstance.dispatch({type: NEXT_SONG});
        }
    },1000);
};

const stopProgress = () => {
    clearInterval(progressCountDown);
};
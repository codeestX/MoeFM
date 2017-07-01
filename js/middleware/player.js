/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/5/19
 * @description:
 */

import {
    ADD_SONGS,
    POINT_SONG,
    NEXT_SONG,
    LAST_SONG,
    PAUSE,
    SEEK_PROGRESS,
    nextSong,
    progress
} from '../action/song'

let Sound = require('react-native-sound');
let storeInstance;

const playerMiddleware = store => next => action => {
    storeInstance = store;
    const thisState = store.getState();
    const result = next(action);
    const newState = store.getState();
    const actionType = String(action.type);
    if (newState === thisState) {
        return result;
    }
    switch (actionType) {
        case ADD_SONGS:
            if (!thisState.songs.isPlaying && newState.songs.isPlaying && newState.songs.currentSong !== null) {
                init(newState.songs.currentSong.url);
            }
            break;
        case POINT_SONG:
            init(action.song.url);
            break;
        case NEXT_SONG:
            if (newState.songs.isPlaying) {
                init(newState.songs.currentSong.url);
            }
            break;
        case LAST_SONG:
            init(newState.songs.currentSong.url);
            break;
        case PAUSE:
            play(newState.songs.isPlaying);
            break;
        case SEEK_PROGRESS:
            seek(newState.songs.progressTime);
            break;
    }
    return result;
};

export default playerMiddleware;

let singletonSong = null;
let progressCountDown;

const init = (url) => {
    if (singletonSong !== null) {
        release();
    }
    console.log('url: '+ url);
    singletonSong = new Sound(url, '', (e) => {
        if (e) {
            console.log('failed to load the sound', e);
            return;
        }
        setTimeout(() => play(true), 200);
        startProgress();
    });
};

const play = (isPlaying) => {
    if (!isPlaying) {
        singletonSong.pause();
        stopProgress();
    } else {
        singletonSong.play((success) => {
            if (success) {
                console.log('successfully finished playing');
                releaseAndNext();
            } else {
                console.log('playback failed due to audio decoding errors');
            }
        });
        startProgress();
    }
};

const release = () => {
    stopProgress();
    singletonSong.release();
};

const releaseAndNext = () => {
    //自然播放结束
    release();
    storeInstance.dispatch(nextSong(true))
};

const seek = (time) => {
    singletonSong.setCurrentTime(time);
};

const startProgress = () => {
    if (singletonSong !== null) {
        progressCountDown = setInterval(() => {
            singletonSong.getCurrentTime((seconds) => storeInstance.dispatch(progress(seconds)));
        },1000);
    }
};

const stopProgress = () => {
    if (singletonSong !== null) {
        clearInterval(progressCountDown);
    }
};
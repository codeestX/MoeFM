/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/7/1
 * @description:
 */

export const ADD_SONG = 'ADD_SONG';        //增加歌曲
export const ADD_SONGS = 'ADD_SONGS';      //批量增加歌曲
export const POINT_SONG = 'POINT_SONG';    //指定歌曲并播放
export const DELETE_SONG = 'DELETE_SONG';  //删除歌曲
export const CLEAR_SONGS = 'CLEAR_SONGS';  //清空歌曲
export const NEXT_SONG = 'NEXT_SONG';      //上一首歌
export const LAST_SONG = 'LAST_SONG';      //下一首歌
export const PAUSE = 'PAUSE';              //暂停、恢复
export const SWITCH_MODE = 'SWITCH_MODE';  //切换播放模式
export const PROGRESS = 'PROGRESS';                    //当前进度
export const SEEK_PROGRESS = 'SEEK_PROGRESS';          //指定进度
export const LOVE = 'LOVE';            //点击喜欢
export const LOCAL = 'LOCAL';          //点击下载

export const addSong = () => {
    return {
        type: ADD_SONG,
    };
};

export const addSongs = (songs) => {
    return {
        type: ADD_SONGS,
        songs: songs
    };
};

export const pointSong = (song) => {
    return {
        type: POINT_SONG,
        song: song
    };
};

export const deleteSong = (index) => {
    return {
        type: DELETE_SONG,
        index: index
    };
};

export const clearSong = () => {
    return {
        type: CLEAR_SONGS,
    };
};

export function nextSong(isFinish) {
    return {
        type: NEXT_SONG,
        isFinish: isFinish
    };
}

export function lastSong(isFinish) {
    return {
        type: LAST_SONG,
        isFinish: isFinish
    };
}

export const pause = () => {
    return {
        type: PAUSE
    };
};

export const switchMode = () => {
    return {
        type: SWITCH_MODE
    };
};

export const progress = (time) => {
    return {
        type: PROGRESS,
        time: time
    };
};

export const seekProgress = (time) => {
    return {
        type: SEEK_PROGRESS,
        time: time
    };
};

export const love = (song) => {
    return {
        type: LOVE,
        song: song
    };
};

export const local = (song) => {
    return {
        type: LOCAL,
        song: song
    };
};
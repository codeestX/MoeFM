/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/5/17
 * @description:
 */

import showToast from '../util/toast'

//actions
const ADD_SONG = 'ADD_SONG';        //增加歌曲
const ADD_SONGS = 'ADD_SONGS';      //批量增加歌曲
const POINT_SONG = 'POINT_SONG';    //指定歌曲并播放
const DELETE_SONG = 'DELETE_SONG';  //删除歌曲
const CLEAR_SONGS = 'CLEAR_SONGS';  //清空歌曲
const NEXT_SONG = 'NEXT_SONG';      //上一首歌
const LAST_SONG = 'LAST_SONG';      //下一首歌
const PAUSE = 'PAUSE';              //暂停、恢复
const SWITCH_MODE = 'SWITCH_MODE';  //切换播放模式
const PROGRESS = 'PROGRESS';                    //当前进度
const SEEK_PROGRESS = 'SEEK_PROGRESS';          //指定进度
const LOVE = 'LOVE';            //点击喜欢
const LOCAL = 'LOCAL';          //点击下载

//playMode
const LOOP_MODE = 'loop';
const ONE_MODE = 'one';
const SHUFFLE_MODE = 'shuffle';

export default function (state, action) {
    if (!state) {
        state = {
            playList: [],           //当前歌单

            currentSong: null,      //当前歌曲信息
            currentIndex: 0,        //当前歌曲序号

            progressTime: 0,        //当前歌曲进度, 秒
            playMode: 'loop',       //当前播放模式
            isPlaying: false,       //当前播放状态
        }
    }
    switch (action.type) {
        case ADD_SONG:
            let newSongIndex = state.playList.findIndex((it) => it.id === action.song.id);
            return newSongIndex !== -1? state:
            {
                ...state,
                playList: [...state.playList, action.song]
            };
        case ADD_SONGS:
            let diffSongs = action.songs.filter((it) => !state.playList.some((item) => item.id === it.id)); //去重
            return state.isPlaying?
            {
                ...state,
                playList: state.playList.concat(diffSongs)
            }
            :
            {
                ...state,
                playList: state.playList.concat(diffSongs),
                isPlaying: true,
                currentSong: diffSongs[0]
            };
        case POINT_SONG:
            let pushSongIndex = state.playList.findIndex((it) => it.id === action.song.id);
            return pushSongIndex !== -1?
                {
                    ...state,
                    currentSong: action.song,
                    currentIndex: pushSongIndex,
                    isPlaying: true
                }
                :
                {
                    ...state,
                    playList: [...state.playList, action.song],
                    currentSong: action.song,
                    currentIndex: state.playList.length - 1,
                    isPlaying: true
                };
        case DELETE_SONG:
            return {
                ...state,
                playList: [
                    ...state.playList.slice(0, action.index),
                    ...state.playList.slice(action.index + 1)
                ]
            };
        case CLEAR_SONGS:
            return {
                ...state,
                playList: []
            };
        case NEXT_SONG:
            if (state.playList.length === 1) {
                showToast('当前只有一首歌');
                return {
                    ...state,
                    isPlaying: action.isFinish? false: state.isPlaying
                };
            }
            if (state.currentIndex + 1 >= state.playList.length) {
                showToast('已经是最后一首歌了');
                return {
                    ...state,
                    isPlaying: action.isFinish? false: state.isPlaying
                };
            }
            switch (state.playMode) {
                case LOOP_MODE: //顺序播放
                    return {
                        ...state,
                        currentSong: state.playList[state.currentIndex + 1],
                        currentIndex: state.currentIndex + 1,
                        isPlaying: true
                    };
                    break;
                case ONE_MODE:  //单曲循环
                    return {
                        ...state,
                        currentSong: state.playList[state.currentIndex],
                        currentIndex: state.currentIndex,
                        isPlaying: true
                    };
                    break;
                case SHUFFLE_MODE:  //随机播放
                    let randomIndex = parseInt(Math.random() * state.playList.length);
                    return {
                        ...state,
                        currentSong: state.playList[randomIndex],
                        currentIndex: randomIndex,
                        isPlaying: true
                    };
                    break;
            }


            return {
                ...state,
                currentSong: state.playList[state.currentIndex + 1],
                currentIndex: state.currentIndex + 1,
                isPlaying: true
            };
        case LAST_SONG:
            if (state.playList.length === 1) {
                showToast('当前只有一首歌');
                return state;
            }
            if (state.currentIndex - 1 < 0) {
                showToast('已经是第一首歌了');
                return state;
            }
            return {
                ...state,
                currentSong: state.playList[state.currentIndex - 1],
                currentIndex: state.currentIndex - 1,
                isPlaying: true
            };
        case PAUSE:
            return {
                ...state,
                isPlaying: !state.isPlaying
            };
        case SWITCH_MODE:
            return {
                ...state,
                playMode: getPlayMode(state.playMode)
            };
        case PROGRESS: {
            return {
                ...state,
                progressTime: action.time
            };
        }
        case SEEK_PROGRESS: {
            return {
                ...state,
                progressTime: action.time
            };
        }
        case LOVE: {
            return {
                ...state,
                playList: state.playList.map((item, index) => {
                    if(state.playList[index].id !== action.song.id) {
                        return item;
                    }
                    return {
                        ...item,
                        isLoved: !item.isLoved
                    };
                }),
                currentSong: action.song.id === state.currentSong.id? {
                    ...state.currentSong,
                    isLoved: !state.currentSong.isLoved
                }: state.currentSong
            }
        }
        case LOCAL: {
            return {
                ...state,
                playList: state.playList.map((item, index) => {
                    if(state.playList[index].id !== action.song.id) {
                        return item;
                    }
                    return {
                        ...item,
                        isLocaled: !item.isLocaled
                    };
                }),
                currentSong: action.song.id === state.currentSong.id? {
                    ...state.currentSong,
                    isLocaled: !state.currentSong.isLocaled
                }: state.currentSong
            }
        }
        default:
            return state
    }
}

function getPlayMode(mode) {
    switch (mode) {
        case LOOP_MODE:
            return ONE_MODE;
        case ONE_MODE:
            return SHUFFLE_MODE;
        case SHUFFLE_MODE:
            return LOOP_MODE;
    }
}
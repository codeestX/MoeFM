/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/6/17
 * @description:
 */

import {
    UPDATE_PROGRESS,
    PRE_TASK,
    CREATE_TASK,
    STOP_TASK,
    FINISH_TASK,
} from '../action/download'

export default function (state, action) {
    if (!state) {
        state = {
            downloadTasks: [],           //当前下载任务
        }
    }
    switch (action.type) {
        case UPDATE_PROGRESS:
            return {
                ...state,
                downloadTasks: state.downloadTasks.map((item, index) => {
                    if(state.downloadTasks[index].jobId !== action.jobId) {
                        return item;
                    }
                    return {
                        ...item,
                        progressCallback: action.progressCallback
                    };
                })
            };
        case CREATE_TASK:
            return {
                ...state,
                downloadTasks: [...state.downloadTasks, action.downloadTask]
            };
            break;
        case STOP_TASK:
            return {
                ...state,
                downloadTasks: state.downloadTasks.filter((it) => it.jobId !== action.jobId)
            };
            break;
        case FINISH_TASK:
            return {
                ...state,
                downloadTasks: state.downloadTasks.filter((it) => it.jobId !== action.jobId)
            };
            break;
        default:
            return state
    }
}
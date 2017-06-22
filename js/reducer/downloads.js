/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/6/17
 * @description:
 */

//actions
const UPDATE_PROGRESS = 'UPDATE_PROGRESS';  //更新进度
const PRE_TASK = 'PRE_TASK';                //准备任务
const CREATE_TASK = 'CREATE_TASK';          //创建任务
const STOP_TASK = 'STOP_TASK';              //停止任务
const FINISH_TASK = 'FINISH_TASK';          //完成任务

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
                        ...action.progressCallback
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
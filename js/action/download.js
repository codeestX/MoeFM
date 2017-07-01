/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/7/1
 * @description:
 */

export const UPDATE_PROGRESS = 'UPDATE_PROGRESS';  //更新进度
export const PRE_TASK = 'PRE_TASK';                //准备任务
export const CREATE_TASK = 'CREATE_TASK';          //创建任务
export const STOP_TASK = 'STOP_TASK';              //停止任务
export const FINISH_TASK = 'FINISH_TASK';          //完成任务

export const updateProgress = (progressCallback) => {
    return {
        type: UPDATE_PROGRESS,
        progressCallback: progressCallback
    };
};

export const preTask = (song) => {
    return {
        type: PRE_TASK,
        song: song
    };
};

export const createTask = (downloadTask) => {
    return {
        type: CREATE_TASK,
        downloadTask: downloadTask
    };
};

export const stopTask = (jobId) => {
    return {
        type: STOP_TASK,
        jobId: jobId
    };
};

export const finishTask = (jobId) => {
    return {
        type: FINISH_TASK,
        jobId: jobId
    };
};
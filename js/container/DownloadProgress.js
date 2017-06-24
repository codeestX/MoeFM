/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/6/17
 * @description:
 */

import React, {Component} from 'react'
import { connect } from 'react-redux'
import GlobalStyle from '../style/global'
import ProgressBar from '../component/ProgressBar'

class DownloadProgress extends Component {

    static defaultProps = {
        progressCallback: null,
    };

    getCurrentValue() {
        if (this.props.progressCallback) {
            return parseFloat(this.props.progressCallback.bytesWritten) / this.props.progressCallback.contentLength;
        }
        return 0;
    }

    render() {
        return (
            <ProgressBar fillStyle={{height: 3, backgroundColor: 'red'}}
                         backgroundStyle={{backgroundColor: 'white'}}
                         progress={this.getCurrentValue()}/>

        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        progressCallback: state.downloads.downloadTasks.filter((downloadTask) => downloadTask.jobId === ownProps.jobId)[0].progressCallback
    }
};

export default connect(
    mapStateToProps,
    null
)(DownloadProgress)
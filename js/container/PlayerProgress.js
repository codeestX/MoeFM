/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/5/26
 * @description:
 */

import React, {Component} from 'react'
import { connect } from 'react-redux'
import GlobalStyle from '../style/global'
import date from '../util/date'
import ProgressBar from '../component/ProgressBar'

class PlayerProgress extends Component {

    static defaultProps = {
        progressTime: 0,
        totalTime: 0
    };

    getCurrentValue() {
        if (this.props.progressTime && this.props.totalTime) {
            return parseFloat(this.props.progressTime) / this.props.totalTime;
        }
        return 0;
    }

    render() {
        return (
            <ProgressBar fillStyle={{height: 3, backgroundColor: 'red'}}
                         backgroundStyle={{backgroundColor: 'white'}}
                         style={{width: GlobalStyle.window_width}}
                         progress={this.getCurrentValue()}/>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        progressTime: state.songs.progressTime,
        totalTime: date.parseString2Second(state.songs.currentSong.time)
    }
};

export default connect(
    mapStateToProps,
    null
)(PlayerProgress)
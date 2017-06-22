/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/6/5
 * @description:
 */

import React, {Component} from 'react'
import { connect } from 'react-redux'
import {
    Image,
} from 'react-native'
import CustomButton from '../component/CustomButton'

class DownloadButton extends Component {

    getLocalIcon(isLoved) {
        return isLoved? require('../images/ic_downloaded.png'): require('../images/ic_download.png');
    }

    async handleLocal() {
        if (this.props.currentSong) {
            if (!this.props.currentSong.isLocaled) {
                if (this.props.onPreTask) {
                    this.props.onPreTask(this.props.currentSong);
                }
            }
        }
    }

    render() {
        return (
            <CustomButton onPress={() => this.handleLocal()}>
                <Image style={this.props.innerStyle} source={this.getLocalIcon(this.props.currentSong.isLocaled)}/>
            </CustomButton>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentSong: state.songs.currentSong,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onPreTask: (currentSong) => {
            dispatch({type: 'PRE_TASK', song: currentSong})
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DownloadButton)
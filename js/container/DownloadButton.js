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
import realm from '../util/realm'
import CustomButton from '../component/CustomButton'

class DownloadButton extends Component {

    getLocalIcon(isLoved) {
        return isLoved? require('../images/ic_downloaded.png'): require('../images/ic_download.png');
    }

    handleLocal() {
        if (this.props.currentSong) {
            if (this.props.currentSong.isLocaled) {
                realm.deleteLocaledSong(this.props.currentSong.id);
            } else {
                realm.insertLocaledSong(this.props.currentSong);
                //Download
            }
        }
        if (this.props.onDownload) {
            this.props.onDownload();
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
        onDownload: () => {
            dispatch({type: 'LOCAL'})
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DownloadButton)
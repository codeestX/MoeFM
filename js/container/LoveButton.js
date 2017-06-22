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

class LoveButton extends Component {

    getLoveIcon(isLoved) {
        return isLoved? require('../images/ic_loved.png'): require('../images/ic_love.png');
    }

    handleLove() {
        if (this.props.currentSong) {
            if (this.props.currentSong.isLoved) {
                realm.deleteLovedSong(this.props.currentSong.id);
            } else {
                realm.insertLovedSong(this.props.currentSong);
            }
            if (this.props.onLove) {
                this.props.onLove(this.props.currentSong);
            }
        }
    }

    render() {
        return (
            <CustomButton onPress={() => this.handleLove()}>
                <Image style={this.props.innerStyle} source={this.getLoveIcon(this.props.currentSong.isLoved)}/>
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
        onLove: (song) => {
            dispatch({type: 'LOVE', song: song})
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoveButton)
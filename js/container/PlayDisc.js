/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/5/26
 * @description:
 */

import React, {Component} from 'react'
import {
    View,
    Image,
    Animated,
    Easing
} from 'react-native'
import { connect } from 'react-redux'

class PlayDisc extends Component {

    constructor(props) {
        super(props);
        this.currentValue = 0;
        this.isRunning = false;
        this.state = {
            rotateAnim: new Animated.Value(0)
        };
    }

    runAnimation(value) {
        this.isRunning = true;
        this.state.rotateAnim.setValue(value);
        Animated.timing(
            this.state.rotateAnim,
            {
                toValue: 360,
                easing: Easing.linear,
                duration: 20000 * (360 - value) / 360,
            }
        ).start((event) => {
            if (event.finished) {
                this.runAnimation(0);
            }
        });
    }

    storeValue = (value) => {
        this.currentValue = value;
    };

    stopAnimation() {
        this.isRunning = false;
        this.state.rotateAnim.stopAnimation((value) => this.storeValue(value));
    }

    componentDidMount() {
        if (this.props.isPlaying) {
            this.runAnimation(0);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isPlaying && !this.isRunning) {
            this.runAnimation(this.currentValue);
        } else if (!nextProps.isPlaying && this.isRunning){
            this.stopAnimation();
        }
    }

    render() {
        return (
            <View style={{position: 'relative', alignItems: 'center', justifyContent: 'center', marginTop: 60}}>
                <Image style={{width: 260, height: 260}} source={require('../images/ic_disc.png') }/>
                <Animated.Image style={{position: 'absolute', transform: [{rotate: this.state.rotateAnim.interpolate({
                    inputRange: [0, 360],
                    outputRange: ['0deg', '360deg']
                })}],
                    top: 35,
                    left: 35,
                    borderRadius: 100,
                    }}
                       source={{uri: this.props.currentSong.cover, width: 190, height: 190}}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isPlaying: state.songs.isPlaying,
        currentSong: state.songs.currentSong
    }
};

export default connect(
    mapStateToProps,
    null
)(PlayDisc)
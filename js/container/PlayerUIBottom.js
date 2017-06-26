/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/6/7
 * @description:
 */

import React, {Component} from 'react'
import { connect } from 'react-redux'
import {
    StyleSheet,
    View,
    Text,
    Image,
    Animated
} from 'react-native'
import Interactable from 'react-native-interactable';
import CustomButton from '../component/CustomButton'
import PlayerProgress from '../container/PlayerProgress'
import PlayButtonBottom from '../container/PlayButtonBottom'
import PlayList from '../container/PlayList'
import GlobalStyle from '../style/global'

class PlayerUIBottom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            snapToIndex: 0
        };
        this._deltaY = new Animated.Value(GlobalStyle.window_height-200);
    }

    handleNext() {
        if (this.props.onNext) {
            this.props.onNext()
        }
    }

    handleState = () => {
        this.refs['headInstance'].snapTo({index: this.state.snapToIndex});
        this.setState({
            snapToIndex: this.state.snapToIndex === 0? 1: 0
        });
    };

    render() {
        if (this.props.currentSong === null || this.props.currentSong === undefined) {
            return null;
        }
        return (
            <View style={styles.panelContainer}>
                <Interactable.View
                    ref='headInstance'
                    verticalOnly={true}
                    snapPoints={[{y: GlobalStyle.window_height-400}, {y: GlobalStyle.window_height-135}]}
                    boundaries={{top: GlobalStyle.window_height-400}}
                    initialPosition={{y: GlobalStyle.window_height-135}}
                    animatedValueY={this._deltaY}>
                    <View>
                        <CustomButton onPress={() => this.props.onPress()}>
                            <View style={{height: 55, backgroundColor: 'white'}}>
                                <PlayerProgress/>
                                <View style={styles.headerContainer}>
                                    <Image source={{uri: this.props.currentSong.cover, width: 30, height: 30}}/>
                                    <Text style={{flex: 1, marginLeft: 10}} numberOfLines={1}>{this.props.currentSong.title}</Text>
                                    <PlayButtonBottom innerStyle={styles.icon}/>
                                    <CustomButton onPress={this.handleNext.bind(this)}>
                                        <Image style={styles.icon} source={require('../images/bottom_next.png')}/>
                                    </CustomButton>
                                    <CustomButton onPress={this.handleState}>
                                        <Image style={styles.icon} source={require('../images/bottom_list.png')}/>
                                    </CustomButton>
                                </View>
                                <Text style={{height: 0.5, backgroundColor: 'gray', width: GlobalStyle.window_width, marginTop: 3}}/>
                            </View>
                        </CustomButton>
                        <PlayList />
                    </View>
                </Interactable.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    icon: {
        width: 40,
        height: 40,
    },
    headerContainer: {
        flexDirection: 'row',
        marginVertical: 3,
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    panelContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
});

const mapStateToProps = (state) => {
    return {
        currentSong: state.songs.currentSong,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onNext: () => {
            dispatch({type: 'NEXT_SONG'})
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerUIBottom)
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
} from 'react-native'
import {
    BottomSheetHeader,
    BottomSheetBehavior,
} from 'react-native-bottom-sheet-behavior'
import CustomButton from '../component/CustomButton'
import PlayerProgress from '../container/PlayerProgress'
import PlayButtonBottom from '../container/PlayButtonBottom'
import PlayList from '../container/PlayList'
import GlobalStyle from '../style/global'

const { STATE_ANCHOR_POINT, STATE_COLLAPSED } = BottomSheetBehavior;

class PlayerUIBottom extends Component {

    handleNext() {
        if (this.props.onNext) {
            this.props.onNext()
        }
    }

    handleState = (state) => {
        this.bottomSheet.setBottomSheetState(state)
    };

    render() {
        if (this.props.currentSong === null) {
            return null;
        }
        return (
        <BottomSheetBehavior
            anchorEnabled
            anchorPoint={230}
            peekHeight={60}
            elevation={8}
            ref={(bottomSheet) => { this.bottomSheet = bottomSheet }}>
            <View style={{backgroundColor:'#FFFFFF'}}>
                <BottomSheetHeader
                    textColorExpanded={'#FFFFFF'}
                    backgroundColor={'#FFFFFF'}
                    backgroundColorExpanded={'#FFFFFF'}>
                    <CustomButton onPress={() => this.props.onPress()}>
                        <View style={{height: 60}}>
                            <PlayerProgress/>
                            <View style={styles.headerContainer}>
                                <Image source={{uri: this.props.currentSong.cover, width: 30, height: 30}}/>
                                <Text style={{flex: 1, marginLeft: 10}} numberOfLines={1}>{this.props.currentSong.title}</Text>
                                <PlayButtonBottom innerStyle={styles.icon}/>
                                <CustomButton onPress={this.handleNext.bind(this)}>
                                    <Image style={styles.icon} source={require('../images/bottom_next.png')}/>
                                </CustomButton>
                                <CustomButton onPress={() => this.handleState(STATE_ANCHOR_POINT)}>
                                    <Image style={styles.icon} source={require('../images/bottom_list.png')}/>
                                </CustomButton>
                            </View>
                            <Text style={{height: 0.5, backgroundColor: 'gray', width: GlobalStyle.window_width}}/>
                        </View>
                    </CustomButton>
                </BottomSheetHeader>
                <PlayList />
            </View>
        </BottomSheetBehavior>
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
        marginBottom: 10,
        paddingHorizontal: 20,
        alignItems: 'center'
    }
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
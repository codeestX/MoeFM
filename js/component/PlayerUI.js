/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/5/17
 * @description:
 */

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    findNodeHandle
} from 'react-native'
import GlobalStyles from '../style/global'
import { BlurView } from 'react-native-blur';
import CustomButton from '../component/CustomButton'
import ModeButton from '../container/ModeButton'
import PlayButton from '../container/PlayButton'
import LoveButton from '../container/LoveButton'
import DownloadButton from '../container/DownloadButton'
import PlayerSlide from '../container/PlayerSlider'
import PlayDisc from '../container/PlayDisc'

export default class PlayerUI extends Component {

    static defaultProps = {
        playMode: 'loop',
        isPlaying: true
    };

    constructor(props) {
        super(props);
        this.state = {
            viewRef: null,
        };
    }

    imageLoaded() {
        // setTimeout(() => {
        //     this.setState({viewRef:findNodeHandle(this.refs.backgroundImage) });
        // }, 200);
        this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    ref={(img) => { this.backgroundImage = img; }}
                    source={{uri: this.props.song.cover}}
                    style={styles.absolute}
                    onLoadEnd={this.imageLoaded.bind(this)}
                />
                {this.state.viewRef !== null &&
                    <BlurView
                        style={styles.absolute}
                        viewRef={this.state.viewRef}
                        blurType="light"
                        blurAmount={32}
                    />
                }
                <View style={styles.content}>
                    <PlayDisc cover={this.props.song.cover}/>
                    <Text style={styles.title}>{this.props.song.title}</Text>
                    <View style={styles.func}>
                        <LoveButton innerStyle={styles.icon}/>
                        <DownloadButton innerStyle={styles.icon}/>
                    </View>
                    <PlayerSlide/>
                    <View style={styles.control}>
                        <ModeButton innerStyle={styles.icon}/>
                        <CustomButton onPress={() => this.props.onLast()}>
                            <Image style={styles.icon} source={require('../images/ic_prev.png')}/>
                        </CustomButton>
                        <PlayButton innerStyle={styles.icon}/>
                        <CustomButton onPress={() => this.props.onNext()}>
                            <Image style={styles.icon} source={require('../images/ic_next.png')}/>
                        </CustomButton>
                        <CustomButton onPress={() => this.props.onShowList()}>
                            <Image style={styles.icon} source={require('../images/ic_list.png')}/>
                        </CustomButton>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    absolute: {
        position: "absolute",
        top: 0, left: 0, bottom: 0, right: 0,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:'transparent'
    },
    cover: {
        width: 200,
        height: 200,
        marginTop: 60,
    },
    title: {
        flex: 1,
        color: GlobalStyles.text_light_primary,
        fontSize: 26,
        paddingTop: 20,
        marginHorizontal: 30
    },
    func: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 80,
        marginBottom: 20
    },
    control: {
        width: GlobalStyles.window_width,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 20,
    },
    icon: {
        width: 60,
        height: 60,
    },
    iconPlay: {
        width: 70,
        height: 70,
    },
});
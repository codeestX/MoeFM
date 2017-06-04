/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/5/7
 * @description:
 */

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
} from 'react-native'
import { connect } from 'react-redux'
import Song from '../model/Song'
import Item from '../component/SongItem'
import GlobalStyles from  '../style/global'
import Api from '../model/Api'

class DetailPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            subsData: [],
            refreshing: false
        };
    }

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.wiki.title}`,
    });

    render() {
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;

        return (
            <FlatList
                data={this.state.subsData}
                renderItem={({item}) => <Item song={item} onPress={(song) => {
                    if (this.props.onPushSong) {
                        this.props.onPushSong(song);
                    }
                    navigate('Player', {song: song});
                }}/>}
                keyExtractor={(item, index) => item.id}
                ItemSeparatorComponent={() => <Text style={styles.separator}/>}
                ListHeaderComponent={() => (
                    <View>
                        <View style={{justifyContent: 'flex-end'}}>
                            <Image style={{alignSelf: 'stretch'}} source={{uri: params.wiki.cover, height: 240}}/>
                            <Text style={styles.title} numberOfLines={1}>{params.wiki.title}</Text>
                        </View>
                        {params.wiki.intro !== undefined && <Text style={ styles.intro}>{params.wiki.intro}</Text>}
                    </View>
                )}/>
        );
    }

    componentDidMount() {
        // this.fetchInfoData();
        const { params } = this.props.navigation.state;
        this.fetchSubsData(params.type, params.wiki.id);
    }

    async fetchSubsData(type, id) {
        this.setState({refreshing: true});
        let result = await Api.getSubsData(type, id);
        let songData = [];
        if (type === 'music') {
            //music
            let songs = result.response.subs;
            for (let i = 0, len = songs.length; i < len; i++) {
                songData.push(new Song(songs[i], i));
            }
        } else {
            //radio
            let songs = result.response.relationships;
            for (let i = 0, len = songs.length; i < len; i++) {
                songData.push(new Song(songs[i].obj, i));
            }
        }
        this.setState({subsData: songData, refreshing: false});
    }
}

const styles = StyleSheet.create({
    separator : {
        height: 0.5,
        marginLeft: 50,
        backgroundColor: GlobalStyles.text_dark_hint,
    },
    intro: {
        color: GlobalStyles.text_dark_primary
    },
    title: {
        alignSelf: 'flex-start',
        margin: 10,
    }
});

const mapDispatchToProps = (dispatch) => {
    return {
        onPushSong: (song) => {
            dispatch({type: 'PUSH_SONG', song: song});
            // dispatch({type: 'CUT_SONG', song: song});
            // setTimeout(() => {
            //     dispatch({type: 'CUT_SONG', song: song});
            //         this.props.navigation('Player', {song: song});
            //     }
            //     , 20
            // );
        },
        onAddSongs: (songs) => {
            dispatch({type: 'ADD_SONGS', song: songs})
        }
    }
};

export default connect(
    null,
    mapDispatchToProps
)(DetailPage)
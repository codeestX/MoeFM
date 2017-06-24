/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/5/7
 * @description:
 */

import React, {Component} from 'react'
import Song from '../model/bean/Song'
import Api from '../model/api/Api'
import SongList from '../container/SongList'

export default class DetailPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            subsData: [],
        };
    }

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.wiki.title}`,
    });

    render() {
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;
        return (
            <SongList subsData={this.state.subsData} wiki={params.wiki} onNavPlayPage={() => navigate('Player')}/>
        );
    }

    componentDidMount() {
        const { params } = this.props.navigation.state;
        this.fetchSubsData(params.type, params.wiki.id);
    }

    async fetchSubsData(type, id) {
        let result = await Api.getSubsData(type, id);
        let songData = [];
        if (type === 'music') {
            //music
            let songs = result.response.subs;
            if (songs === null || songs.length === 0)
                return;
            for (let i = 0, len = songs.length; i < len; i++) {
                songData.push(new Song(songs[i]));
            }
        } else {
            //radio
            let songs = result.response.relationships;
            if (songs === null || songs.length === 0)
                return;
            for (let i = 0, len = songs.length; i < len; i++) {
                songData.push(new Song(songs[i].obj));
            }
        }
        this.setState({subsData: songData});
    }
}
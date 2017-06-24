/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/5/18
 * @description:
 */

import React, {Component} from 'react'
import SongList from '../container/SongList'
import RealmUtil from '../util/realm'

const defaultCover = 'http://moefou.90g.org/wiki_cover/000/04/02/000040276.jpg?v=1401731675';
const defaultTitle = '我的收藏';

export default class LoveListPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            subsData: [],
        };
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <SongList subsData={this.state.subsData} onNavPlayPage={() => navigate('Player')}
                      wiki={{
                          cover: defaultCover,
                          title: defaultTitle
                      }}/>
        );
    }

    componentDidMount() {
        this.fetchLoveData();
    }

    async fetchLoveData() {
        let lovedSongs = RealmUtil.findAllLovedSong();
        this.setState({subsData: lovedSongs});
    }
}
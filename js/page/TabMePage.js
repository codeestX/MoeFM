/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/4/18
 * @description:
 */

import React, {Component} from 'react'
import { List, ListItem } from 'react-native-elements'

const list = [{
        title: '我的收藏',
        icon: 'md-star',
        nav: 'LoveList'
    }, {
        title: '本地音乐',
        icon: 'md-musical-note',
        nav: 'LocalList'
    }, {
        title: '下载管理',
        icon: 'md-download',
        nav: 'Download'
    }, {
        title: '换肤',
        icon: 'md-color-palette',
        nav: 'Theme'
    }, {
        title: '设置',
        icon: 'md-settings',
        nav: 'Settings'
    }
];

export default class TabMePage extends Component {

    render() {
        const { navigate } = this.props.navigation;
        return (
            <List>
                {
                    list.map((item, i) => (
                        <ListItem
                            key={i}
                            title={item.title}
                            leftIcon={{name: item.icon, type: 'ionicon'}}
                            onPress={() => navigate(item.nav)}
                        />
                    ))
                }
            </List>
        );

    }
}
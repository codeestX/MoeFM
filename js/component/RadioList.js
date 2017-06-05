/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/4/27
 * @description:
 */

import React, {Component} from 'react'
import {
    StyleSheet,
    SectionList,
    Text,
} from 'react-native'
import Item from './RadioListItem'
import Header from './SectionHeader'
import Wiki from  '../model/bean/Wiki'
import Api from '../model/api/Api'

export default class RadioList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hotData: [],
            moeData: [],
            refreshing: false
        };
    }

    render() {
        return (
            <SectionList
                renderItem={({item}) => <Item wiki={item} onPress={this.props.onPress}/>}
                renderSectionHeader={({section}) => <Header title={section.key}/>}
                sections={[
                    {data: this.state.hotData, key: '流行电台'},
                    {data: this.state.moeData, key: '萌否电台'},
                ]}
                onRefresh={() => this.fetchRadioData()}
                refreshing={this.state.refreshing}
                keyExtractor={(item, index) => item.id}
                ItemSeparatorComponent={() => <Text style={styles.separator}/>}
            />
        );
    }

    componentDidMount() {
        this.fetchRadioData();
    }

    async fetchRadioData() {
        this.setState({refreshing: true});

        //concurrient
        let hotPromise = Api.getHotRadioData();
        let moePromise = Api.getRadioData();

        let hotResult = await hotPromise;
        let moeResult = await moePromise;
        let hotItems = hotResult.response.hot_radios;
        let moeItems = moeResult.response.wikis;
        let hotWikis = [];
        let moeWikis = [];
        if (hotItems !== null) {
            for (let i = 0, len = hotItems.length; i < len; i++) {
                hotWikis.push(new Wiki(hotItems[i]));
            }
        }
        if (moeItems !== null) {
            for (let i = 0, len = moeItems.length; i < len; i++) {
                moeWikis.push(new Wiki(moeItems[i]));
            }
        }

        this.setState({hotData: hotWikis, moeData: moeWikis, refreshing: false});
    }
}

const styles = StyleSheet.create({
    separator : {
        height: 0.5,
        marginLeft: 70,
        backgroundColor: 'gray'
    },
});
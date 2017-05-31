/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/4/18
 * @description:
 */

import React, {Component} from 'react'
import RadioList from '../component/RadioList'

export default class TabRadioPage extends Component {

    render() {
        const { navigate } = this.props.navigation;
        return (
            <RadioList onPress={(wiki) => navigate('Detail', {wiki: wiki, type: 'radio'})}/>
        );
    }
}
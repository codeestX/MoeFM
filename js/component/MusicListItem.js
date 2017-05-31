/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/4/27
 * @description:
 */

import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight
} from 'react-native'
import { Card } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons';
import CustomButton from './CustomButton'
import DimenUtil from '../util/dimen'
import DateUtil from '../util/date'

export default class MusicListItem extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CustomButton onPress={() => this.props.onPress(this.props.wiki)}>
                <Card containerStyle={styles.container}
                      image={{uri: this.props.wiki.cover}}>
                    <Text style={styles.title} numberOfLines={1}>
                        {this.props.wiki.title}</Text>
                    <View style={styles.info}>
                        <Icon
                            name={'md-heart'}
                            size={12}
                            style={{ color: 'red'}}
                        />
                        <Text style={styles.fav}>{this.props.wiki.fav}</Text>
                        <Text style={styles.date}>{DateUtil.parseTime2String(this.props.wiki.date)}</Text>
                    </View>
                </Card>
            </CustomButton>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        marginTop: 6,
        marginLeft: 6,
        marginRight: 0,
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 3,
    },
    title: {
        width: DimenUtil.window_width / 2 - DimenUtil.px2dp(30),
        flex: 1,
    },
    fav: {
        fontSize: 12,
        flex: 1,
        marginLeft: 5,
    },
    date: {
        fontSize: 12,
        alignSelf: 'flex-end'
    }
});
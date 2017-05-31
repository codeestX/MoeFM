/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/5/7
 * @description:
 */

import React from 'react'
import {
    StyleSheet,
    View,
    Text,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import CustomButton from './CustomButton'
import GlobalStyles from '../style/global'
import DateUtil from '../util/date'

export default class RadioListItem extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CustomButton onPress={() => this.props.onPress(this.props.song)} disabled={typeof(this.props.song.url) === "undefined"}>
                <View style={this.props.song.url? styles.container: styles.containerNone}>
                    <Text style={{fontSize: 14, marginLeft: 20}}>{this.props.song.index}</Text>
                    <View style={{flexDirection: 'column', marginLeft: 20, flex: 1}}>
                        <Text numberOfLines={1}>{this.props.song.title}</Text>
                        <View style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
                            <Text style={styles.info} numberOfLines={1}>{DateUtil.parseTime2String(this.props.song.date)}</Text>
                            {this.props.song.time !== undefined &&
                                <Icon
                                    name={'md-time'}
                                    size={12}
                                    style={styles.icon}
                                />
                            }
                            {this.props.song.time !== undefined && <Text style={ styles.info } numberOfLines={1}>{this.props.song.time}</Text>}
                            {this.props.song.quality !== undefined &&
                                <Icon
                                    name={'md-pulse'}
                                    size={12}
                                    style={styles.icon}
                                />
                            }
                            {this.props.song.quality !== undefined && <Text style={styles.info} numberOfLines={1}>{this.props.song.quality}</Text>}
                            <Text style={styles.size} numberOfLines={1}>{parseFloat(this.props.song.size / 1024).toFixed(1) + 'M'}</Text>
                        </View>
                    </View>
                    <Icon
                        name={'md-more'}
                        size={16}
                        style={{color: 'gray', marginRight: 20}}
                    />
                </View>
            </CustomButton>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems:'center',
        padding: 6,
        backgroundColor: '#fafafa'
    },
    containerNone: {
        flexDirection: 'row',
        alignItems:'center',
        padding: 6,
        backgroundColor: '#e1e1e1'
    },
    title: {
        color: GlobalStyles.text_dark_primary,
        fontSize: 25,
    },
    info: {
        fontSize: 10,
        color: GlobalStyles.text_dark_hint,
    },
    size: {
        fontSize: 10,
        color: GlobalStyles.text_dark_hint,
        marginLeft: 10,
    },
    icon: {
        color: 'gray',
        marginLeft: 10,
        marginRight: 5,
    },
});
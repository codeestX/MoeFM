/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/6/9
 * @description:
 */

import React, {Component} from "react";
import {
    StyleSheet,
    View,
    Text,
    Platform,
    ScrollView,
    AsyncStorage,
} from "react-native";
import { connect } from 'react-redux'
import {ThemeFlags} from '../style/theme';
import CustomButton from '../component/CustomButton'

class ThemePage extends Component {

    constructor(props) {
        super(props);
    }

    onSelectTheme(themeKey) {
        const { goBack } = this.props.navigation;
        try {
            AsyncStorage.setItem('theme_color', themeKey);
        } catch (error) {
            // Error saving data
        }
        goBack();
        if (this.props.onChangeTheme) {
            this.props.onChangeTheme(ThemeFlags[themeKey]);
        }
    }

    getThemeItem(themeKey) {
        return (
            <CustomButton
                style={{flex: 1}}
                onPress={()=>this.onSelectTheme(themeKey)}>
                <View style={[{backgroundColor: ThemeFlags[themeKey]}, styles.themeItem]}>
                    <Text style={styles.themeText}>{themeKey}</Text>
                </View>
            </CustomButton>
        );
    }

    renderThemeItems() {
        let views = [];
        for (let i = 0, keys = Object.keys(ThemeFlags), l = keys.length; i < l; i += 3) {
            let key1 = keys[i], key2 = keys[i + 1], key3 = keys[i + 2];
            views.push(<View key={i} style={{flexDirection: 'row'}}>
                {this.getThemeItem(key1)}
                {this.getThemeItem(key2)}
                {this.getThemeItem(key3)}
            </View>)
        }
        return views;
    }

    render() {
        return (
            <ScrollView style={styles.modalContainer}>
                {this.renderThemeItems()}
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        margin: 10,
        marginTop: Platform.OS === 'ios' ? 20 : 10,
        backgroundColor: 'white',
        borderRadius: 3,
        shadowColor: 'gray',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        padding: 3
    },
    themeItem: {
        flex: 1,
        height: 120,
        margin: 3,
        padding: 3,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    themeText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16,
    }
});

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeTheme: (color) => {
            dispatch({type: 'CHANGE_THEME', color: color})
        },
    }
};

export default connect(
    null,
    mapDispatchToProps
)(ThemePage)
import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import * as Const from '../values/globalConstants';
import auth from '../auth/Auth'

let height = 100;
let menuItemHeight = 35;
let iconSize = 22;

function DrawerItem({ title, screen, entypo, navigation, active }) {
    const [darkMode, setDarkmode] = useState(global.darkMode)
    return (
        <TouchableOpacity
            style={[css.itemButton, css.dropShadow, {
                backgroundColor: Const.theme.vdark,
                borderColor: Const.theme.mid,
            }
            ]}
            onPress={() => {
                if (active) navigation.navigate(screen, navigation)
            }}
        >
            <View style={css.leftView}>
                <Entypo name={entypo} size={iconSize} color={Const.theme.mid} />
            </View>
            <View style={css.rightView}>
                <Text style={[css.titleText, { color: Const.theme.light }]}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default function DrawerContent({ navigation, logout }) {
    return (
        <View style={{ backgroundColor: Const.theme.dark, borderColor: Const.theme.dark, borderRightWidth: 1, height: Const.screenHeight }}>
            <View style={[css.itemView, { alignItems: 'center', marginVertical: 10 }]}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                </TouchableOpacity>
            </View>
            <View style={css.itemView}>
                <DrawerItem title={"Hem"} screen={"Home"} entypo={"home"} navigation={navigation} active={true} />
            </View>
            <TouchableOpacity
                style={[css.itemButton, css.dropShadow, {
                    backgroundColor: Const.theme.vdark,
                    borderColor: Const.theme.mid,
                }
                ]}
                onPress={() => logout()}
            >
                <View style={css.leftView}>
                    <Entypo name={"cross"} size={iconSize} color={Const.theme.mid} />
                </View>
                <View style={css.rightView}>
                    <Text style={[css.titleText, { color: Const.theme.light }]}>Logga ut</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const css = StyleSheet.create({

    /* View Styles */

    itemView: {
        paddingVertical: 6
    },

    itemButton: {
        alignItems: 'center',
        flexDirection: 'row',
        height: menuItemHeight,
        width: '90%',
        marginHorizontal: '5%',
        borderColor: Const.logoColor,
        borderRadius: 3,
        borderWidth: 0,
    },

    leftView: {
        maxWidth: 60,
        paddingHorizontal: 10,
        height: menuItemHeight,
        justifyContent: 'center',
        borderColor: Const.theme.dark,
        borderWidth: 0,
    },

    rightView: {
        justifyContent: 'center',
        height: menuItemHeight,
        alignItems: 'flex-start',
        borderColor: Const.logoColor,
        borderWidth: 0,
    },

    dropShadow: {
        shadowColor: 'rgba(0,0,0, .4)',			// IOS
        shadowOffset: { height: 2, width: 2 }, // IOS
        shadowOpacity: 3,								// IOS
        shadowRadius: 3,								// IOS
        elevation: 3,									// Android
    },

    /* Text Styles */

    titleText: {
        color: Const.theme.light,
        fontSize: 18,
        fontWeight: '600',
    },

});
import React, { useState, useEffect, useRef, Component, useCallback } from 'react';
import {
    StyleSheet,
    View,
    Platform,
    Alert,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import * as Const from '../values/globalConstants'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export const CloseButton = (props) => {
    return (
        <TouchableOpacity
            style={css.goBackButton}
            onPress={props.onPress}
        >
            <FontAwesome name="times" size={Const.tabIconSize} color={Const.theme.light} />
        </TouchableOpacity>
    );
}

export const AddButton = (props) => {
    return (
        <TouchableOpacity
            style={[css.closeButton, css.dropShadow]}
            onPress={props.onPress}
        >
            <FontAwesome name="plus" size={Const.tabIconSize} color={Const.theme.light} />
        </TouchableOpacity>
    )
}

export const TxtBtn = (props) => {
    return (
        <TouchableOpacity
            style={css.txtButton}
            onPress={props.onPress}
        >
            <Text style={css.btnText}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const css = StyleSheet.create({
    goBackButton: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: 40,
        margin: 8,
        backgroundColor: Const.theme.vdark,
        borderColor: Const.theme.mid,
        borderWidth: 2,
        borderRadius: 30,
        shadowColor: 'rgba(0,0,0, .4)',			// IOS
        shadowOffset: { height: 2, width: 2 }, // IOS
        shadowOpacity: 2,								// IOS
        shadowRadius: 2,								// IOS
        elevation: 2,									// Android
    },
    closeButton: {
        position: 'absolute',
        bottom: 105,
        right: 6,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: Const.theme.mid,
        backgroundColor: Const.theme.vdark,
    },
    txtButton: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 0.05 * Const.screenHeight,
        width: 0.25 * Const.screenWidth,
        margin: 6,
        backgroundColor: Const.theme.mid,
        borderRadius: 6,
        shadowColor: 'rgba(0,0,0, .4)',			// IOS
        shadowOffset: { height: 2, width: 2 }, // IOS
        shadowOpacity: 2,								// IOS
        shadowRadius: 2,								// IOS
        elevation: 2,									// Android
    },
    btnText: {
        color: Const.theme.light,
        fontSize: 20,
        fontFamily: Platform.OS == "ios" ? 'Montserrat-SemiBold' : 'MontserratSemiBold',
    },
    dropShadow: {
        shadowColor: 'rgba(0,0,0, .4)',			// IOS
        shadowOffset: { height: 2, width: 2 }, // IOS
        shadowOpacity: 2,								// IOS
        shadowRadius: 2,								// IOS
        elevation: 2,									// Android
    },
});
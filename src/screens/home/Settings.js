import React, { useState, useEffect, useRef, Component, useCallback } from 'react';
import {
    StyleSheet,
    View,
    Platform,
    Alert,
    Text,
    PanResponder,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import * as Const from '../../values/globalConstants';

//import analytics from '@react-native-firebase/analytics';
/* Imported Stylesheet */
import css from './css/Home';

export default Settings = (props) => {

    const [path, setPath] = useState("50,50 50,50");
    const [length, setLength] = useState(1);
    const [lastX, setLastX] = useState(50);
    const [lastY, setLastY] = useState(50);

    return (
        <View style={css.mainView}>
            <View style={css.childView}>
                <Text>settings</Text>
            </View>
        </View>
    );
}

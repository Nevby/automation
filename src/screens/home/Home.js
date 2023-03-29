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
import { DraxProvider, DraxView } from 'react-native-drax';
import Svg, { Line, Polygon, Circle } from 'react-native-svg';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default Home = (props) => {

    const [path, setPath] = useState("50,50 50,50");
    const [length, setLength] = useState(1);
    const [lastX, setLastX] = useState(50);
    const [lastY, setLastY] = useState(50);

    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [base64, setBase64] = useState(null)

    const [done, setDone] = useState(false)
    const [starting, setStarting] = useState(true)

    let ref = useRef(null);

    const getBase64URL = () => {
        ref.current.toDataURL((data) => {
            const base64 = {
                title: "RoomLayout",
                message: "Roomlayout code",
                url: `data:image/png;base64,${data}`
            };
            console.log(base64)
            setBase64(base64)
            return(base64)
        })
    }

    //panResponder initialization
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (event, gestureState) => true,
        onStartShouldSetPanResponderCapture: (event, gestureState) => {
            // this.setState({
            //     startTouchX: event.nativeEvent.locationX.toFixed(2),
            //     startTouchY: event.nativeEvent.locationY.toFixed(2),
            // });
            let x = getLast().split(",")[0]
            let y = getLast().split(",")[1]
            setLastX(x)
            setLastY(y)
            console.log("x: " + x + ", y: " + y)
        },
        onMoveShouldSetPanResponder: (event, gestureState) => false,
        onMoveShouldSetPanResponderCapture: (event, gestureState) => false,
        onPanResponderGrant: (event, gestureState) => false,
        onPanResponderMove: (event, gestureState) => {
            // this.setState({
            //     endTouchX: event.nativeEvent.locationX.toFixed(2),
            //     endTouchY: event.nativeEvent.locationY.toFixed(2),
            // });
        },
        onPanResponderRelease: (event, gestureState) => {
            // this.setState({
            //     endTouchX: event.nativeEvent.locationX.toFixed(2),
            //     endTouchY: event.nativeEvent.locationY.toFixed(2),
            // });
            starting ? setStart(event.nativeEvent.locationX, event.nativeEvent.locationY)
                : done ? null : addPoint(event.nativeEvent.locationX, event.nativeEvent.locationY)
        },
    });

    const setStart = (x, y) => {
        setStartX(x.toFixed(0))
        setStartY(y.toFixed(0))
        Alert.alert(
            'Happy?',
            'Are you happy with the starting position?',
            [{
                text: 'Yep',
                onPress: () => {
                    console.log('yes pressed')
                    setPath(x.toFixed(0) + "," + y.toFixed(0))
                    setStarting(false)
                }
            }, {
                text: 'Nope',
                onPress: () => {
                    console.log('Nope Pressed')
                    setStartX(0)
                    setStartY(0)
                }
            }
            ], { cancelable: false },
        );
        console.log(x.toFixed(0) + "," + y.toFixed(0))
    }
    const addPoint = (x, y) => {
        setPath(path + " " + x.toFixed(0) + "," + y.toFixed(0))
        console.log(path + " " + x.toFixed(0) + "," + y.toFixed(0))
    }
    const eraseLast = () => {
        let temp = path.split(" ")
        let tempString = ""
        for (i = 0; i < temp.length - 1; i++) tempString += (i == 0 ? "" : " ") + temp[i]
        setPath(tempString)
        console.log(tempString)
    }

    const getLast = () => {
        let tmp = path.split(" ")
        return tmp[tmp.length - 1]
    }

    const doneDrawing = () => {
        setDone(true)
        getBase64URL()
    }

    return (
        <View style={css.mainView}>
            <View style={css.childView}>
                
            </View>
        </View>
    );
}

import React, { useState, useEffect, useRef, Component, useCallback } from 'react';
import {
    StyleSheet,
    View,
    Platform,
    Alert,
    Text,
    PanResponder,
    Image,
    TextInput,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import * as Const from '../values/globalConstants'
import dbLights from '../database/DBLights'
import { CloseButton, TxtBtn } from '../buttons/Buttons'

//import analytics from '@react-native-firebase/analytics'
/* Imported Stylesheet */
import css from './css/AddRMCSS'
import { DraxProvider, DraxView } from 'react-native-drax'
import Svg, { Line, Polygon, Circle } from 'react-native-svg'


var width = Dimensions.get('window').width
var height = Dimensions.get('window').height

export default AddRoomModal = (props) => {

    const [path, setPath] = useState("")
    const [roomName, setRoomName] = useState("")
    const [floorName, setFloorName] = useState("")
    const [lastX, setLastX] = useState(50)
    const [lastY, setLastY] = useState(50)

    const [startX, setStartX] = useState(0)
    const [startY, setStartY] = useState(0)
    const [base64, setBase64] = useState(null)

    const [done, setDone] = useState(false)
    const [drawingDone, setSetDrawingDone] = useState(false)
    const [roomNameBool, setRoomNameBool] = useState(false)

    let ref = useRef(null);

    const getBase64URL = () => {
        ref.current.toDataURL((data) => {
            const base64 = {
                title: "RoomLayout",
                message: "Roomlayout code",
                url: `data:image/png;base64,${data}`
            }
            console.log(base64)
            setBase64(base64)
            return (base64)
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
            // let x = getLast().split(",")[0]
            // let y = getLast().split(",")[1]
            // setLastX(x)
            // setLastY(y)
            // console.log("x: " + x + ", y: " + y)
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
            addPoint(event.nativeEvent.locationX, event.nativeEvent.locationY)
        },
    });

    const addPoint = (x, y) => {
        console.log("path length: " + path.length)
        if (path.length <= 0) {
            setPath(x + "," + y)
            setStartX(x.toFixed(0))
            setStartY(y.toFixed(0))
        }
        setPath(path + " " + x.toFixed(0) + "," + y.toFixed(0))
        console.log(path + " " + x.toFixed(0) + "," + y.toFixed(0))
    }
    const eraseLast = () => {
        let temp = path.split(" ")
        let tempString = ""
        for (i = 0; i < temp.length - 1; i++) tempString += (i == 0 ? "" : " ") + temp[i]
        setPath(tempString)
        console.log(tempString)
        if (path.length <= 0) {
            setStartX(0)
            setStartY(0)
        }
    }

    const getLast = () => {
        let tmp = path.split(" ")
        return tmp[tmp.length - 1]
    }

    const doneDrawing = () => {
        setSetDrawingDone(true)
        getBase64URL()
    }

    const addRoom = () => {
        console.log("pressed")
        dbLights.addRoom({
            base64,
            name: roomName,
            floor: floorName
        }, (success) => {
            console.log("success: " + success)
        })
    }

    return (
        <View style={css.mainView}>
            <CloseButton onPress={props.close} />
            <View style={css.childView}>
                <Svg height={width} width={width} position="absolute">
                    <Circle
                        cx={startX} cy={startY} r="4" fill={Const.theme.light}
                    />
                </Svg>
                <Svg ref={ref} height={width} width={width} position="absolute" style={css.childView}>
                    <Polygon
                        points={path}
                        stroke={Const.theme.light}
                        strokeWidth="8"
                        fill={Const.theme.dark}
                    />
                </Svg>
                <View
                    style={{ flex: 1, backgroundColor: 'transparent' }}
                    {...panResponder.panHandlers}
                />
            </View>
            {!drawingDone ?
                <View style={css.childView2}>
                    <View style={css.loginbuttonView}>
                        <Text style={css.loginText}>Draw the shape of your room</Text>
                    </View>
                    <View style={css.loginbuttonView}>
                        <TxtBtn text={"Erase"} onPress={() => eraseLast()} />
                        <TxtBtn text={"Next"} onPress={() => doneDrawing()} />
                    </View>
                </View>
                : drawingDone && ! roomNameBool ?
                <View style={css.childView2}>
                    <View style={css.inputContainer}>
                        <TextInput
                            style={css.input}
                            underlineColorAndroid="transparent"
                            placeholder="Room Name"
                            placeholderTextColor="#727272"
                            selectionColor={Const.theme.light}
                            autoCapitalize="none"
                            textAlign="center"
                            returnKeyType="next"
                            //onSubmitEditing={() => { this.passwordInput.focus() }}
                            //onEndEditing={this.onEndEditingTextEmail}
                            onChangeText={setRoomName}
                            value={roomName}
                        />
                        <TxtBtn text={"Next"} onPress={() => setRoomNameBool(true)} />
                    </View>
                </View>
            : 
            <View style={css.childView2}>
                    <View style={css.inputContainer}>
                        <TextInput
                            style={css.input}
                            underlineColorAndroid="transparent"
                            placeholder="Floor"
                            placeholderTextColor="#727272"
                            selectionColor={Const.theme.light}
                            autoCapitalize="none"
                            textAlign="center"
                            returnKeyType="next"
                            //onSubmitEditing={() => { this.passwordInput.focus() }}
                            //onEndEditing={this.onEndEditingTextEmail}
                            onChangeText={setFloorName}
                            value={floorName}
                        />
                        <TxtBtn text={"Next"} onPress={() => addRoom()} />
                    </View>
                </View>
            }
        </View>
    );
}

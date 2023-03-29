import React, { useState, useEffect, useRef, Component, useCallback } from 'react';
import {
    StyleSheet,
    View,
    Platform,
    Alert,
    Text,
    SafeAreaView,
    FlatList,
    PanResponder,
    Image,
    StatusBar,
    Modal,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import * as Const from '../../values/globalConstants';

//import analytics from '@react-native-firebase/analytics';
/* Imported Stylesheet */
import css from './css/Home';
import AddRoomModal from '../../modals/AddRoomModal';
import { onValue } from "firebase/database";
import dbLights from '../../database/DBLights'
import base64 from "../../utility/base64room"
import { AddButton } from '../../buttons/Buttons'

import FontAwesome from 'react-native-vector-icons/FontAwesome';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default Rooms = (props) => {

    const [roomList, setRoomList] = useState([]);
    const [addRoomMoVi, setAddRoomMoVi] = useState(false)

    useEffect(() => {
        onValue(dbLights.roomsRef(), (snapshot) => {
            const rooms = []
            snapshot.forEach(roomSnap => { rooms.push(roomSnap.val()) })
            setRoomList(rooms)
        })
    }, [])

    const DATA = [
        {
            "address": "3242-343-43-23-234-23423",
            "id": "-NFoU-bxGxUm2-ItiZei",
            "name": "Third Room",
            "base64": ""
        },
        {
            "address": "3242-343-43-23-234-23423",
            "id": "-NFoU2UH-U4hSgNPXvrP",
            "name": "First Room",
            "base64": ""
        },
        {
            "address": "fsdfsdfsdfsd",
            "id": "-NFodM0JGz7uVcdWnKF9",
            "name": "Second Room",
            "base64": ""
        }
    ]

    const Item = ({ item, onPress }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={onPress}
        >
            <View>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.text}>{item.id}</Text>
            </View>
            <Image style={{ width: 60, height: 60, borderWidth: 0, borderColor: 'red' }} source={{ uri: item.base64.url }} />
        </TouchableOpacity>
    )

    const renderItem = ({ item }) => {
        return (
            <Item
                item={item}
                onPress={() => addRoom(item)}
            />
        )
    }

    const addRoom = (item) => {
        console.log("pressed")
        dbLights.addRoom(item, (success) => {
            console.log("success: " + success)
        })
    }

    return (
        <View style={css.mainView}>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={roomList}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
            <AddButton onPress={() => setAddRoomMoVi(true)}/>
            <Modal
                animationType='fade'
                visible={addRoomMoVi}
                transparent={true}
                onRequestClose={() => {
                    console.log("Modal has been closed.");
                    setAddRoomMoVi(!addRoomMoVi)
                }}
            >
                <View
                    style={{
                        backgroundColor: '#00000070',
                        width: Const.windowWidth,
                        height: Const.windowHeight,
                        justifyContent: 'center',
                        position: "absolute",
                        alignItems: "center",
                        flex: 1,
                    }}
                >
                    <AddRoomModal close={() => setAddRoomMoVi(false)}/>
                </View>

            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: Const.theme.vdark,
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 5,
    },
    backButton: {
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
    },

    dropShadow: {
        shadowColor: 'rgba(0,0,0, .4)',			// IOS
        shadowOffset: { height: 2, width: 2 }, // IOS
        shadowOpacity: 2,								// IOS
        shadowRadius: 2,								// IOS
        elevation: 2,									// Android
    },
    title: {
        fontSize: 22,
        color: Const.theme.light
    },
    text: {
        fontSize: 14,
        color: Const.theme.light
    }
});
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
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import * as Const from '../../values/globalConstants';

//import analytics from '@react-native-firebase/analytics';
/* Imported Stylesheet */
import css from './css/Home';
import { onValue } from "firebase/database";
import dbLights from '../../database/DBLights'
import { AddButton } from '../../buttons/Buttons'

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default Lights = (props) => {

    const [lightList, setLightList] = useState([]);

    useEffect(() => {
        onValue(dbLights.lightsRef(), (snapshot) => {
            const lights = []
            snapshot.forEach(lightSnap => { lights.push(lightSnap.val()) })
            setLightList(lights)
        })
    }, [])

    const Item = ({ item, onPress }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={onPress}
        >
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.text}>{item.room}, {item.x}, {item.y}</Text>
        </TouchableOpacity>
    );

    const renderItem = ({ item }) => {
        return (
            <Item
                item={item}
                onPress={() => addLight(item)}
            />
        )
    }

    const addLight = (item) => {
        console.log("pressed")
        dbLights.addLight(item, (success) => {
            console.log("success: " + success)
        })
    }

    return (
        <View style={css.mainView}>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={lightList}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
            <AddButton onPress={() => setAddRoomMoVi(true)}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: Const.theme.vdark,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 5,
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
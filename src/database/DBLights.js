import React from 'react';
import {
    Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { getDatabase, ref, set, get, push } from "firebase/database";

const db = getDatabase();
class DBLights {

    addLight = (item, callback) => {
        console.log("db.addLight(): " + item.name)
        const refLights = ref(db, 'users/' + auth().currentUser.uid + '/lights')
        const newLightRef = push(refLights);
        set(newLightRef, {
            id: newLightRef.key,
            name: item.name,
            room: item.room,
            address: item.address,
            x: item.x,
            y: item.y
        }).then(() => {
            console.log("db.addLight(): " + newLightRef.key + " added")
            callback(true)
        }).catch(error => {
            Alert.alert("Error", "DB.addLight")
            callback(false)
        });
    }

    addRoom = (item, callback) => {
        console.log("db.addLight(): " + item.name)
        const newRoomRef = push(this.roomsRef());
        set(newRoomRef, {
            id: newRoomRef.key,
            name: item.name,
            base64: item.base64,
            floor: item.floor
        }).then(() => {
            console.log("db.addLight(): " + newRoomRef.key + " added")
            callback(true)
        }).catch(error => {
            Alert.alert("Error", "DB.addLight")
            callback(false)
        });
    }

    lightsRef = () => {
        const lights = ref(db, 'users/' + auth().currentUser.uid + '/lights/')
        return lights
    }

    roomsRef = () => {
        const rooms = ref(db, 'users/' + auth().currentUser.uid + '/rooms/')
        return rooms
    }
}

const dbLights = new DBLights();
export default dbLights;
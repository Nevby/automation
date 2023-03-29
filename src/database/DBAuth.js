import React from 'react';
import {
    Alert,
} from 'react-native';

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyA7qfR23QA5v0l5TkN5aC1i85fBxTvfFF0",
    authDomain: "https://automation-2bfe1.firebaseio.com",
    databaseURL: "https://automation-2bfe1-default-rtdb.firebaseio.com/",
    projectId: "automation-2bfe1",
    storageBucket: "automation-2bfe1.appspot.com",
    messagingSenderId: "917501681650",
    appId: "1:917501681650:android:7543c46cfb4494ddb7156b"
};

class DBAuth {

    writeUserData = (userData, callback) => {
        set(ref(database, 'users/' + userData.user.uid), {
            email: userData.user.email,
        }).then(() => {
            console.log("db.writeUserData(): " + userData.user.email + " added")
            callback(true)
        }).catch(error => {
            Alert.alert("Error", "DB.writeUserData")
            callback(false)
        });
    }
}

const db = new DBAuth();
export default db;
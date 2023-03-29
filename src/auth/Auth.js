import React from 'react';
import {
    Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import dba from '../database/DBAuth'

const firebaseConfig = {
	apiKey: "AIzaSyA7qfR23QA5v0l5TkN5aC1i85fBxTvfFF0",
	authDomain: "https://automation-2bfe1.firebaseio.com",
	databaseURL: "https://automation-2bfe1-default-rtdb.firebaseio.com/",
	projectId: "automation-2bfe1",
	storageBucket: "automation-2bfe1.appspot.com",
	messagingSenderId: "917501681650",
	appId: "1:917501681650:android:7543c46cfb4494ddb7156b"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
class Auth {
    loginToFirebase = async (email, password, callback) => {
        console.log("\Auth.loginToFirebase()", email, password)
        auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                callback(true)
            })
            .catch((error) => {
                if (error.code === 'auth/invalid-email') {
                    Alert.alert('Error', 'Invalid email address');
                    callback(false)
                } else if (error.code === 'auth/user-not-found') {
                    Alert.alert('Error', 'No user connected to the email address found');
                    callback(false)
                } else if (error.code === 'auth/wrong-password') {
                    Alert.alert('Error', 'Wrong password');
                    callback(false)
                } else {
                    console.log(error)
                    Alert.alert("Error", "Unknown error, check your connection and try again");
                    console.log("callback(false, failure)")
                    callback(false)
                }
            });
    };

    logout = async (callback) => {
        auth().signOut()
            .then(callback(true))
            .catch((error) => {
                Alert.alert('Error', error);
                callback(false)
            });
    };

    registerOnFirebase = async (email, password, callback) => {
        const debug = true
        console.log("Auth.registerOnFirebase()")
        auth().createUserWithEmailAndPassword(email, password)
            .then(userData => {
                debug ? console.log("Auth.registerOnFirebase .then(), user = " + JSON.stringify(userData.user.email)) : null
                dba.writeUserData(userData, (success) => {
                    callback(success)
                })

            })
            .catch(error => {
                debug ? console.log("Auth.registerOnFirebase .catch(error)") : null
                if (error.code === 'auth/invalid-email') {
                    Alert.alert('Error', 'Invalid email address');
                    callback(false)
                } else if (error.code === 'auth/email-already-in-use') {
                    Alert.alert('Error', 'Email already connected to an account');
                    callback(false)
                } else {
                    debug ? console.log(error) : null
                    //Alert.alert("Error", "Unknown error, check your connection and try again");
                    debug ? console.log("callback(false, auth/unknown-failure)") : null
                    callback(false)
                }
            });
    }

    writeUserData = (userId, name, email, imageUrl) => {
        firebase.database().ref('users/' + userId).set({
          username: name,
          email: email,
          profile_picture : imageUrl
        });
      }
}

const auth1 = new Auth();
export default auth1;
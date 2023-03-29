import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    Platform,
    Animated,
    Alert,
    ActivityIndicator,
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    Switch,
    TouchableWithoutFeedback,
} from 'react-native';
import * as Const from '../../values/globalConstants';

//import analytics from '@react-native-firebase/analytics';
/* Imported Stylesheet */
import css from './css/LogInScreenCss';
import * as v from '../../utility/Validate'

export default Register = (props) => {

    const [email, setEmail] = useState("simon.nevby@gmail.com")
    const [password, setPassword] = useState("monica12")
	const [password2, setPassword2] = useState("monica12")
    const [rememberMeValue, setRememberMeValue] = useState(false)
    const [loading, setLoading] = useState(false)


    const onPressRegister = () => {
		console.log("Register.onPressRegister()")
        if (!v.email(email)) {
			Alert.alert("Error", "Type in a valid email address")
		} else if (v.isNullOrEmpty(password)) {
			Alert.alert("Error", "Choose a password")
		} else if (!v.password(password)) {
			Alert.alert("Error", "The password needs to be at least 6 characters")
		} else if (!v.passwordsMatch(password, password2)) {
			Alert.alert("Error", "Passwords do not match!")
		} else {
			props.register(email, password)
		};
	};

    return (
        <KeyboardAvoidingView eneabled={true} behavior={Platform.OS == "ios" ? "height" : "padding"} contentContainerStyle={{ height: '100%', width: '100%' }} >
            <View style={css.mainView}>
                <View style={css.mainView}>
                        <View style={css.mainView}>
                            <View style={css.zimifyView}>
                                <Text style={css.loginTitle}>Register</Text>
                            </View>
                            <View style={css.inputView}>
                                <View style={css.inputContainer}>
                                    <TextInput
                                        style={css.input}
                                        underlineColorAndroid="transparent"
                                        placeholder="Email Address"
                                        placeholderTextColor={Const.theme.light}
                                        autoCapitalize="none"
                                        textAlign="center"
                                        keyboardType="email-address"
                                        //onPressOut={()=> Keyboard.dismiss()}
                                        returnKeyType="next"
                                        //onSubmitEditing={() => { this.passwordInput.focus() }}
                                        //onEndEditing={this.onEndEditingTextEmail}
                                        onChangeText={setEmail}
                                        value={email}
                                    />
                                </View>
                                <View style={css.inputContainer}>
                                    <TextInput
                                        style={css.input}
                                        underlineColorAndroid="transparent"
                                        placeholder="Password"
                                        placeholderTextColor={Const.theme.light}
                                        secureTextEntry={true}
                                        textAlign="center"
                                        returnKeyType="done"
                                        autoCapitalize="none"
                                        //ref={(input) => { this.passwordInput = input; }}
                                        onChangeText={setPassword}
                                        value={password}
                                    />
                                </View>
                                <View style={css.inputContainer}>
                                    <TextInput
                                        style={css.input}
                                        underlineColorAndroid="transparent"
                                        placeholder="Repeat Password"
                                        placeholderTextColor={Const.theme.light}yut
                                        secureTextEntry={true}
                                        textAlign="center"
                                        returnKeyType="done"
                                        autoCapitalize="none"
                                        //ref={(input) => { this.passwordInput = input; }}
                                        onChangeText={setPassword2}
                                        value={password2}
                                    />
                                </View>
                            </View>
                            <View style={css.space}></View>
                            <View style={{flexDirection: 'row'}}>
                                <View style={css.goBackbuttonView}>
                                    <TouchableOpacity
                                        style={css.goBackButton}
                                        onPress={() => props.goToLogin()}
                                    >
                                        <Text style={css.goBackText}>Go back</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={css.loginbuttonView}>
                                    <TouchableOpacity
                                        style={css.loginButton}
                                        onPress={onPressRegister}
                                    >
                                        <Text style={css.loginText}>Register</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}
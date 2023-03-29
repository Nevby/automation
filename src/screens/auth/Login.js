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

export default Login = (props) => {

    const [email, setEmail] = useState("simon.nevby@gmail.com")
    const [password, setPassword] = useState("monica12")
    const [rememberMeValue, setRememberMeValue] = useState(false)
    const [loading, setLoading] = useState(false)


    const onPressLogin = () => {
		console.log("Login.onPressLogin()")
		props.login(email, password)
	};

    return (
        <KeyboardAvoidingView eneabled={true} behavior={Platform.OS == "ios" ? "height" : "padding"} contentContainerStyle={{ height: '100%', width: '100%' }} >
            <View style={css.mainView}>
                <View style={css.mainView}>
                        <View style={css.mainView}>
                            <View style={css.zimifyView}>
                                <Text style={css.loginTitle}>Login</Text>
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
                                <TouchableOpacity
                                    style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', minHeight: 60 }}
                                    onPress={() => props.goToRegister()}
                                >
                                    <Text style={css.keepText}>Don´t have an account?</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={css.keepView}>
                                <View >
                                    <Switch
                                        trackColor={{ true: Const.theme.light, false: '' }}
                                        thumbColor={'#fff'}
                                        onValueChange={setRememberMeValue}
                                        value={rememberMeValue}
                                    />
                                </View>
                                <View >
                                    <Text style={css.keepText}>Remember me</Text>
                                </View>
                            </View>
                            <View style={css.space}></View>
                            <View>
                                <View style={css.loginbuttonView}>
                                    <TouchableOpacity
                                        style={css.loginButton}
                                        onPress={onPressLogin}
                                    >
                                        <Text style={css.loginText}>Sign in</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}
import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    Alert,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

import authent from "./src/auth/Auth"

import DrawerContent from './src/components/DrawerContent'
import Login from './src/screens/auth/Login';
import Register from './src/screens/auth/Register';
import Home from './src/screens/home/Home'
import Lights from './src/screens/home/Lights'
import Rooms from './src/screens/home/Rooms'
import Settings from './src/screens/home/Settings';
import * as Const from './src/values/globalConstants'

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const navOptions = () => ({ headerShown: false, gestureEnabled: true, animationEnabled: true });

const css = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: Const.theme.vdark,
    },
});

const TabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            backBehavior="history"
            shifting={true}
            sceneAnimationEnabled={true}
            screenOptions={{
                tabBarStyle: {
                    borderWidth: 0
                },
                tabBarItemStyle: {
                    margin: 5,
                    borderRadius: 10,
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarLabelStyle: { color: Const.theme.light },
                    tabBarStyle: css.tabBarStyle,
                    tabBarIcon: () => (
                        <FontAwesome name="home" size={Const.tabIconSize + 2} color={Const.theme.mid} />
                    ), headerShown: false, gestureEnabled: true
                }}
            />
            <Tab.Screen
                name="Lights"
                component={Lights}
                options={{
                    tabBarLabel: 'Lights',
                    tabBarLabelStyle: { color: Const.theme.light },
                    tabBarStyle: css.tabBarStyle,
                    tabBarIcon: () => (
                        <FontAwesome name="lightbulb-o" size={Const.tabIconSize + 4} color={Const.theme.mid} />
                    ), headerShown: false, gestureEnabled: true
                }}
            />
            <Tab.Screen
                name="Rooms"
                component={Rooms}
                options={{
                    tabBarLabel: 'Rooms',
                    tabBarLabelStyle: { color: Const.theme.light },
                    tabBarStyle: css.tabBarStyle,
                    tabBarIcon: () => (
                        <FontAwesome name="folder-o" size={Const.tabIconSize} color={Const.theme.mid} />
                    ), headerShown: false, gestureEnabled: true
                }}
            />
            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarLabelStyle: { color: Const.theme.light },
                    tabBarStyle: css.tabBarStyle,
                    tabBarIcon: () => (
                        <FontAwesome name="cog" size={Const.tabIconSize + 2} color={Const.theme.mid} />
                    ),
                }}
            />
        </Tab.Navigator >
    );
}

const App = () => {

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false)
    const [reg, setReg] = useState(false);

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
        function onAuthStateChanged(user) {
            if (user) {
                console.log("Auth() auth().onAuthStateChanged(). User: " + JSON.stringify(user.uid) + " is logged in to firebase");
                setUser(user)
                setLoggedIn(true)
            } else {
                setUser(null)
                setLoggedIn(false)
            }

            if (initializing) setInitializing(false);
        }
    }, []);

    const login = (email, password) => {
        console.log("\nApp.login()", email, password)
        authent.loginToFirebase(email, password, (success) => {
            console.log("App.login() success = " + success)
            if (success) setLoggedIn(true); else setLoggedIn(false)
        })
    }

    const register = (email, password) => {
        console.log("App.register()")
        authent.registerOnFirebase(email, password, (success) => {
            console.log("\nApp.register() success = " + success)
            if (success) {
                logout()
                setReg(false)
            } else {
                setReg(true)
            }
        })
    }

    const logout = () => {
        authent.logout((success) => {
            success ? setLoggedIn(false) : null
        })
    }

    const goToRegister = () => {
        setReg(true)
        setLoggedIn(false)
    }

    const goToLogin = () => {
        setReg(false)
        setLoggedIn(false)
    }

    const Status = () => {
        return <StatusBar barStyle="dark-content" hidden={false} translucent backgroundColor="transparent" />
    }

    if (initializing) {
        return (
            <View>
                <Text>initializing</Text>
            </View>
        )
    } else if (!loggedIn && !reg) {
        return (
            <>
                <Status />
                <Login login={login} goToRegister={goToRegister} />
            </>
        )
    } else if (!loggedIn && reg) {
        return (
            <>
                <Status />
                <Register register={register} goToLogin={goToLogin} />
            </>
        )
    } else if (loggedIn) {
        return (
            <>
                {/* <NavigationContainer style={{ backgroundColor: 'black', height: Const.windowHeight, width: Const.windowWidth, paddingBottom: Const.navigationBarHeight + 30, margin: 0 }}>
                    <Status />
                    <TabNavigator />
                </NavigationContainer> */}
                <NavigationContainer style={{ backgroundColor: 'black', height: Const.windowHeight, width: Const.windowWidth, paddingBottom: Const.navigationBarHeight + 30, margin: 0 }}>
                    <Status />
                    <Drawer.Navigator
                        initialRouteName="TabNavigator"
                        drawerStyle={[{ backgroundColor: Const.theme.dark }]}
                        drawerContent={props => <DrawerContent navigation={props.navigation} logout={logout} />}
                        drawerType="front"
                        edgeWidth={40}
                    >
                        <Drawer.Screen name="TabNavigator" component={TabNavigator} options={navOptions} />
                    </Drawer.Navigator>
                </NavigationContainer>
            </>
        )
    }

    return (
        <View>
            <Text>Welcome {user.email}</Text>
        </View>
    );
};

export default App
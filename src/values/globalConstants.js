import {
	StatusBar,
	Dimensions,
	Platform
} from 'react-native';

/* Device dimensions */

export const screenHeight = Math.round(Dimensions.get('screen').height);
export const screenWidth = Math.round(Dimensions.get('screen').width);

export const windowWidth = Math.round(Dimensions.get('window').width);
export const borderThickness = 5;
const statusBarHeight = Platform.select({
    ios: () => 45,
    android: () => Math.round(StatusBar.currentHeight),
})();
export const windowHeight = Math.round(Dimensions.get('window').height) - statusBarHeight;
export const tabIconSize = 26;

export const navigationBarHeight = Platform.OS === 'ios' ? screenHeight - windowHeight + 10 : 52;

/* Device constants */
let pushToken = '';

export function setPushToken(userID) {
    console.log('globalConstants.setPushToken(): userID: ' + userID)
    this.pushToken = userID;
}

export function getPushToken() {
    console.log('globalConstants.getPushToken(): userID: ' + this.pushToken)
    return this.pushToken;
}

const decor = {
    light: "#E4E2E3",
    mid: "#B49C74",
    dark: "#568A91",
    vdark: "#32494E"
}

const vienna = {
    light: "#C2BCB9",
    mid: "#AC4034",
    dark: "#C2BCB9",
    vdark: "#333132"
}

const tech = {
    light: "#FF4C29",
    mid: "#334756",
    dark: "#2C394B",
    vdark: "#082032"
}

const space = {
    light: "#B4A5A5",
    mid: "#3C415C",
    dark: "#301B3F",
    vdark: "#151515"
}

const black = {
    light: "#99BCC4",
    mid: "#343537",
    dark: "#28292C",
    vdark: "#18191B"
}

const wave = {
    light: "#99BCC4",
    mid: "#08535D",
    dark: "#02333C",
    vdark: "#01242A"
}

export const theme = black;
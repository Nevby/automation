import { StyleSheet, Platform } from 'react-native';
import * as Const from '../../../values/globalConstants';

export default StyleSheet.create({

	/* View Styles */

	mainView: {


		backgroundColor: Const.theme.dark,
		paddingBottom: Const.navigationBarHeight,
		height: Const.screenHeight,
		width: Const.screenWidth,
		justifyContent: 'center',
		alignItems: 'center',
	},

	zimifyView: {
		flex: 3,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},

	inputView: {
		flex: 1,
		minHeight: 90,
		justifyContent: 'center',
		alignItems: 'center',
		width: '70%',
	},

	keepView: {
		flex: 1,
		maxWidth: '70%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		maxHeight: 22,
		margin: 5,
	},

	childLeftKeepView: {

		...Platform.select({
			ios: {
				padding: 10,
			},
			android: {
				padding: 0,
			},
		}),
	},

	childRightKeepView: {
		flex: 1,
	},

	loginbuttonView: {

		justifyContent: 'center',
		alignItems: 'center',
	},
	goBackbuttonView: {

		justifyContent: 'center',
		alignItems: 'center',
	},

	space: {
		width: Const.screenWidth,
		height: 0.15 * Const.screenHeight,
	},
	lowerspace: {
		width: Const.screenWidth,
		height: 0.07 * Const.screenHeight,
	},

	/* Text styles */

	inputText: {
		color: Const.theme.light,
		fontFamily: Platform.OS == "ios" ? 'Montserrat-SemiBold' : 'MontserratSemiBold',
		fontSize: 20,
	},

	keepText: {
		color: Const.theme.light,
		fontFamily: Platform.OS == "ios" ? 'Montserrat-SemiBold' : 'MontserratSemiBold',
		fontSize: 15,
	},

	loginText: {
		color: Const.theme.light,
		fontSize: 20,
		fontFamily: Platform.OS == "ios" ? 'Montserrat-SemiBold' : 'MontserratSemiBold',

	},
	goBackText: {
		color: Const.theme.light,
		fontSize: 20,
		fontFamily: Platform.OS == "ios" ? 'Montserrat-SemiBold' : 'MontserratSemiBold',

	},
	loginTitle: {
		color: Const.theme.light,
		fontSize: 30,
		fontFamily: Platform.OS == "ios" ? 'Montserrat-SemiBold' : 'MontserratSemiBold',

	},

	/* TextInput Style */

	input: {
		height: 40,
		width: 0.75 * Const.screenWidth,
		fontFamily: Platform.OS == "ios" ? 'Montserrat-SemiBold' : 'MontserratSemiBold',
		fontSize: 15,
		color: Const.theme.light,
	},
	inputContainer: {
		marginVertical: 5,
		width: 0.75 * Const.screenWidth,
		height: Platform.OS == 'ios' ? 60 : 50,
		backgroundColor: Const.theme.mid,
		borderRadius: Platform.OS == 'ios' ? 30 : 35,
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: 'rgba(0,0,0, .4)',			// IOS
		shadowOffset: { height: 2, width: 0 }, // IOS
		shadowOpacity: 2,								// IOS
		shadowRadius: 2,								// IOS
		elevation: 2,
	},

	/* Buttons */
	loginButton: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 0.05 * Const.screenHeight,
		width: 0.35 * Const.screenWidth,
		margin: 15,
		backgroundColor: Const.theme.mid,
		borderRadius: 30,
		shadowColor: 'rgba(0,0,0, .4)',			// IOS
		shadowOffset: { height: 2, width: 2 }, // IOS
		shadowOpacity: 2,								// IOS
		shadowRadius: 2,								// IOS
		elevation: 2,									// Android
	},
	goBackButton: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 0.05 * Const.screenHeight,
		width: 0.35 * Const.screenWidth,
		margin: 15,
		backgroundColor: Const.theme.mid,
		borderRadius: 30,
		shadowColor: 'rgba(0,0,0, .4)',			// IOS
		shadowOffset: { height: 2, width: 2 }, // IOS
		shadowOpacity: 2,								// IOS
		shadowRadius: 2,								// IOS
		elevation: 2,									// Android
	},
});
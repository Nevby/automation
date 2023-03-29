import { StyleSheet, Platform } from 'react-native';
import * as Const from '../../values/globalConstants';

export default StyleSheet.create({

	/* View Styles */
	mainView: {
		backgroundColor: Const.theme.dark,
		height: Const.windowHeight - 75,
		width: Const.screenWidth - 50,
		borderRadius: 30,
		alignContent: "space-between",
		paddingHorizontal: 10,
	},
	childView: {
		flex: 1,
		overflow: 'hidden',
		borderColor: Const.theme.mid,
		borderWidth: 2,
		borderRadius: 10,
		padding: 2,

	},
	childView2: {
		flex: 1,
		overflow: 'hidden',
		borderColor: Const.theme.mid,
		borderWidth: 0,
		borderRadius: 10,
		padding: 4,
	},
	loginbuttonView: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		minHeight: 50,
		borderWidth: 0,
		borderColor: Const.theme.light,
		borderRadius: 4,
	},
	/* Text styles */
	loginText: {
		color: Const.theme.light,
		fontSize: 20,
		fontFamily: Platform.OS == "ios" ? 'Montserrat-SemiBold' : 'MontserratSemiBold',
	},

	inputText: {
		color: 'white',
		fontFamily: Platform.OS == "ios" ? 'Montserrat-SemiBold' : 'MontserratSemiBold',

		fontSize: 20,
	},
	input: {
		height: 40,
		width: 200,
		color: Const.theme.light,
		fontFamily: Platform.OS == "ios" ? 'Montserrat-SemiBold' : 'MontserratSemiBold',
		fontSize: 16,
		margin: 6,
		borderWidth: 2,
		borderRadius: 6,
		horizontalPadding: 10,
		alignContent: 'center',
		justifyContent: 'center',
		borderColor: Const.theme.mid
	},
	inputContainer: {
		overflow: 'hidden',
		borderColor: Const.theme.mid,
		borderWidth: 0,
		borderRadius: 10,
		paddingTop: 20, 
		flexDirection: 'row', 
		justifyContent: 'center',
		alignContent: 'space-between',
	},
});
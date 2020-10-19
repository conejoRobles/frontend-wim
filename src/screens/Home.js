import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, StatusBar } from 'react-native';
import Logo from '../components/Logo';

const Home = ({ navigation }) => {
	// const fetchPrueba = async () => {
	// 	const res = await fetch('http://192.168.1.51:3000/')
	// 	const json = await res.json()
	// 	console.log(Object.values(json.payload)[0])
	// }

	// useEffect(() => {
	// 	fetchPrueba()
	// }, [])

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor="#e84c22"></StatusBar>
			<ImageBackground source = {require('../../assets/home.png')} style = {styles.image} resizeMode= 'cover'>
				<Logo />
				<TouchableOpacity
					style={styles.button}
					onPress={() => {
						navigation.navigate('PreRegistrationScreen')
					}}
				>
					<Text style={styles.textoBoton}>Registrarse</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.button, { backgroundColor: '#04254E' }]}
					onPress={() => {
						navigation.navigate('LoginScreen')
					}}
				>
					<Text style={styles.textoBoton}>Iniciar sesión</Text>
				</TouchableOpacity>
			</ImageBackground>
		</View >
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center'
	},
	titulo: {
		fontSize: 35,
		marginBottom: 20,
		fontWeight: 'bold'
	},
	textoBoton: {
		color: 'white',
		fontSize: 25,
	},
	button: {
		width: "65%",
		backgroundColor: "#e84c22",
		borderRadius: 10,
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 40,
		marginBottom: 10
	},
	icon: {
		width: 28,
		justifyContent: 'center',
		marginLeft: 20,
		marginRight: 10,
		alignItems: 'center'
	},
	inputView: {
		// flex: 1,
		flexDirection: 'row',
		width: "80%",
		backgroundColor: "#f6f6f6",
		borderRadius: 25,
		height: 50,
		marginBottom: 20,
		justifyContent: "center",
	},
	inputText: {
		width: '80%',
		flex: 1,
		fontSize: 20,
		color: "black"
	},
	image: {
		flex: 1,
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor: 'blue'
	}
});

export default Home
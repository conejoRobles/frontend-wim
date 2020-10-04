import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableHighlight } from 'react-native';
import Logo from '../components/Logo';
import Icon from 'react-native-vector-icons/FontAwesome';

export default Home = ({ navigation }) => {
	const [email, setEmail] = useState({ value: '', error: '' });
	const [password, setPassword] = useState({ value: '', error: '' });
	const [showPass, setShowPass] = useState({ value: true });
	return (
		<View style={styles.container}>
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
				style={[styles.button, { backgroundColor: 'rgb(4, 37, 78)' }]}
				onPress={() => {
					navigation.navigate('LoginScreen')
				}}
			>
				<Text style={styles.textoBoton}>Iniciar sesión</Text>
			</TouchableOpacity>
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
		backgroundColor: "#fb5b5a",
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
});
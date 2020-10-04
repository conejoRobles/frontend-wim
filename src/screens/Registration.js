import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'

export default function Registration({ navigation }) {
	const [usuario, setUsuario] = useState({
		nombre: '',
		pass: '',
		correo: '',
		rut: '',
		telefono: ''
	})
	const [showPass, setShowPass] = useState({ value: true });

	return (
		<View style={styles.container} >
			<Text style={styles.titulo}>Registro</Text>
			<View style={styles.inputView}>
				<View style={styles.icon}>
					<Icon name="user" size={25} />
				</View>
				<TextInput
					style={styles.inputText}
					placeholder="Nombre"
					placeholderTextColor="grey"
					onChangeText={text => setUsuario({ nombre: text })}
				/>
			</View>
			<View style={styles.inputView}>
				<View style={styles.icon}>
					<Icon name="lock" size={25} />
				</View>
				<TextInput
					secureTextEntry={showPass.value}
					style={styles.inputText}
					placeholder="Contraseña"
					placeholderTextColor="grey"
					onChangeText={text => setUsuario({ pass: text })}
				/>
				<View style={styles.icon}>
					<TouchableHighlight
						underlayColor={'rgb(251, 91, 90)'}
						onPress={() => {
							setShowPass({ value: !showPass.value })
						}}
					>
						<Icon name="eye" size={25} />
					</TouchableHighlight>
				</View>
			</View>
			<View style={styles.inputView}>
				<View style={styles.icon}>
					<Icon name="id-card-o" size={25} />
				</View>
				<TextInput
					style={styles.inputText}
					placeholder="Rut"
					placeholderTextColor="grey"
					onChangeText={text => setUsuario({ rut: text })}
				/>
			</View>
			<View style={styles.inputView}>
				<View style={styles.icon}>
					<Icon name="envelope" size={25} />
				</View>
				<TextInput
					style={styles.inputText}
					placeholder="Email"
					placeholderTextColor="grey"
					onChangeText={text => setUsuario({ correo: text })}
				/>
			</View>
			<View style={styles.inputView}>
				<View style={styles.icon}>
					<Icon name="phone" size={25} />
				</View>
				<TextInput
					// secureTextEntry
					style={styles.inputText}
					placeholder="Telefono"
					placeholderTextColor="grey"
					onChangeText={text => setUsuario({ telefono: text })}
				/>
			</View>
			<TouchableOpacity
				style={styles.button}
				onPress={() => {
					navigation.navigate('LoginScreen')
				}}
			>
				<Text style={styles.textoBoton}>Registrarse</Text>
			</TouchableOpacity>
		</View>
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
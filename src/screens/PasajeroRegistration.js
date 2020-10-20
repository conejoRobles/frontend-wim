import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, TouchableHighlight, Alert, ImageBackground, StatusBar } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'

const PasajeroRegistration = ({ navigation }) => {
	const [nombre, setNombre] = useState('')
	const [pass, setPass] = useState('')
	const [correo, setCorreo] = useState('')
	const [rut, setRut] = useState('')
	const [telefono, setTelefono] = useState('')
	const [showPass, setShowPass] = useState({ value: true })

	return (
		<View style={styles.container} >
			<StatusBar backgroundColor="#e84c22"></StatusBar>
			<ImageBackground source={require('../../assets/home.png')} style={styles.image} resizeMode='cover'>
				<Text style={styles.titulo}>Registro</Text>
				<View style={styles.inputView}>
					<View style={styles.icon}>
						<Icon name="user" size={25} />
					</View>
					<TextInput
						style={styles.inputText}
						placeholder="Nombre"
						placeholderTextColor="grey"
						onChangeText={text => setNombre(text)}
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
						onChangeText={text => setPass(text)}
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
						onChangeText={text => setRut(text)}
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
						onChangeText={text => setCorreo(text)}
					/>
				</View>
				<View style={styles.inputView}>
					<View style={styles.icon}>
						<Icon name="phone" size={25} />
					</View>
					<TextInput
						style={styles.inputText}
						placeholder="Telefono"
						placeholderTextColor="grey"
						onChangeText={text => setTelefono(text)}
					/>
				</View>
				<TouchableOpacity
					style={styles.button}
					onPress={() => {
						registro({
							nombre,
							pass,
							correo,
							rut,
							telefono
						}, navigation)
					}}
				>
					<Text style={styles.textoBoton}>Registrarse</Text>
				</TouchableOpacity>
			</ImageBackground>
		</View>
	);
}

const registro = async (usuario, navigation) => {
	const res = await fetch('http://192.168.1.51:3000/addPasajero', {
		// const res = await fetch('http://192.168.0.16:3000/addPasajero', {
		method: 'POST',
		headers: {
			'Content-Type': 'Application/json',
		},
		body: JSON.stringify({
			rut: usuario.rut,
			nombre: usuario.nombre,
			telefono: usuario.telefono,
			correo: usuario.correo,
			pass: usuario.pass,
			recorridos: [],
			rol: 'pasajero',
		}),
	})
	const ans = await res.json()
	if (ans.ok) {
		Alert.alert(
			"Bienvenido!",
			ans.mensaje,
			[
				{ text: "OK", onPress: () => navigation.navigate('LoginScreen') }
			],
			{ cancelable: false }
		);
	} else {
		Alert.alert(
			"Oh no! algo anda mal",
			ans.mensaje,
			[
				{ text: "Volver a intentar" }
			],
			{ cancelable: false }
		);
	}
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


const mapStateToProps = state => {

	return state
}

export default connect(mapStateToProps)(PasajeroRegistration)
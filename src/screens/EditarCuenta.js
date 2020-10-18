import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { render } from "react-dom";
import { connect } from 'react-redux'
import { StyleSheet, Text, TextInput, View, TouchableOpacity, TouchableHighlight, Alert, ImageBackground } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'
import { load } from '../store/actions/empresas'

const EditarCuenta = ({ navigation, user, load }) => {
	const [nombre, setNombre] = useState(user.nombre)
	const [pass, setPass] = useState('')
	const [correo, setCorreo] = useState('')
	const [rut, setRut] = useState('')
	const [telefono, setTelefono] = useState('')
	const [showPass, setShowPass] = useState({ value: true })
	const [editar, setEditar] = useState(false)

	return (
		<View style={styles.container} >
			<Text style={styles.titulo}>Cuenta</Text>
			<View style={styles.inputView}>
				<View style={styles.icon}>
					<Icon name="user" size={25} />
				</View>
				<TextInput
					editable={editar}
					style={styles.inputText}
					placeholder="Nombre"
					value={nombre}
					placeholderTextColor="grey"
					onChangeText={text => setNombre(text)}
					editable={editar}
				/>
			</View>
			<View style={styles.inputView}>
				<View style={styles.icon}>
					<Icon name="lock" size={25} />
				</View>
				<TextInput
					editable={editar}
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
						disabled={!editar}
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
					editable={editar}
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
					editable={editar}
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
					editable={editar}
					style={styles.inputText}
					placeholder="Telefono"
					placeholderTextColor="grey"
					onChangeText={text => setTelefono(text)}
				/>
			</View>
			{isChanging(editar, setEditar, load)}
			<TouchableOpacity
				style={[styles.button, { backgroundColor: 'rgb(4, 37, 78)' }]}
				onPress={() => {
					logOut(navigation)
				}}
			>
				<Text style={styles.textoBoton}>Cerrar Sesión</Text>
			</TouchableOpacity>
		</View>
	);
}


const logOut = (navigation) => {
	navigation.navigate('Home')
}

const isChanging = (editar, setEditar, load) => {
	load()
	return editar ? (
		<TouchableOpacity
			style={styles.button}
			onPress={() => {
				setEditar(false)

				change({

				})
			}}
		>
			<Text style={styles.textoBoton}>Guardar</Text>
		</TouchableOpacity>
	) : (
			<TouchableOpacity
				style={styles.button}
				onPress={() => {
					setEditar(true)
				}}
			>
				<Text style={styles.textoBoton}>Editar</Text>
			</TouchableOpacity>
		)
}

const change = async (usuario, navigation) => {
	const res = await fetch('http://192.168.0.16:3000/changePasajero', {
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
		backgroundColor: "#fb5b5a",
		borderRadius: 10,
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 20,
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
	console.log(state)
	return state
}
const mapDispatchToProps = dispatch => ({
	load: () => dispatch(load())
})

export default connect(mapStateToProps, mapDispatchToProps)(EditarCuenta)
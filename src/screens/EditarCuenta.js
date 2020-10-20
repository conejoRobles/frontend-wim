import React, { useState } from "react";
import { render } from "react-dom";
import { connect } from 'react-redux'
import { StyleSheet, Text, TextInput, View, TouchableOpacity, TouchableHighlight, Alert, ImageBackground, StatusBar } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'
import { logout } from '../store/actions/user'
import { user } from "../store/reducers";

const EditarCuenta = ({ navigation, user, load, logout }) => {
	const [nombre, setNombre] = useState(user.nombre)
	const [pass, setPass] = useState(user.pass)
	const [correo, setCorreo] = useState(user.correo)
	const [rut, setRut] = useState(user.rut)
	const [telefono, setTelefono] = useState(user.telefono)
	const [showPass, setShowPass] = useState({ value: true })
	const [editar, setEditar] = useState(false)
	const [rol, setRol] = useState(user.rol)

	return (
		<View style={styles.container} >
			<StatusBar backgroundColor="#e84c22" />
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
					value={pass}
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
					value={rut}
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
					value={correo}
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
					value={telefono}
					placeholderTextColor="grey"
					onChangeText={text => setTelefono(text)}
				/>
			</View>
			{isChanging(editar, setEditar, load, nombre, pass, correo, rut, telefono, rol)}
			<TouchableOpacity
				style={[styles.button, { backgroundColor: 'rgb(4, 37, 78)' }]}
				onPress={() => {
					logOut(navigation, user, logout)
				}}
			>
				<Text style={styles.textoBoton}>Cerrar Sesión</Text>
			</TouchableOpacity>
		</View>
	)
}


const logOut = async (navigation, user, logout) => {
	await logout()
	navigation.navigate('Home')
}

const isChanging = (editar, setEditar, load, nombre, pass, correo, rut, telefono, rol) => {
	return editar ? (
		<TouchableOpacity
			style={styles.button}
			onPress={() => {
				setEditar(false)
				guardar({
					nombre,
					pass,
					correo,
					rut,
					telefono,
					rol
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

const guardar = async (usuario) => {
	const res = usuario.rol == 'empresa' ? (
		// await fetch('http://192.168.1.51:3000/editEmpresa', {
		await fetch('http://192.168.0.16:3000/editEmpresa', {
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
				rol: 'empresa',
			}),
		})) : (
			// await fetch('http://192.168.1.51:3000/editPasajero', {
			await fetch('http://192.168.0.16:3000/editPasajero', {
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
			}))

	const ans = await res.json()
	if (ans.ok) {

		Alert.alert(
			"Genial!",
			'Hemos actualizado tus datos!',
			[
				{ text: "OK", onPress: () => '' }
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
	return state
}

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(EditarCuenta)
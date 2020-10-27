import React, { useState } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableHighlight, Alert, ImageBackground, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { inicioSesion } from '../store/actions/user'
import { empresasLoad } from '../store/actions/empresas'
import { AppLoading } from 'expo'
import { back } from '../../env'

const Login = ({ navigation, inicioSesion, empresasLoad, user }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPass, setShowPass] = useState(true);
	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<ImageBackground source={require('../../assets/login_register.png')} style={styles.image} resizeMode='cover'>
				<Text style={styles.titulo}>
					Inicio de sesión
				</Text>
				<View style={styles.inputView}>
					<View style={styles.icon}>
						<Icon name="envelope" size={25} />
					</View>
					<TextInput
						style={styles.inputText}
						returnKeyType='next'
						onChangeText={(text) => {
							setEmail(text)
						}}
						autoCapitalize='none'
						autoCompleteType='email'
						keyboardType='email-address'
						placeholder='correo@gmail.com'
					/>
				</View>
				<View style={styles.inputView}>
					<View style={styles.icon}>
						<Icon name="lock" size={25} />
					</View>
					<TextInput
						style={styles.inputText}
						returnKeyType='done'
						autoCapitalize='none'
						onChangeText={text => setPassword(text)}
						placeholder={'contraseña'}
						secureTextEntry={showPass}
					/>
					<View style={styles.icon}>
						<TouchableHighlight
							underlayColor={'rgb(251, 91, 90)'}
							onPress={() => {
								setShowPass(!showPass)
							}}
						>
							<Icon name="eye" size={25} />
						</TouchableHighlight>
					</View>
				</View>
				<TouchableOpacity
					style={styles.button}
					onPress={() => {
						inicio({
							email,
							password,
						}, navigation, inicioSesion, empresasLoad, user)

					}}
				>
					<Text style={styles.textoBoton}>Iniciar sesión</Text>
				</TouchableOpacity>
			</ImageBackground>
		</View >
	);
}

const inicio = async (usuario, navigation, inicioSesion, empresasLoad, user) => {
	const res = await fetch(back, {
		method: 'POST',
		headers: {
			'Content-Type': 'Application/json',
		},
		body: JSON.stringify({
			correo: usuario.email,
			pass: usuario.password,
		}),
	})
	const ans = await res.json()
	if (ans.ok) {
		await inicioSesion(ans.usuario)
		if (ans.usuario.rol == 'empresa') {
			let res2 = await fetch(back + 'getRecorridos?rut=' + ans.usuario.rut)
			let ans2 = await res2.json()
			if (ans2.ok) {
				let recorridos = ans2.recorridos
				empresasLoad(recorridos)
			}
		} else {
			let res2 = await fetch(back + 'getEmpresas?rut=' + ans.usuario.rut)
			let ans2 = await res2.json()
			if (ans2.ok) {
				let aux = Object.values(ans2.empresas)
				let empresas = []
				Promise.all(aux.map(async (empresa, i) => {
					let res3 = await fetch(back + 'getRecorridos?rut=' + empresa.rut)
					let ans3 = await res3.json()
					if (ans3.ok) {
						empresa.recorridos.map((recorrido) => {
							ans3.recorridos.map(reco => {
								if (recorrido.id == reco.id) {
									reco = {
										...reco,
										rut: '' + empresa.rut,
										nombre: '' + empresa.nombre,
									}
									empresas.push(reco)
								}
							})
						})
					}
				})).then(() => {
					empresasLoad(empresas)
				})
			}
		}
		Alert.alert(
			"Bienvenido!",
			ans.usuario.nombre,
			[
				{
					text: "OK", onPress: () => navigation.navigate('PrincipalDrawer', {
						rol: ans.usuario.rol
					})
				}
			],
			{ cancelable: false }
		);
	} else {
		Alert.alert(
			"Oh no!",
			ans.mensaje,
			[
				{ text: "Intentar otra vez" }
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

const mapDispatchToProps = dispatch => ({
	inicioSesion: (user) => dispatch(inicioSesion(user)),
	empresasLoad: (empresas) => dispatch(empresasLoad(empresas))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
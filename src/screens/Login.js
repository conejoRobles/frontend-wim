import React, { useState } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableHighlight, Alert, ImageBackground, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { inicioSesion } from '../store/actions/user'
import { noticiasLoad } from '../store/actions/noticias'
import { AppLoading } from 'expo';

const Login = ({ navigation, inicioSesion, noticiasLoad, user }) => {
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
						}, navigation, inicioSesion, noticiasLoad, user)

					}}
				>
					<Text style={styles.textoBoton}>Iniciar sesión</Text>
				</TouchableOpacity>
			</ImageBackground>
		</View >
	);
}

const inicio = async (usuario, navigation, inicioSesion, noticiasLoad, user) => {
	const res = await fetch('http://192.168.1.51:3000/', {
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
		let res2 = await fetch('http://192.168.1.51:3000/Noticias?rut=801234567&recorrido=0')
		let ans2 = await res2.json()
		if (ans2.ok) {
			let noti = ans2.noticias
			await noticiasLoad(noti)
			await inicioSesion(ans.usuario)
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
	noticiasLoad: (noticias) => dispatch(noticiasLoad(noticias))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
import React, { useState } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableHighlight, Alert, ImageBackground, StatusBar, Modal, Animated, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { inicioSesion } from '../store/actions/user'
import { empresasLoad } from '../store/actions/empresas'
import { horariosLoad } from '../store/actions/horarios'
import { changeTitle } from '../store/actions/title'
import { AppLoading } from 'expo'
import { logout } from '../store/actions/user'
import { back } from '../../env'

const Login = ({ navigation, inicioSesion, empresasLoad, user, logout, horariosLoad, horarios, changeTitle }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPass, setShowPass] = useState(true);
	const [loading, setLoading] = useState(false)

	const [animation, setAnimation] = useState(new Animated.Value(0))
	const startAnimation = () => {
		Animated.timing(animation, {
			toValue: -5540,
			duration: 9000,
			useNativeDriver: true,
		}).start()
	}
	const rotateInterPolate = animation.interpolate({
		inputRange: [0, 360],
		outputRange: ["0deg", "-360deg"],
	})
	const animatedStyles = {
		transform: [{ rotate: rotateInterPolate }],
	};
	return (
		<View style={loading ? ([styles.container, { opacity: 0.25 }]) : ([styles.container])} >
			<Modal
				animationType="fade"
				transparent={true}
				visible={loading}
			>
				<Animated.View style={[styles.container, { backgroundColor: null }, animatedStyles]} >
					<Image
						style={styles.tinyLogo}
						source={require('../../assets/logo.png')}
					></Image>
				</Animated.View>
			</Modal>
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
						if (email == undefined || email == null || password == null || password == undefined || email == '' || password == '') {
							Alert.alert(
								"Oh no!",
								"Ninguno de los campos puede quedar vacio!",
								[
									{
										text: "OK", onPress: () => navigation.navigate('LoginScreen')
									}
								],
								{ cancelable: false }
							);
						} else {
							if (!loading) {
								setLoading(true)
								startAnimation()
								inicio({
									email,
									password,
								}, navigation, inicioSesion, empresasLoad, user, logout, setLoading, horariosLoad, horarios, changeTitle)
							}
						}
					}}
				>
					<Text style={styles.textoBoton}>Iniciar sesión</Text>
				</TouchableOpacity>
			</ImageBackground>
		</View >
	);
}

const trie = async (usuario, navigation, inicioSesion, empresasLoad, user, logout, setLoading) => {
	const timeOut = 8000
	const controller = new AbortController()
	const id = setTimeout(() => controller.abort(), timeOut)
	const res = await fetch(back, {
		method: 'POST',
		headers: {
			'Content-Type': 'Application/json',
		},
		body: JSON.stringify({
			correo: usuario.email,
			pass: usuario.password,
		}),
		signal: controller.signal
	})
	clearTimeout(id)
	return res
}

const inicio = async (usuario, navigation, inicioSesion, empresasLoad, user, logout, setLoading, horariosLoad, horarios, changeTitle) => {
	await logout()
	try {
		res = await trie(usuario, navigation, inicioSesion, empresasLoad, user, logout, setLoading)
	} catch (error) {
		setLoading(false)
		Alert.alert(
			"Oh no!",
			'Parece haber un error con tus datos, revisalos y prueba denuevo',
			[
				{ text: "Intentar otra vez" }
			],
			{ cancelable: false }
		);
	}
	const ans = await res.json()
	let cantNoticias = 0;
	if (ans.ok) {
		await inicioSesion(ans.usuario)
		if (ans.usuario.rol == 'empresa') {
			let res2 = await fetch(back + 'getRecorridos?rut=' + ans.usuario.rut)
			let ans2 = await res2.json()
			if (ans2.ok) {
				let recorridos = ans2.recorridos
				empresasLoad(Object.values(recorridos))
			} else {
				empresasLoad([])
			}
			setLoading(false)
			Alert.alert(
				"Bienvenido!",
				ans.usuario.nombre,
				[
					{
						text: "OK", onPress: () => navigation.navigate('PrincipalDrawer', {
							rol: ans.usuario.rol,
							cantNoticias: 0,
						})
					}
				],
				{ cancelable: false }
			)
		} else {
			let res2 = await fetch(back + 'getEmpresas?rut=' + ans.usuario.rut)
			let ans2 = await res2.json()
			if (ans2.ok) {
				let favoritos = Object.values(ans2.favoritos)
				let from = Object.keys(ans2.favoritos)
				let fav = []
				favoritos.map(origen => {
					fav.push(origen)
				})
				let origenes = Object.values(fav)
				let data = []
				origenes.map((x, i) => {
					let aux = Object.values(x).filter(x => x.id != null && x.id != undefined)
					aux.map(y => {
						if (y.Horarios != null && y.Horarios != undefined) {
							let horarios = []
							horarios = Object.values(y.Horarios).map(async z => {
								let res = await fetch(back + 'searchHorario', {
									method: 'POST',
									headers: {
										'Content-Type': 'Application/json',
									},
									body: JSON.stringify({
										empresa: z.empresa,
										recorrido: z.recorrido,
										horario: z.id,
									}),
								})
								res = await res.json()
								if (res.ok) {
									cantNoticias = res.horario.Noticias != null && res.horario.Noticias != undefined ? (cantNoticias + Object.values(res.horario.Noticias).length) : (cantNoticias + 0)
									return ({
										...z,
										...res.horario,
										origen: y.origen,
										destino: y.destino,
										precios: res.precios
									})
								}
							})
							Promise.all(horarios).then((horar) => {
								y.Horarios = horar
							})
						}
						data.push(y)
					})
				})
				horariosLoad(data)
				empresasLoad(data)
			} else {
				empresasLoad([])
			}
			setLoading(false)
			Alert.alert(
				"Bienvenido!",
				ans.usuario.nombre,
				[
					{
						text: "OK", onPress: () => {
							navigation.navigate('PrincipalDrawer', {
								rol: ans.usuario.rol,
								cantNoticias: cantNoticias,
							})
						}
					}
				],
				{ cancelable: false }
			);
		}
	} else {
		await logout()
		setLoading(false)
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
	}, tinyLogo: {
		width: 250,
		height: 245,
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
	empresasLoad: (empresas) => dispatch(empresasLoad(empresas)),
	logout: () => dispatch(logout()),
	horariosLoad: (favoritos) => dispatch(horariosLoad(favoritos)),
	changeTitle: (text) => dispatch(changeTitle(text))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
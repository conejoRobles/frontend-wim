import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

const Login = ({ navigation }) => {
	const [email, setEmail] = useState({ value: '', error: '' });
	const [password, setPassword] = useState({ value: '', error: '' });
	const [showPass, setShowPass] = useState({ value: true });
	return (
		<View style={styles.container}>
			<Text style={styles.titulo}>
				Inicio de sesión
   </Text>
			<View style={styles.inputView}>
				<View style={styles.icon}>
					<Icon name="envelope" size={25} />
				</View>
				<TextInput
					style={styles.inputText}
					label='Email'
					returnKeyType='next'
					value={email.value}
					onChangeText={(text) => {
						setEmail({ value: text, error: '' })
					}}
					error={!!email.error}
					errorText={email.error}
					autoCapitalize='none'
					autoCompleteType='email'
					textContentType='emailAddress'
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
					label='Password'
					returnKeyType='done'
					value={password.value}
					onChangeText={text => setPassword({ value: text, error: '' })}
					error={!!password.error}
					errorText={password.error}
					placeholder={'contraseña'}
					secureTextEntry={showPass.value}
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
			<TouchableOpacity
				style={styles.button}
				onPress={() => {
					alert('correo:' + email.value + ' clave:' + password.value)
					navigation.navigate('HomeScreen')
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

export default Login
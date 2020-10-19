import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, StatusBar } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'

const PreRegistro = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<StatusBar backgroundColor="#e84c22"></StatusBar>
			<ImageBackground source = {require('../../assets/home.png')} style = {styles.image} resizeMode= 'cover'>
				<Text style={styles.titulo}>Registrarse</Text>
				<Text style={styles.titulo}>como:</Text>
				<TouchableOpacity style={[styles.button, { backgroundColor: '#ff3d00' }]}
					onPress={() => {
						navigation.navigate('PasajeroRegistrationScreen')
					}}
				>
					<Icon name="user" size={40} style={styles.icon} />
					<Text style={styles.texto}>Pasajero</Text>
					<View style={styles.lineStyle} />
					<Text style={styles.texto2}>Si buscas un recorrido
					para viajar, este es tu perfil</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.button, { backgroundColor: '#04254E' }]}
					onPress={() => {
						navigation.navigate('EmpresaRegistrationScreen')
					}}
				>
					<Icon name="bus" size={40} style={styles.icon} />
					<Text style={styles.texto}>Empresa</Text>
					<View style={styles.lineStyle} />
					<Text style={styles.texto2}>Si quieres ofrecer un recorrido
					para viajar, este es tu perfil</Text>
				</TouchableOpacity>
			</ImageBackground>
		</View>
	)
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
		fontWeight: 'bold'
	},
	button: {
		width: "70%",
		borderRadius: 30,
		height: 250,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 40,
		marginBottom: 10
	},
	icon: {
		color: 'white'
	},
	texto: {
		color: 'white',
		fontSize: 30,
		fontWeight: 'bold'
	},
	texto2: {
		color: 'white',
		padding: 10,
		textAlign: 'center',
		fontSize: 20,
	},
	lineStyle: {
		width: '65%',
		borderWidth: 2,
		borderColor: 'white',
		margin: 10,
	},
	image: {
		flex: 1,
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor: 'blue'
	}
})


const mapStateToProps = state => {

	return state
}

export default connect(mapStateToProps)(PreRegistro)
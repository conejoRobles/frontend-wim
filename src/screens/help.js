import React, { useState, useCallback } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, StatusBar, Alert, Button } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Constants from 'expo-constants'
import { connect } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient';
import empresas from '../store/reducers/empresas'
import { back } from '../../env'
import { horariosLoad } from '../store/actions/horarios'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Title } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'
import YoutubePlayer from "react-native-youtube-iframe"


function Help() {
	const [playing, setPlaying] = useState(false);
	const onStateChange = useCallback((state) => {
		if (state === "ended") {
			setPlaying(false);
		}
	}, []);
	return (
		<View style={[styles.container]}>
			<StatusBar backgroundColor="#ff6900"></StatusBar>
			<View style={[styles.button, styles.bordes, { backgroundColor: 'white', marginBottom: 0, }]}>
				<Text style={styles.texto2}>Informaciones</Text>
				<Text style={styles.texto3}>Aquí encontraras tutoriales</Text>
			</View>
			<ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', marginTop: '4%', paddingBottom: '10%', borderTopColor: 'red' }} >
				<Text style={[styles.texto2, { marginBottom: 12 }]}>Editar tu cuenta</Text>
				<YoutubePlayer
					height={200}
					width={300}
					play={playing}
					videoId={"nw9E3fQvUEY"}
					onChangeState={onStateChange}
				/>
				<Text style={[styles.texto2, { marginBottom: 12 }]}>Cerrar sesión</Text>
				<YoutubePlayer
					height={200}
					width={300}
					play={playing}
					videoId={"nw9E3fQvUEY"}
					onChangeState={onStateChange}
				/>
				<Text style={[styles.texto2, { marginBottom: 12 }]}>Agregar un recorrido</Text>
				<YoutubePlayer
					height={200}
					width={300}
					play={playing}
					videoId={"nw9E3fQvUEY"}
					onChangeState={onStateChange}
				/>
				<Text style={[styles.texto2, { marginBottom: 12 }]}>Editar un recorrido</Text>
				<YoutubePlayer
					height={200}
					width={300}
					play={playing}
					videoId={"nw9E3fQvUEY"}
					onChangeState={onStateChange}
				/>
				<Text style={[styles.texto2, { marginBottom: 12 }]}>Agregar un horario</Text>
				<YoutubePlayer
					height={200}
					width={300}
					play={playing}
					videoId={"nw9E3fQvUEY"}
					onChangeState={onStateChange}
				/>
				<Text style={[styles.texto2, { marginBottom: 12 }]}>Editar un horario</Text>
				<YoutubePlayer
					height={200}
					width={300}
					play={playing}
					videoId={"nw9E3fQvUEY"}
					onChangeState={onStateChange}
				/>
				<Text style={[styles.texto2, { marginBottom: 12 }]}>Agregar una noticia</Text>
				<YoutubePlayer
					height={200}
					width={300}
					play={playing}
					videoId={"nw9E3fQvUEY"}
					onChangeState={onStateChange}
				/>
				<Text style={[styles.texto2, { marginBottom: 12 }]}>Editar una noticia</Text>
				<YoutubePlayer
					height={200}
					width={300}
					play={playing}
					videoId={"nw9E3fQvUEY"}
					onChangeState={onStateChange}
				/>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		width: '100%',
		height: 50,
		// flex: 1,
		flexDirection: 'row',
		backgroundColor: '#e84c22',
		paddingLeft: 20,
		alignItems: 'center',
		// justifyContent: 'center',
	},
	headerText: {
		fontWeight: 'bold',
		fontSize: 10,
		color: 'white',
		letterSpacing: 1
	},
	texto2: {
		color: '#e84c22',
		textAlign: 'center',
		fontSize: 15,
	},
	texto4: {
		color: '#e84c22',
		textAlign: 'center',
		fontSize: 22,
	},
	container: {
		flex: 1,
		// marginTop: Constants.statusBarHeight,
	},
	button: {
		marginHorizontal: 40,
		borderRadius: 30,
		height: 150,
		alignItems: "center",
		justifyContent: "center",
		marginVertical: 15,
	},
	button2: {
		backgroundColor: 'rgba(232,76,34,0.3)',
		width: '60%',
		alignItems: 'center',
		borderBottomRightRadius: 50,
		borderBottomLeftRadius: 50,
		height: 45,
		// justifyContent: 'center',
		paddingTop: 4,
		marginBottom: 10,
	},
	contenedor: {
		// flex: 1,
		backgroundColor: 'white',
		alignItems: 'center',
		// height: screenHeight,
		// justifyContent: 'center',
		// marginTop: Constants.statusBarHeight,
	},
	texto: {
		fontSize: 22,
		fontWeight: 'bold',
		color: 'white'
	},
	icon: {
		width: 50,
		color: 'white'
	},
	texto2: {
		color: '#e84c22',
		fontSize: 30,
		fontWeight: 'bold'
	},
	texto3: {
		color: 'black',
		textAlign: 'center',
		fontSize: 20,
	},
	// ff3d00
	bordes: {
		borderWidth: 1,
		borderBottomWidth: 5,
		borderTopWidth: 0,
		borderColor: '#ff4b00'
	}
});

const mapStateToProps = state => {
	return state
}
const mapDispatchToProps = dispatch => ({
	horariosLoad: (favoritos) => dispatch(horariosLoad(favoritos)),
})


export default connect(mapStateToProps, mapDispatchToProps)(Help)
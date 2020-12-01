import React, { useState } from "react";
import { render } from "react-dom";
import { connect } from 'react-redux'
import { StyleSheet, Text, TextInput, View, TouchableOpacity, TouchableHighlight, Alert, ImageBackground, StatusBar } from "react-native";
import { logout } from '../store/actions/user'
import { back } from '../../env'
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome'
import { FlatList } from "react-native-gesture-handler";
import { agregarHo, eliminarHorario } from '../store/actions/horarios'

function infoRecorrido({ navigation, route, agregarHo, user, empresas }) {
    const { item, favo } = route.params
    const [fav, setFav] = useState(favo)
    return (
        <View style={[styles.container, { padding: 20 }]}>
            <StatusBar backgroundColor="#e84c22"></StatusBar>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={[styles.texto2, { marginBottom: 20 }]}>{item.nombre}</Text>
            </View>
            <View style={{ borderTopWidth: 1, borderTopColor: '#e84c22' }}>
                <Text style={[styles.texto]}>Recorrido:</Text>
                <Text style={[styles.texto3, { marginBottom: 20 }]}>{item.origen} - {item.destino} </Text>
            </View>
            <View style={{ borderTopWidth: 1, borderTopColor: '#e84c22' }}>
                <Text style={[styles.texto]}>Horario:</Text>
                <Text style={[styles.texto3, { marginBottom: 20 }]}>{moment(item.horaInicio).format('HH:mm')} - {moment(item.horaTermino).format('HH:mm')} </Text>
            </View>
            <View style={{ borderTopWidth: 1, borderTopColor: '#e84c22' }}>
                <Text style={[styles.texto]}>Conductor:</Text>
                <Text style={[styles.texto3, { marginBottom: 20 }]}>{item.conductor}</Text>
            </View>
            <View style={{ borderTopWidth: 1, borderTopColor: '#e84c22' }}>
                <Text style={[styles.texto]}>Patente:</Text>
                <Text style={[styles.texto3, { marginBottom: 20 }]}>{item.patente}</Text>
            </View>
            <View style={[{ alignItems: 'center', borderTopWidth: 1, borderTopColor: '#e84c22' }]}>
                <Text style={[styles.texto]}>Agregar a favoritos</Text>
                {fav ?
                    (<TouchableOpacity style={[styles.bordes, { width: 70, height: 70, justifyContent: 'center', alignItems: 'center', marginTop: 14 }]}
                        onPress={() => {
                            setFav(false)
                            removeFav(item, agregarHo, user, empresas, navigation)
                        }}>
                        <Icon name="heart" size={40} color='#e84c22' />
                    </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={[styles.bordes, { width: 70, height: 70, justifyContent: 'center', alignItems: 'center', marginTop: 14 }]}
                            onPress={() => {
                                setFav(true)
                                agregarFav(item, agregarHo, user, empresas, navigation)
                            }}>
                            <Icon name="heart-o" size={40} color='#e84c22' />
                        </TouchableOpacity>
                    )}
            </View>
        </View>
    )
}

const agregarFav = async (item, agregarHo, user, empresas, navigation) => {
    let res = await fetch(back + 'addFavorito', {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json',
        },
        body: JSON.stringify({
            rut: user.rut,
            origen: item.origen,
            destino: item.destino,
            empresa: item.empresa,
            nombreEmpresa: item.nombre,
            recorrido: item.recorrido,
            id: item.id
        }),
    })
    res = await res.json()
    if (res.ok) {
        let recorrido = {
            id: item.recorrido
        }
        let horario = {
            id: item.id
        }
        //agregarHo({ horario, recorrido })
        Alert.alert(
            "El horario ha sido guardado!",
            'Ahora recibirás las noticias de este horario',
            [
                {
                    text: "OK", onPress: () => navigation.navigate('InfoRecorrido', {
                        item
                    })
                }
            ],
            { cancelable: false }
        );

    } else {
        Alert.alert(
            "Oh no! algo anda mal",
            'No se ha podido guardar como favorito, intente nuevamente',
            [
                { text: "Volver a intentar" }
            ],
            { cancelable: false }
        );
    }
}

const removeFav = async (item, agregarHo, user, empresas, navigation) => {
    let res = await fetch(back + 'removeFavorito', {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json',
        },
        body: JSON.stringify({
            rut: user.rut,
            origen: item.origen,
            destino: item.destino,
            empresa: item.empresa,
            nombreEmpresa: item.nombre,
            recorrido: item.recorrido,
            id: item.id
        }),
    })
    res = await res.json()
    if (res.ok) {
        Alert.alert(
            "El horario ha sido quitado de tus favoritos!",
            'Ya no recibirás las noticias de este horario',
            [
                {
                    text: "OK", onPress: () => navigation.navigate('InfoRecorrido', {
                        item,
                        fav: false
                    })
                }
            ],
            { cancelable: false }
        );

    } else {
        Alert.alert(
            "Oh no! algo anda mal",
            'No se ha podido quitar de favoritos, intente nuevamente',
            [
                { text: "Volver a intentar" }
            ],
            { cancelable: false }
        );
    }
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
        marginHorizontal: 20,
        borderRadius: 50,
        height: 120,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 15,
    },
    button2: {
        backgroundColor: 'rgba(232,76,34,0.3)',
        width: '100%',
        alignItems: 'center',
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        height: 45,
        paddingTop: 4,
        marginBottom: 10,
    },
    contenedor: {
        backgroundColor: 'white',
        alignItems: 'center',
    },
    texto: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#e84c22',
        marginVertical: 10
    },
    icon: {
        width: 50,
        color: '#e84c22'
    },
    texto2: {
        color: '#e84c22',
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    texto3: {
        color: 'black',
        textAlign: 'center',
        fontSize: 20,
    },
    // ff3d00
    bordes: {
        borderWidth: 2,
        borderColor: '#ff4b00',
        borderRadius: 50,
    },
});

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = dispatch => ({
    agregarHo: (horario, recorrido) => dispatch(agregarHo(horario, recorrido)),
    eliminarHorario: (horario, recorrido) => dispatch(eliminarHorario(horario, recorrido))
})

export default connect(mapStateToProps, mapDispatchToProps)(infoRecorrido)
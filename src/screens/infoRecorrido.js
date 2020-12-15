import React, { useState } from "react";
import { render } from "react-dom";
import { connect } from 'react-redux'
import { StyleSheet, Text, TextInput, View, TouchableOpacity, TouchableHighlight, Alert, ImageBackground, StatusBar, ScrollView, Image, Animated, Modal } from "react-native";
import { logout } from '../store/actions/user'
import { back } from '../../env'
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome'
import { FlatList } from "react-native-gesture-handler";
import { agregarFav, eliminarHorario, horariosLoad } from '../store/actions/horarios'
import { createIconSetFromFontello } from "react-native-vector-icons";

function infoRecorrido({ navigation, route, agregarFav, user, empresas, horarios, horariosLoad }) {
    const { item, favo } = route.params
    const [fav, setFav] = useState(favo)
    const [loading, setLoading] = useState(false)

    const [animation, setAnimation] = useState(new Animated.Value(0))
    const startAnimation = () => {
        Animated.timing(animation, {
            toValue: -1540,
            duration: 3000,
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
        <ScrollView style={!loading ? ([styles.container, { padding: 20 }]) : ([styles.container, { padding: 20 }, { opacity: 0.25 }])}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={loading}
            >
                <Animated.View style={[styles.containerLoading, { backgroundColor: null }, animatedStyles]} >
                    <Image
                        style={styles.tinyLogo}
                        source={require('../../assets/logo.png')}
                    ></Image>
                </Animated.View>
            </Modal>
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
            <View style={[{ borderTopWidth: 1, borderTopColor: '#e84c22', marginBottom: 10 }]}>
                <Text style={[styles.texto]}>Precios:</Text>
                <View style={{ width: '100%', borderColor: '#e84c22', borderWidth: 1, borderRadius: 20, height: 180, marginTop: 10, alignItems: 'center' }}>
                    <FlatList
                        data={item.precios}
                        renderItem={({ item }) =>
                            <View>
                                <Text style={styles.texto1}>{item.nombre}: ${item.precio}</Text>
                            </View>
                        }
                        keyExtractor={(item) => item.id}
                        style={{ width: '90%', padding: 15 }}
                    />
                </View>
            </View>
            <View style={[{ alignItems: 'center', borderTopWidth: 1, borderTopColor: '#e84c22' }]}>
                <Text style={[styles.texto]}>Agregar a favoritos</Text>
                {fav ?
                    (<TouchableOpacity style={[styles.bordes, { width: 70, height: 70, justifyContent: 'center', alignItems: 'center', marginTop: 14 }]}
                        onPress={() => {
                            if (!loading) {
                                startAnimation()
                                setLoading(true)
                                setFav(false)
                                removeFav(item, user, empresas, navigation, horarios, horariosLoad, setLoading)
                            }
                        }}>
                        <Icon name="heart" size={40} color='#e84c22' />
                    </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={[styles.bordes, { width: 70, height: 70, justifyContent: 'center', alignItems: 'center', marginTop: 14 }]}
                            onPress={() => {
                                if (!loading) {
                                    startAnimation()
                                    setLoading(true)
                                    setFav(true)
                                    agregarFavo(item, agregarFav, user, empresas, navigation, horarios, horariosLoad, setLoading)
                                }
                            }}>
                            <Icon name="heart-o" size={40} color='#e84c22' />
                        </TouchableOpacity>
                    )}
            </View>
            <View >
                <Text> </Text>
            </View>
            <View >
                <Text> </Text>
            </View>
        </ScrollView>
    )
}

const agregarFavo = async (item, agregarFav, user, empresas, navigation, horarios, horariosLoad, setLoading) => {
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
        let horar = horarios.data
        let flag = false
        horar = horar.map(x => {
            if (x.origen == item.origen && x.destino == item.destino) {
                flag = true
                let flag2 = false
                x.Horarios.map(y => {
                    if (y.id == item.id) {
                        flag2 = true
                        y = { ...y, ...item }
                    }
                    return y
                })
                if (!flag2) {
                    x.Horarios.push(item)
                }
            }
            return x
        })
        if (!flag) {
            horar.push({
                Horarios: [item],
                destino: item.destino,
                origen: item.origen,
                id: item.id
            })

        }
        horariosLoad(horar)
        setLoading(false)
        Alert.alert(
            "El horario ha sido guardado!",
            'Ahora recibirás las noticias de este horario',
            [
                {
                    text: "OK", onPress: () => {

                        navigation.navigate('InfoRecorrido', {
                            item
                        })
                    }
                }
            ],
            { cancelable: false }
        );

    } else {
        setLoading(false)
        Alert.alert(
            "Este horario ya es parte de tus favoritos!",
            'ya recibes sus noticias!',
            [
                { text: "Genial!" }
            ],
            { cancelable: false }
        );
    }
}

const removeFav = async (item, user, empresas, navigation, horarios, horariosLoad, setLoading) => {
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
        let horar = horarios.data
        let flag = false
        horar = horar.map(x => {
            if (x.origen == item.origen && x.destino == item.destino) {
                flag = true
                x.Horarios = x.Horarios.filter(y => y.id != item.id)
            }
            return x
        }).filter(x => x.Horarios.length > 0)
        horariosLoad(horar)
        setLoading(false)
        Alert.alert(
            "Has dejado de seguir este horario!",
            'Ahora no recibirás sus noticias',
            [
                {
                    text: "OK", onPress: () => {
                        navigation.navigate('InfoRecorrido', {
                            item
                        })
                    }
                }
            ],
            { cancelable: false }
        );

    } else {
        setLoading(false)
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
    }, containerLoading: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    tinyLogo: {
        width: 250,
        height: 245,
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
    agregarFav: (item) => dispatch(agregarFav(item)),
    eliminarHorario: (horario, recorrido) => dispatch(eliminarHorario(horario, recorrido)),
    horariosLoad: (favoritos) => dispatch(horariosLoad(favoritos)),
})

export default connect(mapStateToProps, mapDispatchToProps)(infoRecorrido)
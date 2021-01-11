import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity, TouchableHighlight, Alert, ImageBackground, StatusBar, ScrollView, Image, Animated, Modal, FlatList } from "react-native";
import { Badge } from 'react-native-paper'
import { connect } from 'react-redux'
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome'



const Item = ({ item, onPress, style }) => {
    let horaInicio = new Date(item.horaInicio)
    let horaTermino = new Date(item.horaTermino)
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            <View style={[styles.bordes, { flex: 1, flexDirection: 'row', height: 120, alignItems: 'center' }]}>
                <View style={{ flex: 2.5 }}>
                    <TouchableOpacity style={[styles.bordes2, { width: 70, height: 70, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }]}>
                        <Icon name="heart" size={40} color='#e84c22' />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 5 }}>
                    <Text style={styles.texto2}>{moment(horaInicio).format('HH:mm')} - {moment(horaTermino).format('HH:mm')}</Text>
                    <Text style={styles.texto}>{item.nombre}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

function FavXRecorridos({ navigation, empresas, route }) {
    const [selectedId, setSelectedId] = useState(null)
    const { recorrido } = route.params
    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#d5d5d5" : "#f1f1f1";
        return (
            <Item
                item={item}
                onPress={() => {
                    setSelectedId(item.id)
                    navigation.navigate('InfoRecorrido', {
                        item,
                        favo: true,
                    })
                }}
                style={{ backgroundColor }}
            />
        )
    }

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
        <View style={!loading ? ([styles.container, { padding: 20 }]) : ([styles.container, { padding: 20 }, { opacity: 0.25 }])}>
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
            <View>
                <Text style={[styles.texto4, { textAlign: 'center', marginTop: 20 }]}>{recorrido.origen} - {recorrido.destino}</Text>
            </View>
            {
                Object.values(recorrido.Horarios).length > 0 ? (
                    <FlatList
                        data={Object.values(recorrido.Horarios).map(x => {
                            let a = new Date(x.horaInicio)
                            let b = new Date()
                            b.setHours(a.getHours(), a.getMinutes(), 0)
                            x.horaInicio = b.toString()
                            return x
                        }).sort((a, b) => {
                            if (new Date(a.horaInicio).getTime() > new Date(b.horaInicio).getTime()) {
                                return 1
                            }
                            if (new Date(a.horaInicio).getTime() < new Date(b.horaInicio).getTime()) {
                                return -1
                            }
                            return 0
                        })}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        extraData={selectedId}
                    />
                ) : (
                        <Text style={[styles.texto4, { color: 'black', marginTop: '70%' }]}>No sigues ningun horario</Text>
                    )
            }
        </View>
    )
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
    container: {
        flex: 1,
        // marginTop: Constants.statusBarHeight,
    },
    button: {
        // flex:1,
        flexDirection: 'row',
        paddingHorizontal: 40,
        height: 120,
        alignItems: 'center'
    },
    texto: {
        fontSize: 20,
        color: '#474747'
    },
    texto2: {
        color: '#1F1F1F',
        fontSize: 25,
        fontWeight: 'bold'
    },
    texto4: {
        color: '#e84c22',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    bordes: {
        borderBottomWidth: 1.5,
        borderColor: 'black'
    },
    bordes2: {
        borderWidth: 2,
        borderColor: '#ff4b00',
        borderRadius: 50,
    },
    texto3: {
        // marginTop: -10,
        // backgroundColor: 'green',
        // flex: 1,
        fontSize: 40,
        fontWeight: 'bold',
        zIndex: 1,
    },
    foto: {
        backgroundColor: '#e84c22',
        borderRadius: 50,
        height: 70,
        maxHeight: 70,
        width: 70,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
    }
});


const mapStateToProps = state => {

    return state
}

export default connect(mapStateToProps)(FavXRecorridos)
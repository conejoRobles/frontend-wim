import React, { useState } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, TextInput, Alert } from 'react-native'
import { Picker } from '@react-native-community/picker'
import { agregar } from '../store/actions/noticias'
import { back } from '../../env'
import uuid from 'uuid/v4'


function agregarNoticia({ navigation, agregar, user, route, }) {
    const { recorrido, noticias, horario } = route.params
    const [noticia, setNoticia] = useState({
        id: uuid(),
        descripcion: '',
        titulo: '',
        fechaTermino: '',
        duracion: {
            cantidad: '1',
            unidad: '1'
        },
        fechaPublicacion: '',
    })
    return (
        <View style={[styles.container]}>
            <StatusBar backgroundColor="#e84c22"></StatusBar>
            <Text style={[styles.texto, { marginTop: 20 }]}>Titulo:</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    value={noticia.titulo}
                    onChangeText={text => setNoticia({ ...noticia, titulo: text })}
                />
            </View>
            <Text style={styles.texto}>Descripción:</Text>
            <View style={[styles.inputView, { height: 300 }]}>
                <TextInput
                    multiline
                    numberOfLines={13}
                    maxLength={330}
                    style={styles.inputText}
                    value={noticia.descripcion}
                    onChangeText={text => setNoticia({ ...noticia, descripcion: text })}
                />
            </View>
            <Text style={styles.texto}>Duración:</Text>
            <View style={{ flex: 1, flexDirection: 'row', maxHeight: 50, marginHorizontal: 30 }}>
                <View style={[styles.inputView, { flex: 1, marginHorizontal: 10 }]}>
                    <Picker style={{ width: '100%', color: 'black' }}
                        itemStyle={{ borderRadius: 4, borderColor: 'blue' }}
                        selectedValue={noticia.duracion.cantidad}
                        onValueChange={(itemValue) => setNoticia(() => {
                            let duracion = noticia.duracion
                            duracion = { ...duracion, cantidad: itemValue }
                            return ({ ...noticia, duracion })
                        })}
                    >
                        <Picker.Item label='1' value="1" />
                        <Picker.Item label='2' value="2" />
                        <Picker.Item label='3' value="3" />
                        <Picker.Item label='4' value="4" />
                        <Picker.Item label='5' value="5" />
                        <Picker.Item label='6' value="6" />
                        <Picker.Item label='7' value="7" />
                        <Picker.Item label='8' value="8" />
                        <Picker.Item label='9' value="9" />
                        <Picker.Item label='10' value="10" />
                        <Picker.Item label='11' value="11" />
                        <Picker.Item label='12' value="12" />
                        <Picker.Item label='13' value="13" />
                        <Picker.Item label='14' value="14" />
                        <Picker.Item label='15' value="15" />
                        <Picker.Item label='16' value="16" />
                        <Picker.Item label='17' value="17" />
                        <Picker.Item label='18' value="18" />
                        <Picker.Item label='19' value="19" />
                        <Picker.Item label='20' value="20" />
                        <Picker.Item label='21' value="21" />
                        <Picker.Item label='22' value="22" />
                        <Picker.Item label='23' value="23" />
                    </Picker>
                </View>
                <View style={[styles.inputView, { flex: 1, marginHorizontal: 10 }]}>
                    <Picker style={{ width: '100%', color: 'black' }}
                        itemStyle={{ borderRadius: 4, borderColor: 'blue' }}
                        selectedValue={noticia.duracion.unidad}
                        onValueChange={(itemValue) => setNoticia(() => {
                            let duracion = noticia.duracion
                            duracion = { ...duracion, unidad: itemValue }
                            return ({ ...noticia, duracion })
                        })}
                    >
                        <Picker.Item label='Hora' value="1" />
                        <Picker.Item label='Dia' value="2" />
                        <Picker.Item label='Semana' value="3" />
                        <Picker.Item label='Mes' value="4" />
                    </Picker>
                </View>

            </View>

            <TouchableOpacity style={[styles.button]} onPress={() => { publicar(noticia, agregar, navigation, user, recorrido, noticias, horario) }}>
                <Text style={[styles.texto, { color: 'white', marginBottom: 0 }]}>Publicar</Text>
            </TouchableOpacity>

        </View>
    );
}


const publicar = async (noticia, agregar, navigation, user, recorrido, noticias, horario) => {
    let hoy = new Date()
    let termino = new Date()

    if (noticia.duracion.unidad == "2") {
        termino.setDate(hoy.getDate() + parseInt(noticia.duracion.cantidad))
    } else if (noticia.duracion.unidad == "3") {
        termino.setDate(hoy.getDate() + parseInt(noticia.duracion.cantidad) * 7)
    } else if (noticia.duracion.unidad == "4") {
        termino.setMonth(hoy.getMonth() + parseInt(noticia.duracion.cantidad))
    } else if (noticia.duracion.unidad == "1") {
        let addTime = parseInt(noticia.duracion.cantidad) * 3600;
        termino.setSeconds(addTime)
    }

    let res = await fetch(back + 'addNoticia', {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json',
        },
        body: JSON.stringify({
            rut: user.rut,
            recorrido,
            horario: horario.id,
            id: noticia.id,
            descripcion: noticia.descripcion,
            titulo: noticia.titulo,
            fechaTermino: termino.toString(),
            duracion: noticia.duracion,
            fechaPublicacion: hoy.toString(),
        }),
    })
    noticia = { ...noticia, fechaTermino: termino.toString(), fechaPublicacion: hoy.toString() }
    res = await res.json()
    if (res.ok) {
        await agregar(noticia, recorrido)
        noticias.unshift(noticia)
        Alert.alert(
            "Genial!",
            'Se ha agregado su noticia!',
            [
                {
                    text: "OK", onPress: () => navigation.navigate('NoticiasxRecorridoEmpresa', {
                        recorrido,
                        noticia
                    })
                }
            ],
            { cancelable: false }
        );
    } else {
        Alert.alert(
            "Oh no! algo anda mal",
            'No se ha podido agregar su noticia',
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
        alignItems: 'center',
    },
    button: {
        width: "65%",
        backgroundColor: "#e84c22",
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
        marginBottom: 10,
        alignContent: 'center'
    },
    contenedor: {
        backgroundColor: 'white',
        alignItems: 'center',
    },
    texto: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10
    },
    bordes: {
        borderWidth: 1,
        borderBottomWidth: 5,
        borderTopWidth: 0,
        borderColor: '#ff4b00'
    },
    inputView: {
        width: "80%",
        backgroundColor: "#f6f6f6",
        borderRadius: 25,
        borderWidth: 1,
        borderBottomWidth: 3,
        height: 50,
        marginBottom: 20,
    },
    inputText: {
        fontSize: 20,
        color: "black",
        marginHorizontal: 10,
        marginVertical: 10,
        textAlignVertical: 'top'
    },
});

const mapStateToProps = state => {
    return state
}
const mapDispatchToProps = dispatch => ({
    agregar: (item, recorrido) => dispatch(agregar(item, recorrido)),
})
export default connect(mapStateToProps, mapDispatchToProps)(agregarNoticia)

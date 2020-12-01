import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, TextInput, Alert } from 'react-native'
import { connect } from 'react-redux'
import { Picker } from '@react-native-community/picker'
import { eliminarNoticia, editar, noticiasLoad } from '../store/actions/noticias'
import { back } from '../../env'


function editarNoticia({ navigation, editar, route, eliminarNoticia, user }) {
    const { item, recorrido, noticias, horario } = route.params
    const [noticia, setNoticia] = useState({ ...item })
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
                        <Picker.Item label="Seleccione" value="" />
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
                        <Picker.Item label="Seleccione" value="" />
                        <Picker.Item label='Hora' value="1" />
                        <Picker.Item label='Dia' value="2" />
                        <Picker.Item label='Semana' value="3" />
                        <Picker.Item label='Mes' value="4" />
                    </Picker>
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 20 }}>
                <TouchableOpacity style={[styles.button, { flex: 1, backgroundColor: '#04254E', marginHorizontal: 10 }]} onPress={() => { eliminar(item, eliminarNoticia, navigation, user, recorrido, noticias, horario) }}>
                    <Text style={[styles.texto, { color: 'white', marginBottom: 0 }]}>Eliminar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { flex: 1, marginHorizontal: 10 }]} onPress={() => { publicar(noticia, editar, user, recorrido, navigation, noticias, horario) }}>
                    <Text style={[styles.texto, { color: 'white', marginBottom: 0 }]}>Publicar</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}


const publicar = async (noticia, editar, user, recorrido, navigation, noticias, horario) => {
    let hoy = new Date(noticia.fechaPublicacion)
    let termino = new Date()
    if (noticia.duracion.unidad == "2") {
        hoy.setDate(hoy.getDate() + parseInt(noticia.duracion.cantidad))
        termino = hoy
    } else if (noticia.duracion.unidad == "3") {
        hoy.setDate(hoy.getDate() + parseInt(noticia.duracion.cantidad) * 7)
        termino = hoy
    } else if (noticia.duracion.unidad == "4") {
        hoy.setMonth(hoy.getMonth() + parseInt(noticia.duracion.cantidad))
        termino = hoy
    } else if (noticia.duracion.unidad == "1") {
        let addTime = parseInt(noticia.duracion.cantidad) * 3600;
        hoy.setSeconds(addTime)
        termino = hoy
    }
    let res = await fetch(back + 'editNoticia', {
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
            fechaPublicacion: noticia.fechaPublicacion,
        }),
    })
    res = await res.json()
    if (res.ok) {
        await editar(noticia, recorrido)
        noticias = noticias.map(x => {
            if (x.id == noticia.id) {
                x = noticia
            }
            return x
        })
        Alert.alert(
            "Genial!",
            'Se ha editado su noticia!',
            [
                {
                    text: "OK", onPress: () => navigation.navigate('NoticiasxRecorridoEmpresa', {
                        noticias,
                        horario,
                        recorrido
                    })
                }
            ],
            { cancelable: false }
        );
    } else {
        Alert.alert(
            "Oh no! algo anda mal",
            'No se ha podido editar su noticia',
            [
                { text: "Volver a intentar" }
            ],
            { cancelable: false }
        );
    }
}

const eliminar = async (item, eliminarNoticia, navigation, user, recorrido, noticias, horario) => {

    let res = await fetch(back + 'removeNoticia', {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json',
        },
        body: JSON.stringify({
            rut: user.rut,
            id: item.id,
            horario: horario.id,
            recorrido
        }),
    })
    res = await res.json()
    if (res.ok) {
        await eliminarNoticia(item, recorrido)
        noticias = noticias.filter(x => x.id != item.id)
        Alert.alert(
            "Genial!",
            'Se ha eliminado la noticia!',
            [
                {
                    text: "OK", onPress: () => navigation.navigate('NoticiasxRecorridoEmpresa', {
                        recorrido,
                        noticias,
                    })
                }
            ],
            { cancelable: false }
        );
    } else {
        Alert.alert(
            "Oh no! algo anda mal",
            'No se ha podido eliminar la noticia',
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
    eliminarNoticia: (item, recorrido) => dispatch(eliminarNoticia(item, recorrido)),
    editar: (item, recorrido) => dispatch(editar(item, recorrido)),
})
export default connect(mapStateToProps, mapDispatchToProps)(editarNoticia)

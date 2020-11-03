import React, { useState } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, TextInput, FlatList, Alert, Modal } from 'react-native'
import { agregarRec, editarRecorrido, eliminarRecorrido } from '../store/actions/recorridos'
import { back } from '../../env'
import uuid from 'uuid/v4'
import Bienvenida from './Bienvenida'

const DATA = [
    {
        id: "0",
        nombre: 'General',
        precio: '2000'
    },
    {
        id: "1",
        nombre: 'Estudiante',
        precio: '1500'
    },
    {
        id: "2",
        nombre: 'Adulto Mayor',
        precio: '1000'
    },
]

const Item = ({ item, onPress, style }) => (
    <View>
        <Text style={styles.texto1}>{item.nombre}: ${item.precio}</Text>
    </View>
)

const renderItem = ({ item }) => {
    const [selectedId, setSelectedId] = useState(null)
    return (
        <Item
            item={item}
        // onPress={() => setSelectedId(item.id)}

        />
    )
}


function AgregarRecorrido({ navigation, user, route, agregarRec, editarRecorrido, eliminarRecorrido }) {
    const { isNew, reco } = route.params
    const [editar, setEditar] = useState(isNew)
    const [modalVisible, setModalVisible] = useState(false);
    const [tarifa, setTarifa] = useState({
        id: uuid(),
        nombre: '',
        precio: ''
    })
    const [recorrido, setRecorrido] = isNew ? (useState({
        id: uuid(),
        origen: '',
        destino: '',
        precios: []
    })) : (
            useState({
                id: reco.id,
                origen: reco.origen,
                destino: reco.destino,
                precios: reco.precios ? reco.precios : []
            })
        )

    return (
        <View style={modalVisible ? ([styles.container, { opacity: 0.25 }]) : ([styles.container])}>
            <StatusBar backgroundColor="#e84c22"></StatusBar>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={[styles.modalText, { fontWeight: 'bold', fontSize: 25, color: '#e84c22', borderBottomWidth: 2, borderBottomColor: '#e84c22' }]}>Agregar Precio</Text>
                        <Text style={styles.modalText}>Tipo de pasaje</Text>
                        <View style={styles.inputView1}>
                            <TextInput style={styles.inputText2}
                                editable={editar}
                                placeholder='Ej: General, estudiante, etc.'
                                onChangeText={(text) => {
                                    setTarifa({ ...tarifa, nombre: text })
                                }}
                            />
                        </View>
                        <Text style={styles.modalText}>Precio</Text>
                        <View style={styles.inputView1}>
                            <TextInput style={styles.inputText2}
                                editable={editar}
                                placeholder='Ej: 800,1000,1200,etc.'
                                onChangeText={(text) => {
                                    setTarifa({ ...tarifa, precio: text })
                                }}
                            />
                        </View>
                        <TouchableOpacity
                            style={{ ...styles.openButton, backgroundColor: "#e84c22", }}
                            onPress={() => {
                                if (editar) {
                                    let precioos = [...recorrido.precios]
                                    precioos.push(tarifa)
                                    setRecorrido({ ...recorrido, precios: precioos })
                                    setTarifa({
                                        id: uuid(),
                                        nombre: '',
                                        precio: ''
                                    })
                                    setModalVisible(!modalVisible);
                                }
                            }}
                        >
                            <Text style={styles.textStyle}>Agregar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style={{ flex: 1, maxHeight: 100, flexDirection: "row", justifyContent: 'center', }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={styles.texto}>Origen:</Text>
                    <View style={styles.inputView}>
                        <TextInput
                            editable={
                                (editar)
                            }
                            value={recorrido.origen}
                            style={styles.inputText}
                            onChangeText={text => setRecorrido({ ...recorrido, origen: text })}
                        />
                    </View>
                </View>

                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={styles.texto}>Destino:</Text>
                    <View style={styles.inputView}>
                        <TextInput
                            editable={
                                (editar)
                            }
                            value={recorrido.destino}
                            style={styles.inputText}
                            onChangeText={text => setRecorrido({ ...recorrido, destino: text })}
                        />
                    </View>
                </View>
            </View>

            <View style={[styles.bordes, { width: '80%', alignItems: 'center', borderWidth: 0, marginTop: 30 }]}>
                <Text style={[styles.texto2, { color: '#e84c22' }]}>Valor del Pasaje</Text>
            </View>

            <View style={{ alignContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                    style={[styles.button2]}
                    onPress={() => {
                        if (editar) {
                            setModalVisible(true)
                        }
                    }}
                >
                    <Text style={styles.texto4}>Agregar Precio</Text>
                </TouchableOpacity>
            </View>

            <View style={{ width: '90%', borderColor: '#e84c22', borderWidth: 1, borderRadius: 20, height: 380, alignItems: 'center' }}>
                <FlatList
                    data={recorrido.precios}
                    renderItem={({ item }) =>
                        <View>
                            <Text style={styles.texto1}>{item.nombre}: ${item.precio}</Text>
                        </View>
                    }
                    keyExtractor={(item) => item.id}
                    style={{ width: '90%', padding: 15 }}
                />
            </View>
            {!isNew ? (
                <View style={{ flexDirection: "row" }}>
                    {!editar ? (<TouchableOpacity style={[styles.button, { backgroundColor: "#04254E", width: '40%', marginRight: 20 }]}
                        onPress={() => {
                            setEditar(true)
                        }}
                    >
                        <Text style={[styles.texto, { color: 'white' }]}>Editar</Text>
                    </TouchableOpacity>) :
                        (
                            <TouchableOpacity style={[styles.button, { backgroundColor: "#04254E", width: '40%', marginRight: 20 }]}
                                onPress={() => {
                                    eliminar(navigation, user, recorrido, eliminarRecorrido)
                                    setEditar(false)
                                }}
                            >
                                <Text style={[styles.texto, { color: 'white' }]}>Eliminar</Text>
                            </TouchableOpacity>
                        )}

                    {!editar ? (<TouchableOpacity style={[styles.button, { width: '40%' }]}
                        onPress={() => {
                            navigation.navigate('Horarios', {

                                reco
                            })
                        }}
                    >
                        <Text style={[styles.texto, { color: 'white' }]}>Horarios</Text>
                    </TouchableOpacity>)
                        : (
                            <TouchableOpacity style={[styles.button, { width: '40%' }]}
                                onPress={() => {
                                    editarRec(navigation, user, recorrido, editarRecorrido)
                                }}
                            >
                                <Text style={[styles.texto, { color: 'white' }]}>Guardar</Text>
                            </TouchableOpacity>
                        )}
                </View>
            ) : (
                    <TouchableOpacity style={[styles.button]}
                        onPress={() => { publicar(navigation, user, recorrido, agregarRec) }}
                    >
                        <Text style={[styles.texto, { color: 'white' }]}>Publicar</Text>
                    </TouchableOpacity>
                )}


        </View>
    );
}


const eliminar = async (navigation, user, recorrido, eliminarRecorrido) => {
    let res = await fetch(back + 'removeRecorrido', {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json',
        },
        body: JSON.stringify({
            rut: user.rut,
            id: recorrido.id,
        }),
    })
    res = await res.json()
    if (res.ok) {
        await eliminarRecorrido(recorrido)
        Alert.alert(
            "Genial!",
            'Se ha eliminado el recorrido!',
            [
                {
                    text: "OK", onPress: () => { navigation.navigate('Bienvenida') }
                }
            ],
            { cancelable: true }
        );
    } else {
        Alert.alert(
            "Oh no! algo anda mal",
            'No se ha podido eliminar su recorrido',
            [
                { text: "Volver a intentar" }
            ],
            { cancelable: false }
        );
    }
}

const editarRec = async (navigation, user, recorrido, editarRecorrido) => {
    let res = await fetch(back + 'editRecorrido', {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json',
        },
        body: JSON.stringify({
            rut: user.rut,
            id: recorrido.id,
            origen: recorrido.origen,
            destino: recorrido.destino,
            precios: recorrido.precios,
        }),
    })
    res = await res.json()
    if (res.ok) {
        await editarRecorrido(recorrido)
        Alert.alert(
            "Genial!",
            'Se han actualizado los datos del recorrido!',
            [
                {
                    text: "OK", onPress: () => { navigation.navigate('Bienvenida') }
                }
            ],
            { cancelable: true }
        );
    } else {
        Alert.alert(
            "Oh no! algo anda mal",
            'No se ha podido editar su recorrido',
            [
                { text: "Volver a intentar" }
            ],
            { cancelable: false }
        );
    }
}

const publicar = async (navigation, user, recorrido, agregarRec) => {
    let res = await fetch(back + 'addRecorrido', {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json',
        },
        body: JSON.stringify({
            rut: user.rut,
            id: recorrido.id,
            origen: recorrido.origen,
            destino: recorrido.destino,
            precios: recorrido.precios,
        }),
    })
    res = await res.json()
    if (res.ok) {
        await agregarRec(recorrido)
        Alert.alert(
            "Genial!",
            'Se ha agregado su recorrido!',
            [
                {
                    text: "OK", onPress: () => navigation.navigate('Bienvenida')
                }
            ],
            { cancelable: false }
        );
    } else {
        Alert.alert(
            "Oh no! algo anda mal",
            'No se ha podido agregar su recorrido',
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
        width: '80%',
        borderRadius: 30,
        height: 50,
        backgroundColor: '#e84c22',
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
    },
    button2: {
        backgroundColor: 'rgba(232,76,34,0.3)',
        alignItems: 'center',
        minWidth: '65%',
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        height: 35,
        paddingTop: 2,
        marginBottom: 20,
    },
    contenedor: {
        backgroundColor: 'white',
        alignItems: 'center',
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 30,
        padding: 10,
        marginTop: 10,
        elevation: 2,
        minWidth: 150,
    },
    texto: {
        marginTop: 10,
        color: '#e84c22',
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 5
    },
    texto1: {
        fontSize: 25,
        color: 'black'
    },
    bordes: {
        borderWidth: 1,
        borderBottomWidth: 5,
        borderTopWidth: 0,
        borderColor: '#e84c22'
    },
    inputView: {
        width: "80%",
        borderRadius: 25,
        borderWidth: 1,
        borderBottomWidth: 3,
        height: 50,
        marginBottom: 10,
        borderColor: '#e84c22'
    },
    inputText: {
        fontSize: 20,
        color: "black",
        marginHorizontal: 10,
        marginVertical: 10,
        textAlignVertical: 'top'
    },
    texto4: {
        color: '#e84c22',
        textAlign: 'center',
        fontSize: 22,
    },
    texto2: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white'
    }, centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        padding: 10,
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 10,
            height: 20
        },
        shadowOpacity: 1,
        minHeight: 400,
        justifyContent: 'center',
        paddingHorizontal: 30,
        shadowRadius: 3.84,
        elevation: 30
    },
    textStyle: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        textAlign: "center",
        fontSize: 20,
        marginBottom: 10
    },
    inputText2: {
        fontSize: 18,
        minWidth: 230,
        marginHorizontal: 10,
        marginVertical: 10,
    },
    inputView1: {
        maxHeight: 60,
        minWidth: 230,
        borderWidth: 2,
        borderRadius: 25,
        paddingHorizontal: 10,
        justifyContent: 'center',
        marginBottom: 20,
        borderColor: '#e84c22'
    },
});

const mapStateToProps = state => {
    return state
}
const mapDispatchToProps = dispatch => ({
    agregarRec: (recorrido) => dispatch(agregarRec(recorrido)),
    editarRecorrido: (recorrido) => dispatch(editarRecorrido(recorrido)),
    eliminarRecorrido: (recorrido) => dispatch(eliminarRecorrido(recorrido)),
})
export default connect(mapStateToProps, mapDispatchToProps)(AgregarRecorrido)

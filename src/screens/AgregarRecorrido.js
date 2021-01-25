import React, { useState } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, TextInput, FlatList, Alert, Modal, Image, Animated } from 'react-native'
import { agregarRec, editarRecorrido, eliminarRecorrido } from '../store/actions/recorridos'
import { back } from '../../env'
import uuid from 'uuid/v4'
import Bienvenida from './Bienvenida'

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
        />
    )
}


function AgregarRecorrido({ navigation, user, route, agregarRec, editarRecorrido, eliminarRecorrido }) {
    const { isNew, reco } = route.params
    const [editar, setEditar] = useState(isNew)
    const [indice, setIndice] = useState(0)
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
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
                Oldorigen: reco.origen,
                Olddestino: reco.destino,
                origen: reco.origen,
                destino: reco.destino,
                precios: reco.precios ? reco.precios : []
            })
        )
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
    const renderItem = ({ item, index }) => {
        const backgroundColor = "#e84c22";
        return (
            <Item
                item={item}
                onPress={() => {
                    setIndice(index)
                    setTarifa({ ...tarifa, precio: item.precio, nombre: item.nombre, id: item.id })
                    setModalVisible(true)
                }}
                style={{ backgroundColor }}
            />
        )
    }
    const Item = ({ item, onPress, style }) => {
        return (
            <TouchableOpacity onPress={onPress} style={[styles.buttonE, styles.bordes]}>
                <Text style={[styles.texto1]}>{item.nombre}: ${item.precio}</Text>
            </TouchableOpacity>
        )
    }
    const del = () => {
        setLoading(true)
        eliminar(navigation, user, recorrido, eliminarRecorrido, setLoading, startAnimation)
        setEditar(false)
    }

    return (
        <View style={modalVisible || modalVisible2 || loading ? ([styles.container, { opacity: 0.25 }]) : ([styles.container])}>
            <StatusBar backgroundColor="#e84c22"></StatusBar>
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
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={[styles.modalView]}>
                        <Text style={[styles.modalText, { fontWeight: 'bold', fontSize: 25, color: '#e84c22', borderBottomWidth: 2, borderBottomColor: '#e84c22' }]}>{modalVisible2 ? ('Editar Precio') : ('Agregar Precio')}</Text>
                        <Text style={styles.modalText}>Tipo de pasaje</Text>
                        <View style={styles.inputView1}>
                            <TextInput style={styles.inputText2}
                                editable={editar}
                                value={tarifa.nombre}
                                autoCapitalize={"words"}
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
                                value={tarifa.precio}
                                placeholder='Ej: 800,1.000,1.200,etc.'
                                onChangeText={(text) => {
                                    setTarifa({ ...tarifa, precio: text })
                                }}
                            />
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity
                                style={{ ...styles.openButton, backgroundColor: "#e84c22", marginRight: 10 }}
                                onPress={() => {
                                    if (editar) {
                                        setModalVisible(false);
                                    }
                                }}
                            >
                                <Text style={styles.textStyle}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ ...styles.openButton, backgroundColor: "#e84c22", marginRight: 10 }}
                                onPress={() => {
                                    if (editar) {
                                        if (modalVisible2) {
                                            let precioos = [...recorrido.precios]
                                            precioos[indice] = tarifa
                                            setTarifa({
                                                id: uuid(),
                                                nombre: '',
                                                precio: ''
                                            })
                                            setRecorrido({ ...recorrido, precios: precioos })
                                            setModalVisible2(false);
                                            setModalVisible(false);
                                        } else {
                                            let precioos = [...recorrido.precios]
                                            precioos.push(tarifa)
                                            setRecorrido({ ...recorrido, precios: precioos })
                                            setTarifa({
                                                id: uuid(),
                                                nombre: '',
                                                precio: ''
                                            })
                                            setModalVisible(false);
                                        }
                                    }
                                }}
                            >
                                <Text style={styles.textStyle}>{modalVisible2 ? ('Guardar') : ('Agregar')}</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible2}
            >
                <View style={styles.centeredView}>
                    <View style={modalVisible ? ([styles.modalView2, { opacity: 0.25 }]) : (styles.modalView2)}>
                        <Text style={[styles.modalText, { fontWeight: 'bold', fontSize: 25, color: '#e84c22', borderBottomWidth: 2, borderBottomColor: '#e84c22' }]}>Editar Precios</Text>
                        <FlatList
                            data={recorrido.precios}
                            keyExtractor={(item) => item.id}
                            style={{ width: '100%', padding: 15 }}
                            renderItem={renderItem}
                        />
                        <View style={[{ flexDirection: "row", justifyContent: 'center', marginBottom: 0 }]}>
                            <TouchableOpacity
                                style={{ ...styles.openButton, backgroundColor: "#e84c22", marginRight: 10 }}
                                onPress={() => {
                                    if (editar) {
                                        setTarifa({
                                            id: uuid(),
                                            nombre: '',
                                            precio: ''
                                        })
                                        setModalVisible2(false);
                                    }
                                }}
                            >
                                <Text style={styles.textStyle}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ ...styles.openButton, backgroundColor: "#e84c22", }}
                                onPress={() => {
                                    if (editar) {
                                        setTarifa({
                                            id: uuid(),
                                            nombre: '',
                                            precio: ''
                                        })
                                        setModalVisible2(false);
                                    }
                                }}
                            >
                                <Text style={styles.textStyle}>Guardar</Text>
                            </TouchableOpacity>

                        </View>
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
                            autoCapitalize={"words"}
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
                            autoCapitalize={"words"}
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

            {isNew ? (<View style={{ alignContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                    style={[styles.button2]}
                    onPress={() => {
                        if (editar) {
                            setModalVisible2(false)
                            setModalVisible(true)
                        }
                    }}
                >
                    <Text style={styles.texto4}>Agregar Precio</Text>
                </TouchableOpacity>
            </View>) : (
                    <View style={[styles.button20, { flexDirection: "row", justifyContent: 'center', marginBottom: 0 }]}>
                        <TouchableOpacity
                            onPress={() => {
                                if (editar) {
                                    setModalVisible2(false)
                                    setModalVisible(true)
                                }
                            }}
                        >
                            <Text style={[styles.texto4]}>Agregar Precio</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginHorizontal: 15, justifyContent: 'center', }}>
                            <Text>|</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                if (editar) {
                                    setModalVisible(false)
                                    setModalVisible2(false)
                                    setModalVisible2(true)
                                }
                            }}
                        >
                            <Text style={[styles.texto4]}>Editar Precios</Text>
                        </TouchableOpacity>
                    </View>
                )
            }

            <View style={{ width: '80%', flexDirection: "row", borderColor: '#e84c22', borderWidth: 1, borderRadius: 20, height: '50%', marginTop: 10, }}>
                <FlatList
                    data={recorrido.precios}
                    renderItem={({ item }) =>
                        <View style={[{ flexDirection: "row" }]}>
                            <Text style={styles.texto1}>{item.nombre}</Text>
                        </View>
                    }
                    keyExtractor={(item) => item.id}
                    style={{ width: '90%', padding: 15 }}
                />
                <FlatList
                    data={recorrido.precios}
                    renderItem={({ item }) =>
                        <View style={[{ flexDirection: "row" }]}>
                            <Text style={styles.texto1}>: $</Text>
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.texto1, { flex: 1, justifyContent: 'center', alignSelf: 'flex-end' }]}>{item.precio.replace('.', '').split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.').split('').reverse().join('').replace(/^[\.]/, '')}</Text>
                            </View>
                        </View>
                    }
                    keyExtractor={(item) => item.id}
                    style={{ width: '40%', paddingTop: 15, marginRight: '12%' }}
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
                                    if (!loading) {
                                        Alert.alert(
                                            "Espera!",
                                            'Se eliminará el recorrido, estás seguro?',
                                            [
                                                {
                                                    text: "No"
                                                },
                                                {
                                                    text: "Si", onPress: () => {
                                                        del()
                                                    }
                                                }
                                            ],
                                            { cancelable: true }
                                        )
                                    }
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
                                    if (!loading) {
                                        startAnimation()
                                        setLoading(true)
                                        editarRec(navigation, user, recorrido, editarRecorrido, setLoading)
                                    }
                                }}
                            >
                                <Text style={[styles.texto, { color: 'white' }]}>Guardar</Text>
                            </TouchableOpacity>
                        )}
                </View>
            ) : (
                    <TouchableOpacity style={[styles.button]}
                        onPress={() => {
                            if (!loading) {
                                startAnimation()
                                setLoading(true)
                                publicar(navigation, user, recorrido, agregarRec, setLoading)
                            }
                        }}
                    >
                        <Text style={[styles.texto, { color: 'white' }]}>Publicar</Text>
                    </TouchableOpacity>
                )}
        </View>
    );
}


const eliminar = async (navigation, user, recorrido, eliminarRecorrido, setLoading, startAnimation) => {
    startAnimation()
    setLoading(true)
    let res = await fetch(back + 'removeRecorrido', {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json',
        },
        body: JSON.stringify({
            rut: user.rut,
            origen: recorrido.origen,
            destino: recorrido.destino,
            id: recorrido.id,
        }),
    })
    res = await res.json()
    if (res.ok) {
        await eliminarRecorrido(recorrido)
        setLoading(false)
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
        setLoading(false)
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

const editarRec = async (navigation, user, recorrido, editarRecorrido, setLoading) => {
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
            nombre: user.nombre,
            Oldorigen: recorrido.Oldorigen,
            Olddestino: recorrido.Olddestino,
            precios: recorrido.precios,
        }),
    })
    res = await res.json()
    if (res.ok) {
        await editarRecorrido(recorrido)
        setLoading(false)
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
        setLoading(false)
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

const publicar = async (navigation, user, recorrido, agregarRec, setLoading) => {
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
            nombre: user.nombre,
            precios: recorrido.precios,
        }),
    })
    res = await res.json()
    if (res.ok) {
        await agregarRec(recorrido)
        setLoading(false)
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
        setLoading(false)
        Alert.alert(
            "Oh no! algo anda mal",
            'No se ha podido agregar su recorrido:\n' + res.mensaje,
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
    }, texto: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white'
    }, tinyLogo: {
        width: 250,
        height: 245,
    }, containerLoading: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button20: {
        backgroundColor: 'rgba(232,76,34,0.3)',
        width: '80%',
        alignItems: 'center',
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        height: 45,
        paddingTop: 0,
        marginBottom: 20,
    }, buttonE: {
        marginHorizontal: 20,
        borderRadius: 30,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 25,
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
        fontSize: 20,
        color: 'black'
    },
    bordes: {
        width: 250,
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
        fontSize: 17,
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
    }, modalView2: {
        padding: 30,
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
        maxHeight: 540,
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

import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, StatusBar, Alert, Modal, TextInput } from 'react-native'
import { Picker } from '@react-native-community/picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from 'react-redux'
import moment from 'moment';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { back } from '../../env'


const mode = 'time'

function buscarRecorrido({ user, empresas, navigation, route }) {
    const week = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']
    const [selectedId, setSelectedId] = useState(null)
    const [search, setSearch] = useState(false)
    const [dia, setDia] = useState((new Date().getDay() - 1) < 0 ? 6 : (new Date().getDay() - 1))
    const [date, setDate] = useState((new Date()));
    const [date2, setDate2] = useState((new Date()));
    const [modalVisible, setModalVisible] = useState(false)
    const [modalVisible2, setModalVisible2] = useState(false)
    const [show, setShow] = useState(false)
    const [show2, setShow2] = useState(false)
    const [recorridos, setRecorridos] = useState([])
    const [dataSearch, setdataSearch] = useState({
        origen: 'Origen',
        destino: 'Destino',
        dia,
        horaInicio: new Date(),
        horaTermino: new Date(),
    })
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date
        setShow(Platform.OS === 'ios')
        setDate(currentDate)
        setdataSearch({ ...dataSearch, horaInicio: currentDate })
    }

    const showTimepicker = () => {
        setShow(true)
    }


    const onChange2 = (event, selectedDate) => {
        const currentDate2 = selectedDate || date2
        setShow2(Platform.OS === 'ios')
        setDate2(currentDate2)
        setdataSearch({ ...dataSearch, horaTermino: currentDate2 })
    }

    const showTimepicker2 = () => {
        setShow2(true)
    }
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('InfoRecorrido', {
                    item,
                    favo: false
                })}
                style={[styles.button, styles.bordes]}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.texto]}>{moment(new Date(item.horaInicio)).format('HH:mm')} - {moment(new Date(item.horaTermino)).format('HH:mm')}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.texto]}>{item.nombre}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={modalVisible || modalVisible2 ? ([styles.container, { opacity: 0.25 }]) : ([styles.container])}>
            <StatusBar backgroundColor="#e84c22" />
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible2}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={[styles.modalText, { fontWeight: 'bold', fontSize: 25, color: '#e84c22', borderBottomWidth: 2, borderBottomColor: '#e84c22' }]}>Seleccionar Recorrido</Text>
                        <Text style={[styles.modalText, { paddingTop: 10 }]}>Origen</Text>
                        <View style={styles.inputView}>
                            <TextInput style={styles.inputText}
                                placeholder='Ej: San Carlos'
                                onChangeText={(text) => {
                                    setdataSearch({ ...dataSearch, origen: text })
                                }}
                            />
                        </View>
                        <Text style={[styles.modalText, { paddingTop: 10 }]}>Destino</Text>
                        <View style={styles.inputView}>
                            <TextInput style={styles.inputText}
                                placeholder='Ej: La Ribera'
                                onChangeText={(text) => {
                                    setdataSearch({ ...dataSearch, destino: text })
                                }}
                            />
                        </View>
                        <TouchableOpacity
                            style={{ ...styles.openButton, backgroundColor: "#e84c22", }}
                            onPress={() => {
                                if (dataSearch.origen != 'Origen' && dataSearch.destino != 'Destino' && dataSearch.origen != '' && dataSearch.destino != '') {
                                    publicar(navigation, dataSearch).then((recos) => {
                                        setRecorridos(recos)
                                        setSearch(true)
                                    })
                                    setModalVisible2(false)
                                } else {
                                    Alert.alert(
                                        "Falta algo más!",
                                        "Debes agregar un origen y un destino",
                                        [
                                            {
                                                text: "OK", onPress: () => {
                                                    setModalVisible(false)
                                                    setModalVisible2(true)
                                                }
                                            }
                                        ],
                                        { cancelable: false }
                                    );
                                }
                            }}
                        >
                            <Text style={styles.textStyle} onPress={() => {
                                if (dataSearch.origen != 'Origen' && dataSearch.destino != 'Destino' && dataSearch.origen != '' && dataSearch.destino != '') {
                                    publicar(navigation, dataSearch).then((recos) => {
                                        setRecorridos(recos)
                                        setSearch(true)
                                    })
                                    setModalVisible2(false)
                                } else {
                                    Alert.alert(
                                        "Falta algo más!",
                                        "Debes agregar un origen y un destino",
                                        [
                                            {
                                                text: "OK", onPress: () => {
                                                    setModalVisible(false)
                                                    setModalVisible2(true)
                                                }
                                            }
                                        ],
                                        { cancelable: false }
                                    );
                                }
                            }}>Aceptar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={[styles.modalText, { fontWeight: 'bold', fontSize: 25, color: '#e84c22', borderBottomWidth: 2, borderBottomColor: '#e84c22' }]}>Seleccionar horario</Text>
                        <Text style={[styles.modalText, { paddingTop: 10 }]}>Día</Text>
                        <View style={[styles.inputView, { marginHorizontal: 10 }]}>
                            <Picker style={{ width: '100%', color: 'black' }}
                                itemStyle={{ borderRadius: 4, borderColor: 'blue' }}
                                selectedValue={dia}
                                onValueChange={(itemValue) => {
                                    setdataSearch({ ...dataSearch, dia: itemValue })
                                    setDia(itemValue)
                                }}
                            >
                                <Picker.Item label={week[dia]} value={dia} />
                                <Picker.Item label='Lunes' value="0" />
                                <Picker.Item label='Martes' value="1" />
                                <Picker.Item label='Miercoles' value="2" />
                                <Picker.Item label='Jueves' value="3" />
                                <Picker.Item label='Viernes' value="4" />
                                <Picker.Item label='Sabado' value="5" />
                                <Picker.Item label='Domingo' value="6" />
                            </Picker>
                        </View>
                        <Text style={styles.modalText}>Hora mínima de salida</Text>
                        <View style={styles.inputView}>
                            <TouchableOpacity style={{ paddingLeft: 10 }} onPress={showTimepicker}>
                                <TextInput
                                    style={[styles.inputText, { alignItems: 'center', textAlign: 'center' }]}
                                    editable={false}
                                    value={
                                        moment(date).format('HH:mm')
                                    }
                                />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.modalText}>Hora máxima de salida</Text>
                        <View style={styles.inputView}>
                            <TouchableOpacity style={{ paddingLeft: 10 }} onPress={showTimepicker2}>
                                <TextInput
                                    style={[styles.inputText, { alignItems: 'center', textAlign: 'center' }]}
                                    editable={false}
                                    value={
                                        moment(date2).format('HH:mm')
                                    }
                                />
                            </TouchableOpacity>
                            {show && <DateTimePicker
                                value={date}
                                mode={mode}
                                onChange={onChange}
                                display={"spinner"}
                            />}
                            {show2 && <DateTimePicker
                                value={date2}
                                mode={mode}
                                onChange={onChange2}
                                display={"spinner"}
                            />}
                        </View>
                        <TouchableOpacity
                            style={{ ...styles.openButton, backgroundColor: "#e84c22", }}
                            onPress={() => {
                                if (dataSearch.origen != 'Origen' && dataSearch.destino != 'Destino' && dataSearch.origen != '' && dataSearch.destino != '') {
                                    publicar(navigation, dataSearch).then((recos) => {
                                        setRecorridos(recos)
                                        setSearch(true)
                                    })
                                    setModalVisible(false)
                                } else {
                                    Alert.alert(
                                        "Falta algo más!",
                                        "Debes agregar un origen y un destino",
                                        [
                                            {
                                                text: "OK", onPress: () => {
                                                    setModalVisible(false)
                                                    setModalVisible2(true)
                                                }
                                            }
                                        ],
                                        { cancelable: false }
                                    );
                                }
                            }}
                        >
                            <Text style={styles.textStyle} onPress={() => {
                                if (dataSearch.origen != 'Origen' && dataSearch.destino != 'Destino' && dataSearch.origen != '' && dataSearch.destino != '') {
                                    publicar(navigation, dataSearch).then((recos) => {
                                        setRecorridos(recos)
                                        setSearch(true)
                                    })
                                    setModalVisible(false)
                                } else {
                                    Alert.alert(
                                        "Falta algo más!",
                                        "Debes agregar un origen y un destino",
                                        [
                                            {
                                                text: "OK", onPress: () => {
                                                    setModalVisible(false)
                                                    setModalVisible2(true)
                                                }
                                            }
                                        ],
                                        { cancelable: false }
                                    );
                                }
                            }}>Buscar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style={[styles.button2, { flexDirection: "row", justifyContent: 'center', marginBottom: 0 }]}>
                <TouchableOpacity onPress={() => { setModalVisible2(true) }}>
                    <Text style={[styles.texto4]}>{dataSearch.origen}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginHorizontal: 15, justifyContent: 'center', }} onPress={() => {
                    setdataSearch({ ...dataSearch, origen: dataSearch.destino, destino: dataSearch.origen })
                }}>
                    <FontAwesome5
                        name={'exchange-alt'}
                        size={35}
                        color={'#e84c22'}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setModalVisible2(true) }}>
                    <Text style={[styles.texto4]}>{dataSearch.destino}</Text>
                </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 0 }}>
                <View style={[styles.button2, { width: "80%", flexDirection: "row", justifyContent: 'center', marginTop: 0, backgroundColor: '#e84c22', paddingHorizontal: 15 }]}>
                    <TouchableOpacity style={{ flex: 1 }}
                        onPress={() => {
                            setModalVisible(!modalVisible)
                        }}
                    >
                        <Text style={[styles.texto5, { color: 'white', paddingLeft: 15, marginRight: 10 }]}>
                            {week[dia]}
                        </Text>
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}>
                        <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold', justifyContent: 'center' }}>|</Text>
                    </View>
                    <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                        setModalVisible(!modalVisible)
                    }}>
                        <Text style={[styles.texto4, { color: 'white' }]}>{moment(date).format('HH:mm') + '-' + moment(date2).format('HH:mm')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {recorridos.length <= 0 ? (
                search ? (<Text style={[styles.texto4, { color: 'black', marginTop: '70%' }]}>No se encontraron recorridos</Text>) : (<Text style={[styles.texto4, { color: 'black', marginTop: '70%' }]}>Seleccione las opciones para comenzar a buscar</Text>)
            ) : (
                    <FlatList
                        data={recorridos}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        extraData={selectedId}
                    />
                )}
        </View>
    );
}

const publicar = async (navigation, dataSearch) => {
    let res = await fetch(back + 'searchRecorrido', {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json',
        },
        body: JSON.stringify({
            origen: dataSearch.origen,
            destino: dataSearch.destino,
        }),
    })
    res = await res.json()
    if (res.ok) {
        let horaInicio = new Date(dataSearch.horaInicio)
        let horaTermino = new Date(dataSearch.horaTermino)
        let recorridos = res.recorridos
        let res2 = {}
        let todo = []
        todo = await recorridos.map(async recorrido => {
            res2 = await fetch(back + 'getRecorridoById?empresa=' + recorrido.empresa + '&recorrido=' + recorrido.recorrido)
            res2 = await res2.json()
            if (res2.ok) {
                if (res2.recorrido.Horarios != undefined && res2.recorrido.Horarios != null) {
                    let horarios = Object.values(res2.recorrido.Horarios)
                    let todo2 = horarios.map(horario => {
                        if (horario.dias[dataSearch.dia].activo) {
                            let horaI = new Date(horario.horaInicio)
                            if (horaI.getHours() >= horaInicio.getHours() && horaI.getHours() <= horaTermino.getHours()) {
                                if (horaI.getHours() == horaTermino.getHours()) {
                                    if (horaI.getMinutes() <= horaTermino.getMinutes()) {

                                        return { ...horario, nombre: recorrido.nombre, origen: recorrido.origen, destino: recorrido.destino, recorrido: recorrido.recorrido, empresa: recorrido.empresa }
                                    }
                                } else {
                                    return { ...horario, nombre: recorrido.nombre, origen: recorrido.origen, destino: recorrido.destino, recorrido: recorrido.recorrido, empresa: recorrido.empresa }
                                }
                            }
                        }
                    })

                    return todo2.filter(x => x != null && x != undefined)
                }
            }
            return []
        })

        return Promise.all(todo).then((recorridos) => {
            let recos = []
            recorridos.map(x => {
                x.map(y => {
                    recos.push({
                        ...y
                    })
                })
            })
            return recos
        })
    } else {
        return []
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
    }, openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 30,
        padding: 10,
        marginTop: 10,
        elevation: 2,
        minWidth: 150,
    }, texto: {
        marginTop: 10,
        color: '#e84c22',
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 5
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
    }, texto5: {
        color: '#e84c22',
        textAlign: 'center',
        fontSize: 18,
    },
    container: {
        flex: 1,
        // marginTop: Constants.statusBarHeight,
    }, contenedor: {
        backgroundColor: 'white',
        alignItems: 'center',
    },
    modalView: {
        padding: 20,
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 10,
            height: 20
        },
        shadowOpacity: 1,
        minHeight: '50%',
        width: '90%',
        justifyContent: 'center',
        paddingHorizontal: 30,
        shadowRadius: 3.84,
        elevation: 30
    }, modalText: {
        textAlign: "center",
        fontSize: 20,
        marginBottom: 10
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
        color: 'black'
    },
    icon: {
        width: 50,
        color: 'white'
    }, textStyle: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
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
        borderWidth: 2,
        borderColor: '#ff4b00'
    },
    dias: {
        borderRadius: 50,
        width: 30,
        height: 30,
        textAlign: 'center',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 3,
        marginVertical: 4
    }, inputText2: {
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
    }, inputView: {
        width: "80%",
        borderRadius: 25,
        borderWidth: 1,
        borderBottomWidth: 3,
        height: 50,
        justifyContent: 'center',
        marginBottom: 10,
        borderColor: '#e84c22'
    }, centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
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

export default connect(mapStateToProps)(buscarRecorrido)
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, TextInput, FlatList, Alert, Image, Animated, Modal } from 'react-native'
import { back } from '../../env'
import uuid from 'uuid/v4'
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import { agregarHo, eliminarHorario, editarHorario } from '../store/actions/horarios'


const mode = 'time'
const displayFormat = 'HH:mm'

function AgregarHorario({ navigation, user, route, eliminarHorario, agregarHo, editarHorario }) {
    const { isNew, horario, recorrido } = route.params
    const [estado, setEstado] = useState(true);
    const color = estado ? '#e84c22' : 'transparent'
    const color2 = estado ? '#F79F46' : 'transparent'
    const color3 = estado ? 'white' : 'black'
    const [show, setShow] = useState(false)
    const [editing, setEditing] = useState(isNew)
    const [show2, setShow2] = useState(false)
    const [date, setDate] = useState(!isNew ? (new Date(horario.horaInicio)) : (new Date()));
    const [date2, setDate2] = useState(!isNew ? (new Date(horario.horaTermino)) : (new Date()));
    const [horar, setHorario] = useState(isNew ? ({
        id: uuid(),
        horaInicio: date,
        horaTermino: date2,
        conductor: '',
        patente: '',
        dias: [{
            id: "00",
            dia: "Lu",
            activo: false,
        },
        {
            id: "01",
            dia: "Ma",
            activo: false,
        },
        {
            id: "02",
            dia: "Mi",
            activo: false,
        },
        {
            id: "03",
            dia: "Ju",
            activo: false,
        },
        {
            id: "04",
            dia: "Vi",
            activo: false,
        },
        {
            id: "05",
            dia: "Sa",
            activo: false,
        },
        {
            id: "06",
            dia: "Do",
            activo: false,
        }]
    }) : (
            {
                id: horario.id,
                horaInicio: horario.horaInicio,
                horaTermino: horario.horaTermino,
                conductor: horario.conductor,
                patente: horario.patente,
                dias: horario.dias,
            }
        ))


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date
        setShow(Platform.OS === 'ios')
        setDate(currentDate)
        setHorario({ ...horar, horaInicio: currentDate })
    }

    const showTimepicker = () => {
        setShow(true)
    }


    const onChange2 = (event, selectedDate) => {
        const currentDate2 = selectedDate || date2
        setShow2(Platform.OS === 'ios')
        setDate2(currentDate2)
        setHorario({ ...horar, horaTermino: currentDate2 })

    }

    const showTimepicker2 = () => {
        setShow2(true)
    }
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

    return (
        <View style={loading ? ([styles.container, { opacity: 0.25 }]) : ([styles.container])}>
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
            <View style={{ flex: 1, maxHeight: 100, flexDirection: "row", justifyContent: 'center' }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '80%', }}>
                    <Text style={styles.texto}>&nbsp;&nbsp;&nbsp;&nbsp;Salida:</Text>
                    <View style={[styles.inputView, { width: '30%', marginHorizontal: 10, marginBottom: 0 }]}>
                        <TextInput
                            style={[styles.inputText, { alignItems: 'center', textAlign: 'center' }]}
                            editable={false}
                            value={
                                moment(date).format('HH:mm')
                            }
                        />
                    </View>
                    {editing ? (
                        <TouchableOpacity onPress={showTimepicker}>
                            <FontAwesome5 name={'clock'} color={'#e84c22'} size={35} />
                        </TouchableOpacity>
                    ) : (
                            <TouchableOpacity>
                                <FontAwesome5 name={'clock'} color={'#e84c22'} size={35} />
                            </TouchableOpacity>
                        )}

                    {editing ? (show && <DateTimePicker
                        value={date}
                        mode={mode}
                        onChange={onChange}
                        display={"spinner"}
                    />) : (
                            <></>
                        )}
                </View>
            </View>

            <View style={{ flex: 1, maxHeight: 100, flexDirection: "row", justifyContent: 'center' }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '80%', alignContent: 'center' }}>
                    <Text style={styles.texto}>&nbsp;Llegada:</Text>
                    <View style={[styles.inputView, { width: '30%', marginHorizontal: 10, marginBottom: 0 }]}>
                        <TextInput
                            style={[styles.inputText, { alignItems: 'center', textAlign: 'center' }]}
                            editable={false}
                            value={
                                moment(date2).format('HH:mm')
                            }
                        />
                    </View>
                    {editing ? (
                        <TouchableOpacity onPress={showTimepicker2}>
                            <FontAwesome5 name={'clock'} color={'#e84c22'} size={35} />
                        </TouchableOpacity>
                    ) : (
                            <TouchableOpacity >
                                <FontAwesome5 name={'clock'} color={'#e84c22'} size={35} />
                            </TouchableOpacity>
                        )}
                    {editing ? (
                        show2 && <DateTimePicker
                            value={date2}
                            mode={mode}
                            onChange={onChange2}
                            display={"spinner"}
                        />) : (
                            <></>
                        )}
                </View>
            </View>


            <FlatList
                horizontal={true}
                data={horar.dias}
                renderItem={({ item }) => {
                    return (
                        <View>
                            {item.activo ? (
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#e84c22', '#F79F46']} style={[styles.dias]}>
                                    {editing ? (
                                        <TouchableOpacity style={styles.dias}
                                            onPress={() => {
                                                let days = [...horar.dias]
                                                days = days.map(dia => {
                                                    if (dia.id == item.id) {
                                                        return { ...dia, activo: !dia.activo }
                                                    }
                                                    return dia
                                                })
                                                setHorario({ ...horar, dias: days })
                                            }}
                                        >
                                            <Text style={{ color: 'white', fontWeight: 'bold' }}>{item.dia}</Text>
                                        </TouchableOpacity>
                                    ) : (
                                            <TouchableOpacity style={styles.dias}>
                                                <Text style={{ color: 'white', fontWeight: 'bold' }}>{item.dia}</Text>
                                            </TouchableOpacity>
                                        )}
                                </LinearGradient>)
                                : (
                                    <LinearGradient colors={['transparent', 'transparent']} style={[styles.dias]}>
                                        {editing ? (
                                            <TouchableOpacity style={styles.dias}
                                                onPress={() => {
                                                    let days = [...horar.dias]
                                                    days = days.map(dia => {
                                                        if (dia.id == item.id) {
                                                            return { ...dia, activo: !dia.activo }
                                                        }
                                                        return dia
                                                    })
                                                    setHorario({ ...horar, dias: days })
                                                }}
                                            >
                                                <Text style={{ color: '#e84c22', fontWeight: 'bold' }}>{item.dia}</Text>
                                            </TouchableOpacity>
                                        ) : (
                                                <TouchableOpacity style={styles.dias}>
                                                    <Text style={{ color: '#e84c22', fontWeight: 'bold' }}>{item.dia}</Text>
                                                </TouchableOpacity>
                                            )
                                        }
                                    </LinearGradient>
                                )}
                        </View>
                    )
                }}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                style={{ maxHeight: 50 }}
            />


            <Text style={styles.texto}>Conductor:</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    value={horar.conductor}
                    editable={editing}
                    onChangeText={text => setHorario({ ...horar, conductor: text })}
                />
            </View>

            <Text style={styles.texto}>Patente:</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    value={horar.patente}
                    editable={editing}
                    onChangeText={text => setHorario({ ...horar, patente: text })}
                />
            </View>
            {!isNew ? (
                <View style={{ flexDirection: "row" }}>
                    {!editing ? (
                        <>
                            <TouchableOpacity style={[styles.button, { backgroundColor: "#04254E" }]}
                                onPress={() => {
                                    setEditing(!editing)
                                }}
                            >
                                <Text style={[styles.texto, { color: 'white' }]}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button]}
                                onPress={() => {
                                    if (!loading) {
                                        startAnimation()
                                        setLoading(true)
                                        editar(navigation, horar, user, recorrido, editarHorario, setLoading)
                                    }
                                }}
                            >
                                <Text style={[styles.texto, { color: 'white' }]}>Publicar</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                            <>
                                <TouchableOpacity style={[styles.button, { backgroundColor: "#04254E" }]}
                                    onPress={() => {
                                        if (!loading) {
                                            startAnimation()
                                            setLoading(true)
                                            eliminar(navigation, horar, user, recorrido, eliminarHorario, setLoading)
                                        }

                                    }}
                                >
                                    <Text style={[styles.texto, { color: 'white' }]}>Eliminar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.button]}
                                    onPress={() => {
                                        if (!loading) {
                                            startAnimation()
                                            setLoading(true)
                                            editar(navigation, horar, user, recorrido, editarHorario, setLoading)
                                        }
                                    }
                                    }
                                >
                                    <Text style={[styles.texto, { color: 'white' }]}>Publicar</Text>
                                </TouchableOpacity>
                            </>
                        )}
                </View>
            ) : (
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity style={[styles.button]}
                            onPress={() => {
                                if (!loading) {
                                    startAnimation()
                                    setLoading(true)
                                    publicar(navigation, horar, user, recorrido, agregarHo, setLoading)
                                }
                            }
                            }
                        >
                            <Text style={[styles.texto, { color: 'white' }]}>Publicar</Text>
                        </TouchableOpacity>
                    </View>
                )}

        </View>
    );
}


const eliminar = async (navigation, horar, user, recorrido, eliminarHorario, setLoading) => {
    let res = await fetch(back + 'removeHorario', {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json',
        },
        body: JSON.stringify({
            rut: user.rut,
            recorrido: recorrido.id,
            id: horar.id,
        }),
    })
    res = await res.json()
    if (res.ok) {
        await eliminarHorario(horar, recorrido)
        setLoading(false)
        Alert.alert(
            "Genial!",
            'Se ha elminado su horario!',
            [
                {
                    text: "OK", onPress: () => navigation.navigate('Horarios', {
                        reco: recorrido,
                        forNews: false
                    })
                }
            ],
            { cancelable: false }
        );
    } else {
        setLoading(false)
        Alert.alert(
            "Oh no! algo anda mal",
            'No se ha podido eliminar su horario',
            [
                { text: "Volver a intentar" }
            ],
            { cancelable: false }
        );
    }
}


const publicar = async (navigation, horar, user, recorrido, agregarHo, setLoading) => {
    let cont = 0
    await horar.dias.map(dia => {
        if (dia.activo) {
            cont++
        }
    })
    if (cont <= 0) {
        setLoading(false)
        Alert.alert(
            'Debes seleccionar mínimo 1 día!',
            'Para seleccionar un día debes tocar sobre los días en los que funciona este horario',
            [
                { text: "Volver a intentar" }
            ],
            { cancelable: false }
        );
        return
    }
    let res = await fetch(back + 'addHorario', {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json',
        },
        body: JSON.stringify({
            rut: user.rut,
            recorrido: recorrido.id,
            id: horar.id,
            horaInicio: horar.horaInicio.toString(),
            horaTermino: horar.horaTermino.toString(),
            conductor: horar.conductor,
            patente: horar.patente,
            dias: horar.dias,
        }),
    })
    res = await res.json()
    if (res.ok) {
        await agregarHo(horar, recorrido)
        setLoading(false)
        Alert.alert(
            "Genial!",
            'Se ha agregado su horario!',
            [
                {
                    text: "OK", onPress: () => navigation.navigate('Horarios', {
                        reco: recorrido
                    })
                }
            ],
            { cancelable: false }
        );
    } else {
        setLoading(false)
        Alert.alert(
            "Oh no! algo anda mal",
            'No se ha podido agregar su horario',
            [
                { text: "Volver a intentar" }
            ],
            { cancelable: false }
        );
    }
}

const editar = async (navigation, horar, user, recorrido, editarHorario, setLoading) => {

    let res = await fetch(back + 'editHorario', {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json',
        },
        body: JSON.stringify({
            rut: user.rut,
            recorrido: recorrido.id,
            id: horar.id,
            horaInicio: horar.horaInicio.toString(),
            horaTermino: horar.horaTermino.toString(),
            conductor: horar.conductor,
            patente: horar.patente,
            dias: horar.dias,
        }),
    })
    res = await res.json()
    if (res.ok) {
        editarHorario(horar, recorrido)
        setLoading(false)
        Alert.alert(
            "Genial!",
            'Se han guardados los cambios!',
            [
                {
                    text: "OK", onPress: () => navigation.navigate('Horarios', {
                        reco: recorrido,
                    })
                }
            ],
            { cancelable: false }
        );
    } else {
        setLoading(false)
        Alert.alert(
            "Oh no! algo anda mal",
            'No se han guardar los cambios!',
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
        width: '40%',
        borderRadius: 10,
        height: 50,
        backgroundColor: '#e84c22',
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
        marginVertical: 15
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
    },
    dias: {
        borderRadius: 50,
        width: 40,
        height: 40,
        textAlign: 'center',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 3,
        marginVertical: 4
    }, tinyLogo: {
        width: 250,
        height: 245,
    }, containerLoading: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
});

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = dispatch => ({
    agregarHo: (horario, recorrido) => dispatch(agregarHo(horario, recorrido)),
    editarHorario: (horario, recorrido) => dispatch(editarHorario(horario, recorrido)),
    eliminarHorario: (horario, recorrido) => dispatch(eliminarHorario(horario, recorrido))
})

export default connect(mapStateToProps, mapDispatchToProps)(AgregarHorario)

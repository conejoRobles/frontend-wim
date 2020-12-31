import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, StatusBar, Alert } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { connect } from 'react-redux'
import moment from 'moment';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/EvilIcons'

function Horarios({ user, empresas, navigation, route }) {
    const [selectedId, setSelectedId] = useState(null)
    const { reco, forNews } = route.params
    const renderItem = ({ item }) => {
        return (
            <>
                { user.rol == 'pasajero' ? (
                    item.Noticias != null && item.Noticias != undefined ? (
                        <TouchableOpacity
                            onPress={() => {
                                if (forNews) {
                                    navigation.navigate('NoticiasxRecorridoEmpresa', {
                                        noticias: item.Noticias ? Object.values(item.Noticias) : [],
                                        recorrido: reco.id,
                                        horario: item,
                                        reco
                                    })
                                } else {
                                    navigation.navigate('AgregarHorario', {
                                        isNew: false,
                                        horario: item,
                                        recorrido: reco
                                    })
                                }
                            }}
                            style={[styles.button, styles.bordes]}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[styles.texto]}>{moment(new Date(item.horaInicio)).format('HH:mm')} - {moment(new Date(item.horaTermino)).format('HH:mm')}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    {user.rol == 'pasajero' ? (

                                        <Text style={styles.texto}>{item.nombre}</Text>

                                    ) : (
                                            <FlatList
                                                horizontal={true}
                                                data={Object.values(item.dias)}
                                                renderItem={({ item }) =>
                                                    <View style={[styles.dias]}>
                                                        {
                                                            item.activo ? (<LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#e84c22', '#F79F46']} style={[styles.dias]}>
                                                                <Text style={{ color: 'white', fontWeight: 'bold' }}>{item.dia}</Text>
                                                            </LinearGradient>)
                                                                : (
                                                                    <LinearGradient colors={['#f4f4f4', '#fafafa']} style={[styles.dias, { borderWidth: 1, borderColor: '#e84c22', }]}>
                                                                        <Text style={{ color: '#e84c22', fontWeight: 'bold' }}>{item.dia}</Text>
                                                                        <Icon name="close" size={40} style={[styles.icon, { zIndex: 0, position: 'absolute', textAlign: 'center' }]} />
                                                                    </LinearGradient>
                                                                )
                                                        }
                                                    </View>
                                                }
                                                keyExtractor={(item) => item.id}
                                                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                                            />)}
                                </View>
                            </View>
                        </TouchableOpacity>
                    ) : (
                            <></>
                        )
                ) : (
                        <TouchableOpacity
                            onPress={() => {
                                if (forNews) {
                                    navigation.navigate('NoticiasxRecorridoEmpresa', {
                                        noticias: item.Noticias ? Object.values(item.Noticias) : [],
                                        recorrido: reco.id,
                                        reco,
                                        horario: item
                                    })
                                } else {
                                    navigation.navigate('AgregarHorario', {
                                        isNew: false,
                                        horario: item,
                                        recorrido: reco
                                    })
                                }
                            }}
                            style={[styles.button, styles.bordes]}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[styles.texto]}>{moment(new Date(item.horaInicio)).format('HH:mm')} - {moment(new Date(item.horaTermino)).format('HH:mm')}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    {user.rol == 'pasajero' ? (

                                        <Text style={styles.texto}>{item.nombre}</Text>

                                    ) : (
                                            <FlatList
                                                horizontal={true}
                                                data={Object.values(item.dias)}
                                                renderItem={({ item }) =>
                                                    <View style={[styles.dias]}>
                                                        {
                                                            item.activo ? (<LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#e84c22', '#F79F46']} style={[styles.dias]}>
                                                                <Text style={{ color: 'white', fontWeight: 'bold' }}>{item.dia}</Text>
                                                            </LinearGradient>)
                                                                : (
                                                                    <LinearGradient colors={['#f4f4f4', '#fafafa']} style={[styles.dias, { borderWidth: 1, borderColor: '#e84c22', }]}>
                                                                        <Text style={{ color: '#e84c22', fontWeight: 'bold' }}>{item.dia}</Text>
                                                                        <Icon name="close" size={40} style={[styles.icon, { zIndex: 0, position: 'absolute', textAlign: 'center' }]} />
                                                                    </LinearGradient>
                                                                )
                                                        }
                                                    </View>
                                                }
                                                keyExtractor={(item) => item.id}
                                                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                                            />

                                        )}
                                </View>
                                {user.rol == 'empresa' ? (
                                    <View style={{ flexDirection: "row" }}>
                                        {<View style={{ marginTop: '2%', marginRight: '2%' }}>
                                            <FontAwesome5
                                                name={'bell'}
                                                solid
                                                size={15}
                                                color='black'
                                            />
                                        </View>}
                                        <Text style={[styles.texto2, { fontSize: 16, color: 'black', marginTop: '0.7%' }]}>Noticias: {item.Noticias ? Object.values(item.Noticias).length : 0} </Text>
                                    </View>
                                ) : (<></>)}
                            </View>
                        </TouchableOpacity>
                    )
                }
            </>
        )
    }
    return (
        <View style={[styles.container]}>
            <StatusBar backgroundColor="#e84c22"></StatusBar>
            <View style={[styles.button2, styles.bordes2, { backgroundColor: 'white', marginBottom: 0, height: 60, paddingBottom: 70, paddingTop: 0 }]}>
                <Text style={[styles.texto5, { textAlign: 'center', marginTop: 20 }]}>{reco.origen} - {reco.destino}</Text>
            </View>
            {
                forNews ? (<></>) : (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AgregarHorario', {
                            isNew: true,
                            recorrido: reco
                        })}
                        style={[styles.button2, { width: '60%', alignSelf: 'center' }]}>
                        <Text style={styles.texto4}>Agregar Horario</Text>
                    </TouchableOpacity>)
            }
            {
                reco.Horarios ?
                    (
                        <FlatList
                            data={
                                Object.values(reco.Horarios).map(x => {
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
                        <Text style={[styles.texto5, { color: 'black', marginTop: '70%' }]}>Aún no has agregado horarios</Text>
                    )
            }
        </View >
    );
}

const styles = StyleSheet.create({
    texto5: {
        color: '#e84c22',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center'
    }, header: {
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
        color: 'black'
    },
    icon: {
        width: 50,
        color: 'black'
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
    }, bordes2: {
        borderWidth: 1,
        borderBottomWidth: 5,
        borderTopWidth: 0,
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
    }
});

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps)(Horarios)
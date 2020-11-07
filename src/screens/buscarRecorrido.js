import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, StatusBar, Alert } from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const recorridos = {
    "Horarios" : {
    "707c47a8-9706-4510-951d-6b2b1714dcb5" : {
        "conductor" : "",
        "dias" : [ {
        "activo" : true,
        "dia" : "Lu",
        "id" : "00"
        }, {
        "activo" : false,
        "dia" : "Ma",
        "id" : "01"
        }, {
        "activo" : true,
        "dia" : "Mi",
        "id" : "02"
        }, {
        "activo" : false,
        "dia" : "Ju",
        "id" : "03"
        }, {
        "activo" : false,
        "dia" : "Vi",
        "id" : "04"
        }, {
        "activo" : true,
        "dia" : "Sa",
        "id" : "05"
        }, {
        "activo" : false,
        "dia" : "Do",
        "id" : "06"
        } ],
        "horaInicio" : "Tue Nov 03 2020 13:57:32 GMT-0300 (-03)",
        "horaTermino" : "Tue Nov 03 2020 13:57:32 GMT-0300 (-03)",
        "id" : "707c47a8-9706-4510-951d-6b2b1714dcb5",
        "patente" : ""
        }
    }
}


function buscarRecorrido({ user, empresas, navigation, route }) {
    const [selectedId, setSelectedId] = useState(null)
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('InfoRecorrido', {
                    // isNew: false,
                    // horario: item,
                    // recorrido: reco
                })}
                style={[styles.button, styles.bordes]}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.texto]}>{moment(new Date(item.horaInicio)).format('HH:mm')} - {moment(new Date(item.horaTermino)).format('HH:mm')}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        {/* <FlatList
                            horizontal={true}
                            data={Object.values(item.dias)}
                            renderItem={({ item }) =>
                                <View>
                                    {item.activo ? (<LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#e84c22', '#F79F46']} style={[styles.dias]}>
                                        <Text style={{ color: 'white', fontWeight: 'bold' }}>{item.dia}</Text>
                                    </LinearGradient>)
                                        : (
                                            <LinearGradient colors={['transparent', 'transparent']} style={[styles.dias]}>
                                                <Text style={{ color: '#e84c22', fontWeight: 'bold' }}>{item.dia}</Text>
                                            </LinearGradient>
                                        )}
                                </View>
                            }
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                        /> */}
                        <Text style={[styles.texto]}>Empresita</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={[styles.container]}>
            <StatusBar backgroundColor="#e84c22"></StatusBar>
            <View
                style={[styles.button2, {flexDirection: "row", justifyContent:'center', marginBottom:0}]}>
                <TouchableOpacity>
                    <Text style={[styles.texto4]}>Origen</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {{marginHorizontal:15}}>
                <FontAwesome5
                    name={'exchange-alt'}
                    size={35}
                    color= {'#e84c22'}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.texto4}>Destino</Text>
                </TouchableOpacity>
            </View>
            <View style= {{justifyContent:'center', alignItems:'center', marginTop: 0}}>
                <View style = {[styles.button2, {width: "80%", flexDirection: "row", justifyContent:'center', marginTop: 0, backgroundColor : '#e84c22', paddingHorizontal:15}]}>
                    <TouchableOpacity style={{flex:1}}>
                        <Text style={[styles.texto4, {color: 'white', paddingLeft:15}]}>Lunes</Text>
                    </TouchableOpacity>
                    <View style={{justifyContent:'center', alignItems:'center', marginHorizontal:5}}>
                        <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold', justifyContent:'center'}}>|</Text>
                    </View>
                    <TouchableOpacity style={{flex:2}}>
                        <Text style={[styles.texto4, {color: 'white'}]}>Horario</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                    data={Object.values(recorridos.Horarios)}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    extraData={selectedId}
                />
        </View>
    );
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
        color: 'black'
    },
    icon: {
        width: 50,
        color: 'white'
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
    }
});

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps)(buscarRecorrido)
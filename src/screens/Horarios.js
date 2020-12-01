import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, StatusBar, Alert } from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/EvilIcons'

function Horarios({ user, empresas, navigation, route }) {
    const [selectedId, setSelectedId] = useState(null)
    const { reco, forNews } = route.params
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    if (forNews) {
                        navigation.navigate('NoticiasxRecorridoEmpresa', {
                            noticias: item.Noticias ? Object.values(item.Noticias) : [],
                            recorrido: reco.id,
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
                        <FlatList
                            horizontal={true}
                            data={Object.values(item.dias)}
                            renderItem={({ item }) =>
                                <View style={[styles.dias]}>
                                    {item.activo ? (<LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#e84c22', '#F79F46']} style={[styles.dias]}>
                                        <Text style={{ color: 'white', fontWeight: 'bold' }}>{item.dia}</Text>
                                    </LinearGradient>)
                                        : (
                                            <LinearGradient colors={['#f4f4f4', '#fafafa']} style={[styles.dias, { borderWidth: 1, borderColor: '#e84c22', }]}>
                                                <Text style={{ color: '#e84c22', fontWeight: 'bold' }}>{item.dia}</Text>
                                                <Icon name="close" size={40} style={[styles.icon, { zIndex: 0, position: 'absolute', textAlign: 'center' }]} />
                                            </LinearGradient>
                                        )}
                                </View>
                            }
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={[styles.container]}>
            <StatusBar backgroundColor="#e84c22"></StatusBar>

            {forNews ? (<></>) : (
                <TouchableOpacity
                    onPress={() => navigation.navigate('AgregarHorario', {
                        isNew: true,
                        recorrido: reco
                    })}
                    style={[styles.button2]}>
                    <Text style={styles.texto4}>Agregar Horario</Text>
                </TouchableOpacity>)}
            {/* {reco.Horarios ? (
                (reco.Horarios.size() > 0) ? (<FlatList
                    data={Object.values(reco.Horarios)}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    extraData={selectedId}
                />):(
                        <Text style={[styles.texto4, { color: 'black', marginTop: '70%' }]}>Aún no has agregado horarios</Text> 
                )  
            ): (
                <Text style={[styles.texto4, { color: 'black', marginTop: '70%' }]}>Aún no has agregado horarios</Text>
            )} */}
            {reco.Horarios ? (<FlatList
                data={Object.values(reco.Horarios)}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
            />) : (
                    <Text style={[styles.texto4, { color: 'black', marginTop: '70%' }]}>Aún no has agregado horarios</Text>
                )}
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
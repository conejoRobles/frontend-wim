import React, { useState } from 'react'
import { Component } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native'
import { color } from 'react-native-reanimated'
import { connect } from 'react-redux'
import noticias from '../store/reducers/noticias'
import moment from 'moment';



function tiempo(minutos) {
    if (minutos > 59) {
        let horas = Math.trunc(minutos / 60)
        let m = minutos % 60
        if (horas > 23) {
            let dias = Math.trunc(horas / 24)
            horas = horas % 24
            m
            return "" + dias + "d " + horas + "h " + m + "m"
        }
        return "" + horas + "h " + m + "m"
    } else {
        return "" + minutos + "m"
    }
}

const Item = ({ item, onPress, style }) => {
    return (
        moment(item.fechaTermino).diff(moment(new Date()), 'minutes') > 0 && (
            <TouchableOpacity onPress={onPress} style={[styles.button, style, { flex: 1 }]}>
                <Text style={styles.texto}>{item.titulo}</Text>
                <Text style={[styles.texto3, { flex: 1 }]}>{item.descripcion}</Text>
                <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 10, borderTopWidth: 2, borderTopColor: 'white', maxHeight: 50 }}>
                    <Text style={[styles.texto3, { fontSize: 15 }]}>Publicación: {moment(item.fechaPublicacion).format('DD/MM/YY').toString()}</Text>
                    <Text style={[styles.texto3, { fontSize: 15 }]}>
                        Quedan:
                {' ' + tiempo(moment(item.fechaTermino).diff(moment(new Date()), 'minutes'))}
                    </Text>
                </View>
            </TouchableOpacity>)

    )
}

function NoticiasXRecorridoEmpresa({ navigation, route, user }) {
    const { noticias, recorrido, horario, reco } = route.params
    const [selectedId, setSelectedId] = useState(null)
    const renderItem = ({ item }) => {
        if (user.rol == 'empresa') {
            return (
                <Item
                    item={item}
                    onPress={() => {
                        navigation.navigate('EditarNoticia', {
                            item,
                            recorrido,
                            horario,
                            noticias,
                            reco
                        })
                        setSelectedId(item.id)
                    }}
                    style={{ backgroundColor: '#e84c22' }}
                />
            )
        } else {
            return (<Item
                item={item}
                onPress={() => {
                    setSelectedId(item.id)
                }}
                style={{ backgroundColor: '#e84c22' }}
            />)
        }
    }
    return (
        <View style={[styles.container]}>
            <StatusBar backgroundColor="#e84c22"></StatusBar>
            <View style={[styles.button7, styles.bordes, { backgroundColor: 'white', marginBottom: 0, height: 70, paddingBottom: 10, }]}>
                <Text style={[styles.texto4, { textAlign: 'center', marginTop: 20 }]}>{reco.origen} - {reco.destino}</Text>
            </View>
            {user.rol == 'pasajero' ? (<TouchableOpacity
                style={[styles.button2, { width: '50%', alignSelf: 'center' }]}>
                <Text style={styles.texto2}>{horario.nombre}</Text>
            </TouchableOpacity>) : (<></>)}
            {
                user.rol == 'empresa' ? (<TouchableOpacity
                    onPress={() => {
                        navigation.navigate('AgregarNoticias', {
                            horario,
                            recorrido,
                            noticias,
                            reco
                        })
                    }}
                    style={[styles.button2, { width: '70%', alignSelf: 'center' }]}>
                    <Text style={styles.texto2}>Agregar Noticia</Text>
                </TouchableOpacity>) : (<></>)
            }
            {
                noticias.length > 0 && noticias != null && noticias != undefined ? (
                    <FlatList
                        data={noticias}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        extraData={selectedId}
                    />
                ) : (
                        <Text style={[styles.texto2, { color: 'black', marginTop: '70%' }]}>Aún no hay noticias</Text>
                    )
            }
        </View >
    );
}

const styles = StyleSheet.create({
    button7: {
        backgroundColor: 'rgba(232,76,34,0.3)',
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        height: 35,
        justifyContent: 'center',
    }, texto4: {
        color: '#e84c22',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center'
    }, headerText: {
        fontWeight: 'bold',
        fontSize: 10,
        color: 'white',
        letterSpacing: 1
    },
    container: {
        flex: 1,
    },
    button: {
        marginHorizontal: 40,
        borderRadius: 50,
        height: 200,
        alignItems: "center",
        marginVertical: 15,
    },
    button2: {
        backgroundColor: 'rgba(232,76,34,0.3)',
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        height: 35,
        justifyContent: 'center',
    },
    contenedor: {
        backgroundColor: 'white',
        alignItems: 'center',
    },
    texto: {
        fontSize: 25,
        width: '75%',
        marginVertical: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
        borderBottomWidth: 2,
        borderBottomColor: 'white'
    },
    icon: {
        width: 50,
        color: 'white'
    },
    texto2: {
        color: '#e84c22',
        textAlign: 'center',
        fontSize: 20,
    },
    texto3: {
        color: 'white',
        textAlign: 'center',
        marginHorizontal: 10,
        fontSize: 20,
    }, bordes2: {
        borderWidth: 2,
        borderColor: '#ff4b00'
    },
    bordes: {
        borderWidth: 1,
        borderBottomWidth: 5,
        borderTopWidth: 0,
        borderColor: '#ff4b00'
    }
});

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps)(NoticiasXRecorridoEmpresa)
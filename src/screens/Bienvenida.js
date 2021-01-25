import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Constants from 'expo-constants'
import { connect } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient';
import empresas from '../store/reducers/empresas'
import { back } from '../../env'
import { horariosLoad } from '../store/actions/horarios'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Title } from 'react-native-paper'


const Item = ({ item, onPress, style }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, styles.bordes, style,]}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: '7%', maxHeight: '60%' }}>
                <Text style={[styles.texto, { flex: 1, paddingTop: '7%' }]}>
                    {item.origen}
                    <Text> </Text>
                    <FontAwesome5
                        name={'arrow-right'}
                        solid
                        size={15}
                        color='white'
                    />
                    <Text> </Text>
                    {item.destino}
                </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                {<View style={{ marginTop: '1%', marginRight: '2%' }}>
                    <FontAwesome5
                        name={'clock'}
                        solid
                        size={15}
                        color='white'
                    />
                </View>}
                <Text style={[styles.texto3, { fontSize: 15, color: 'white' }]}>
                    Horarios: {item.Horarios != null && item.Horarios != undefined ? Object.values(item.Horarios).length : 0}</Text>
            </View>
        </TouchableOpacity >
    )
}

const Item2 = ({ item, onPress, style }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, styles.bordes, style,]}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: '7%', maxHeight: '60%' }}>
                <Text style={[styles.texto, { flex: 1, paddingTop: '7%' }]}>
                    {item.origen}
                    <Text> </Text>
                    <FontAwesome5
                        name={'arrow-right'}
                        solid
                        size={15}
                        color='white'
                    />
                    <Text> </Text>
                    {item.destino}
                </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                {<View style={{ marginTop: '1%', marginRight: '2%' }}>
                    <FontAwesome5
                        name={'clock'}
                        solid
                        size={15}
                        color='white'
                    />
                </View>}
                <Text style={[styles.texto3, { fontSize: 15, color: 'white' }]}>
                    Horarios: {Object.values(item.Horarios).length}</Text>
            </View>
        </TouchableOpacity >
    )
}

function Bienvenida({ user, empresas, navigation, horariosLoad, horarios, }) {
    const [selectedId, setSelectedId] = useState(null)
    const renderItem = ({ item }) => {
        const backgroundColor = "#e84c22";
        {
            return (
                <Item
                    item={item}
                    onPress={() => {
                        setSelectedId(item.id)
                        if (user.rol == 'empresa') {
                            navigation.navigate('AgregarRecorrido', {
                                isNew: false,
                                reco: item
                            })
                        } else {
                            navigation.navigate('FavXRecorridos', {
                                recorrido: item,
                                title: item.origen + '-' + item.destino
                            })
                        }

                    }}
                    style={{ backgroundColor }}
                />
            )
        }
    }
    return (
        <View style={[styles.container]}>
            <StatusBar backgroundColor="#ff6900"></StatusBar>
            <View style={[styles.button, styles.bordes, { backgroundColor: 'white', marginBottom: 0, }]}>
                <Text style={styles.texto2}>Bienvenido</Text>
                {
                    user.rol == 'empresa' ? (<Text style={styles.texto3}>Aquí tenemos tus recorridos publicados</Text>) : (<Text style={styles.texto3}>Aquí tenemos tus recorridos Favoritos</Text>)
                }
            </View>

            <View style={{ alignContent: 'center', alignItems: 'center' }}>
                {user.rol == 'empresa' && <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('AgregarRecorrido', { user, isNew: true })
                    }}
                    style={[styles.button2,]}>
                    <Text style={styles.texto4}>Agregar Recorrido</Text>
                </TouchableOpacity>}
            </View>

            {user.rol == 'empresa' ? (
                empresas.data.length > 0 ? (
                    <FlatList
                        data={empresas.data.sort((a, b) => {
                            if (a.origen > b.origen) {
                                return 1
                            }
                            if (a.origen < b.origen) {
                                return -1
                            }
                            return 0
                        })}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        extraData={selectedId}
                    />
                ) : (
                        <Text style={[styles.texto4, { color: 'black', marginTop: '70%' }]}>Aún no has agregado recorridos</Text>
                    )
            ) : (horarios.data.length > 0 ? (<FlatList
                data={horarios.data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
            />) : (
                    <Text style={[styles.texto4, { color: 'black', marginTop: '70%' }]}>Aún no has agregado recorridos</Text>
                ))
            }
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
    texto2: {
        color: '#e84c22',
        textAlign: 'center',
        fontSize: 15,
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
        marginHorizontal: 40,
        borderRadius: 30,
        height: 150,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 15,
    },
    button2: {
        backgroundColor: 'rgba(232,76,34,0.3)',
        width: '60%',
        alignItems: 'center',
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        height: 45,
        // justifyContent: 'center',
        paddingTop: 4,
        marginBottom: 10,
    },
    contenedor: {
        // flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        // height: screenHeight,
        // justifyContent: 'center',
        // marginTop: Constants.statusBarHeight,
    },
    texto: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white'
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
        borderWidth: 1,
        borderBottomWidth: 5,
        borderTopWidth: 0,
        borderColor: '#ff4b00'
    }
});

const mapStateToProps = state => {
    return state
}
const mapDispatchToProps = dispatch => ({
    horariosLoad: (favoritos) => dispatch(horariosLoad(favoritos)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Bienvenida)
import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient';
 
const DATA = [
    {
        id: "0",
        horaInicio: '13:00',
        horaTermino: '13:45',
        dias : [
            {
                id: "00",
                dia:"Lu",
                activo: true,
            },
            {
                id: "01",
                dia:"Ma",
                activo: false,
            },
            {
                id: "02",
                dia:"Mi",
                activo: true,
            },
            {
                id: "03",
                dia:"Ju",
                activo: false,
            },
            {
                id: "04",
                dia:"Vi",
                activo: false,
            },
            {
                id: "05",
                dia:"Sa",
                activo: true,
            },
            {
                id: "06",
                dia:"Do",
                activo: true,
            }
        ]
    },
    {
        id: "1",
        horaInicio: '14:00',
        horaTermino: '14:50',
        dias : [
            {
                id: "00",
                dia:"Lu",
                activo: true,
            },
            {
                id: "01",
                dia:"Ma",
                activo: true,
            },
            {
                id: "02",
                dia:"Mi",
                activo: true,
            },
            {
                id: "03",
                dia:"Ju",
                activo: false,
            },
            {
                id: "04",
                dia:"Vi",
                activo: false,
            },
            {
                id: "05",
                dia:"Sa",
                activo: false,
            },
            {
                id: "06",
                dia:"Do",
                activo: true,
            }
        ]
    },
    {
        id: "2",
        horaInicio: '15:30',
        horaTermino: '16:10',
        dias : [
            {
                id: "00",
                dia:"Lu",
                activo: true,
            },
            {
                id: "01",
                dia:"Ma",
                activo: true,
            },
            {
                id: "02",
                dia:"Mi",
                activo: true,
            },
            {
                id: "03",
                dia:"Ju",
                activo: false,
            },
            {
                id: "04",
                dia:"Vi",
                activo: false,
            },
            {
                id: "05",
                dia:"Sa",
                activo: true,
            },
            {
                id: "06",
                dia:"Do",
                activo: true,
            }
        ]
    },
    {
        id: "3",
        horaInicio: '16:20',
        horaTermino: '17:00',
        dias : [
            {
                id: "00",
                dia:"Lu",
                activo: true,
            },
            {
                id: "01",
                dia:"Ma",
                activo: true,
            },
            {
                id: "02",
                dia:"Mi",
                activo: true,
            },
            {
                id: "03",
                dia:"Ju",
                activo: false,
            },
            {
                id: "04",
                dia:"Vi",
                activo: false,
            },
            {
                id: "05",
                dia:"Sa",
                activo: true,
            },
            {
                id: "06",
                dia:"Do",
                activo: true,
            }
        ]
    },
    {
        id: "4",
        horaInicio: '17:00',
        horaTermino: '17:50',
        dias : [
            {
                id: "00",
                dia:"Lu",
                activo: true,
            },
            {
                id: "01",
                dia:"Ma",
                activo: true,
            },
            {
                id: "02",
                dia:"Mi",
                activo: true,
            },
            {
                id: "03",
                dia:"Ju",
                activo: true,
            },
            {
                id: "04",
                dia:"Vi",
                activo: false,
            },
            {
                id: "05",
                dia:"Sa",
                activo: true,
            },
            {
                id: "06",
                dia:"Do",
                activo: true,
            }
        ]
    },
    {
        id: "5",
        horaInicio: '18:00',
        horaTermino: '18:45',
        dias : [
            {
                id: "00",
                dia:"Lu",
                activo: true,
            },
            {
                id: "01",
                dia:"Ma",
                activo: true,
            },
            {
                id: "02",
                dia:"Mi",
                activo: true,
            },
            {
                id: "03",
                dia:"Ju",
                activo: false,
            },
            {
                id: "04",
                dia:"Vi",
                activo: false,
            },
            {
                id: "05",
                dia:"Sa",
                activo: true,
            },
            {
                id: "06",
                dia:"Do",
                activo: true,
            }
        ]
    },
]

function Horarios({ user, empresas, navigation }) {
    const [selectedId, setSelectedId] = useState(null)
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity 
            onPress = {() => navigation.navigate('AgregarHorario')}
            style={[styles.button, styles.bordes]}>
            <View style = {{justifyContent:'center', alignItems:'center'}}>
            <Text style={[styles.texto]}>{item.horaInicio} - {item.horaTermino} {item.dias[0].id}</Text>
                    <View style= {{flexDirection: 'row'}}>
                    <FlatList
                        horizontal = {true}
                        data={item.dias}
                        renderItem={({item}) => 
                            <View>
                                {item.activo ? (<LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}}  colors={['#e84c22', '#F79F46']} style = {[styles.dias]}>
                                    <Text style = {{color:'white', fontWeight:'bold'}}>{item.dia}</Text>
                                </LinearGradient>) 
                                : (
                                <LinearGradient colors={['transparent', 'transparent']} style = {[styles.dias]}>
                                    <Text style = {{color:'#e84c22', fontWeight:'bold'}}>{item.dia}</Text>
                                </LinearGradient> 
                                )}
                            </View>
                        }
                        keyExtractor={(item) => item.id}
                        contentContainerStyle= {{flexGrow: 1, justifyContent: 'center'}}
                    />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={[styles.container]}>
            <StatusBar backgroundColor="#e84c22"></StatusBar>

            <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('AgregarHorario')
                    }}
                    style={[styles.button2]}>
                    <Text style={styles.texto4}>Agregar Horario</Text>
            </TouchableOpacity>

            {DATA.length > 0 ? (<FlatList
                data={DATA}
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
        width:30,
        height: 30,
        textAlign: 'center',
        alignContent:'center',
        alignItems: 'center',
        justifyContent:'center',
        marginHorizontal:3,
        marginVertical:4
    }
});

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps)(Horarios)
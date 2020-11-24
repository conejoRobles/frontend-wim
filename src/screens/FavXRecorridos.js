import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, StatusBar } from 'react-native'
import { Badge } from 'react-native-paper'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'


const DATA = [
    {
        id: "0",
        empresa: 'Hola',
        HorarioSalida: '10:30',
        HorarioLlegada: '11:20'
    },
    {
        id: "1",
        empresa: 'Conejo',
        HorarioSalida: '10:30',
        HorarioLlegada: '11:20'
    },
    {
        id: "2",
        empresa: 'Estoy',
        HorarioSalida: '10:30',
        HorarioLlegada: '11:20'
    },
    {
        id: "3",
        empresa: 'Aburrida',
        HorarioSalida: '10:30',
        HorarioLlegada: '11:20'
    },
    {
        id: "4",
        empresa: 'Pero',
        HorarioSalida: '10:30',
        HorarioLlegada: '11:20'
    },
    {
        id: "5",
        empresa: 'Ya',
        HorarioSalida: '10:30',
        HorarioLlegada: '11:20'
    },
    {
        id: "6",
        empresa: 'Termine',
        HorarioSalida: '10:30',
        HorarioLlegada: '11:20'
    },
    {
        id: "7",
        empresa: 'c:',
        HorarioSalida: '10:30',
        HorarioLlegada: '11:20'
    },
]

// Crear componente *******************************************
const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
        <View style={[styles.bordes, { flex: 1, flexDirection: 'row', height: 120, alignItems: 'center' }]}>
            <View style={{ flex: 2.5 }}>
                <TouchableOpacity style = {[styles.bordes2, {width: 70, height: 70, alignSelf:'center',justifyContent:'center',alignItems: 'center'}]}>
                    <Icon name="heart" size={40} color= '#e84c22' />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 5 }}>
                <Text style={styles.texto2}>{item.empresa}</Text>
                <Text style={styles.texto}>{item.HorarioSalida} - {item.HorarioLlegada}</Text>
            </View>
        </View>
    </TouchableOpacity>
)

function FavXRecorridos({ navigation, empresas }) {
    const [selectedId, setSelectedId] = useState(null)
    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#d5d5d5" : "#f1f1f1";
        return (
            <Item
                item={item}
                onPress={() => {
                    // navigation.navigate('NoticiasXRecorridoPasajero', {
                    //     noticias: item.Noticias ? Object.values(item.Noticias) : []
                    // })
                    setSelectedId(item.id)
                }}
                style={{ backgroundColor }}
            />
        )
    }
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#e84c22"></StatusBar>
            <View>
                <Text style={[styles.texto4, {textAlign: 'center', marginTop: 20}]}>San Carlos - Chillán</Text>
            </View>
            {
                DATA.length > 0 ? (
                    <FlatList
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        extraData={selectedId}
                    />
                ) : (
                        <Text style={[styles.texto4, { color: 'black', marginTop: '70%' }]}>No sigues ningun recorrido</Text>
                    )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: Constants.statusBarHeight,
    },
    button: {
        // flex:1,
        flexDirection: 'row',
        paddingHorizontal: 40,
        height: 120,
        alignItems: 'center'
    },
    texto: {
        fontSize: 20,
        color: '#474747'
    },
    texto2: {
        color: '#1F1F1F',
        fontSize: 25,
        fontWeight: 'bold'
    },
    texto4: {
        color: '#e84c22',
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    bordes: {
        borderBottomWidth: 1.5,
        borderColor: 'black'
    },
    bordes2: {
        borderWidth: 2,
        borderColor: '#ff4b00',
        borderRadius: 50,
    },
    texto3: {
        // marginTop: -10,
        // backgroundColor: 'green',
        // flex: 1,
        fontSize: 40,
        fontWeight: 'bold',
        zIndex: 1,
    },
    foto: {
        backgroundColor: '#e84c22',
        borderRadius: 50,
        height: 70,
        maxHeight: 70,
        width: 70,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
    }
});


const mapStateToProps = state => {

    return state
}

export default connect(mapStateToProps)(FavXRecorridos)
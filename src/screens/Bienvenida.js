import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Constants from 'expo-constants'
import { connect } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient';

const DATA = [
    {
        id: "0",
        origen: 'Chillán',
        destino: 'San Carlos'
    },
    {
        id: "1",
        origen: 'San Carlos',
        destino: 'Chillán'
    },
    {
        id: "2",
        origen: 'Chillán',
        destino: 'Pinto'
    },
    {
        id: "3",
        origen: 'Pinto',
        destino: 'Chillán'
    },
    {
        id: "4",
        origen: 'Chillán',
        destino: 'San Carlos'
    },
    {
        id: "5",
        origen: 'Chillán',
        destino: 'San Carlos'
    },
]

const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.button, styles.bordes, style]}>
        <Text style={styles.texto}>{item.origen}</Text>
        <Text style={styles.texto}>-</Text>
        <Text style={styles.texto}>{item.destino}</Text>
    </TouchableOpacity>
)

function Bienvenida({ user }) {
    const [selectedId, setSelectedId] = useState(null)
    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#ff6901" : "#e84c22";
        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
                style={{ backgroundColor }}
            />
        )
    }
    return (
        <View style={[styles.container]}>
            <StatusBar backgroundColor="#ff6900"></StatusBar>
            {/* <LinearGradient
         colors={["#0033ff","#6bc1ff"]}
         style={{height:"20%"}}
         /> */}
            <View style={[styles.button, styles.bordes, { backgroundColor: 'white', zIndex: 1 }]}>
                <Text style={styles.texto2}>Bienvenido</Text>
                {
                    user.rol == 'empresa' ? (<Text style={styles.texto3}>Aqui tenemos tus recorridos publicados</Text>) : (<Text style={styles.texto3}>Aqui tenemos tus recorridos Guardados</Text>)
                }
            </View>
            <FlatList
                data={DATA}
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
    contenedor: {
        // flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        // height: screenHeight,
        // justifyContent: 'center',
        // marginTop: Constants.statusBarHeight,
    },
    texto: {
        fontSize: 25,
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

export default connect(mapStateToProps)(Bienvenida)
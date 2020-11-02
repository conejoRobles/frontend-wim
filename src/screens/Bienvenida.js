import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Constants from 'expo-constants'
import { connect } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient';
import empresas from '../store/reducers/empresas'

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

function Bienvenida({ user, empresas, navigation }) {
    const [selectedId, setSelectedId] = useState(null)
    const renderItem = ({ item }) => {
        const backgroundColor = "#e84c22";
        return (
            <Item
                item={item}
                onPress={() => {
                    setSelectedId(item.id)
                    navigation.navigate('AgregarRecorrido', {
                        isNew: false
                    })
                }}
                style={{ backgroundColor }}
            />
        )
    }
    return (
        <View style={[styles.container]}>
            <StatusBar backgroundColor="#ff6900"></StatusBar>
            <View style={[styles.button, styles.bordes, { backgroundColor: 'white', marginBottom: 0 }]}>
                <Text style={styles.texto2}>Bienvenido</Text>
                {
                    user.rol == 'empresa' ? (<Text style={styles.texto3}>Aqui tenemos tus recorridos publicados</Text>) : (<Text style={styles.texto3}>Aqui tenemos tus recorridos Guardados</Text>)
                }
            </View>

            <View style={{ alignContent: 'center', alignItems: 'center' }}>
                {user.rol == 'empresa' && <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('AgregarRecorrido', { user, isNew:true })
                    }}
                    style={[styles.button2]}>
                    <Text style={styles.texto4}>Agregar Recorrido</Text>
                </TouchableOpacity>}
            </View>

            {empresas.data.length > 0 ? (<FlatList
                data={empresas.data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
            />) : (
                    <Text style={[styles.texto4, { color: 'black', marginTop: '70%' }]}>Aún no has agregado recorridos</Text>
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
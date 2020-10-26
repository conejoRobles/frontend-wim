import { AppLoading } from 'expo'
import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, StatusBar } from 'react-native'
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio'
import { connect } from 'react-redux'


let DATA = [
    {
        id: "0",
        titulo: 'Bus en Mantención',
        descripcion: 'En bus se puso triste :C'
    },
    {
        id: "1",
        titulo: 'Bus Enfermito',
        descripcion: 'Al bus le duele la guatita'
    },
    {
        id: "2",
        titulo: 'Bus con su periodo',
        descripcion: 'Al bus le llego la regla y esta con colicos :c'
    },
    {
        id: "3",
        titulo: 'Bus con su periodo',
        descripcion: 'Al bus le llego la regla y esta con colicos :c'
    }
]

const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
        <Text style={styles.texto}>{item.titulo}</Text>
        <Text style={styles.texto3}>{item.descripcion}</Text>
    </TouchableOpacity>
)

function NoticiasXRecorridoPasajero({ navigation, route }) {
    const { noticias } = route.params
    const [selectedId, setSelectedId] = useState(null)
    const renderItem = ({ item }) => {
        // const backgroundColor = item.id === selectedId ? "#ff6901" : "#e84c22";
        return (
            <Item
                item={item}
                style={{ backgroundColor: '#e84c22' }}
            />
        )
    }
    return (
        <View style={[styles.container]}>
            <StatusBar backgroundColor="#e84c22"></StatusBar>
            <FlatList
                data={Object.values(noticias)}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    headerText: {
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
        // opacity: 0.3,
        // borderRadius: 50,
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        height: 45,
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

export default connect(mapStateToProps)(NoticiasXRecorridoPasajero)
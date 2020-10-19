import React, {useState} from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, StatusBar } from 'react-native'
import { Badge } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'
import Constants from 'expo-constants'

const DATA = [
    {
        id:"0",
        origen:'Chillán',
        destino: 'San Carlos'
    },
    {
        id:"1",
        origen:'San Carlos',
        destino: 'Chillán'
    },
    {
        id:"2",
        origen:'Chillán',
        destino: 'Pinto'
    },
    {
        id:"3",
        origen:'Pinto',
        destino: 'Chillán'
    },
    {
        id:"4",
        origen:'Chillán',
        destino: 'San Carlos'
    },
    {
        id:"5",
        origen:'Chillán',
        destino: 'San Carlos'
    },
    {
        id:"6",
        origen:'Chillán',
        destino: 'San Carlos'
    },
    {
        id:"7",
        origen:'Chillán',
        destino: 'San Carlos'
    },
    {
        id:"8",
        origen:'Chillán',
        destino: 'San Carlos'
    },
    {
        id:"9",
        origen:'Chillán',
        destino: 'San Carlos'
    },
]

// Crear componente *******************************************
const Item = ({item, onPress, style}) =>(
    <TouchableOpacity onPress = {onPress} style={[styles.button, style]}>
        <View style = {[styles.bordes, {flex: 1,flexDirection: 'row', height: 120, alignItems:'center'}]}>
            <View style= {{flex: 2}}>
                <View style = {styles.foto}>
                    <Text style = {styles.texto3}>T</Text>
                    <View style = {{width:'100%',height:'100%', zIndex: 0, position: 'absolute'}}>
                        <Badge size= {25} >5</Badge>
                    </View>
                </View>
            </View>
            <View style= {{flex: 5}}>
                <Text style = {styles.texto2}>Empresa Bonita</Text>
                <Text style = {styles.texto}>{item.origen} - {item.destino}</Text>
            </View>
        </View>
    </TouchableOpacity>
)

export default function NoticiaPasajero({navigation}) {
    const [selectedId,setSelectedId] = useState(null)
    const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? "#d5d5d5" : "#f1f1f1";
        return (
            <Item 
                item = {item}
                onPress = {() => {
                    navigation.navigate('NoticiasXRecorridoPasajero')
                    setSelectedId(item.id)}}
                style = {{backgroundColor}}
            />
        )
    }
    return (
    <View style={styles.container}>
        <StatusBar backgroundColor="#e84c22"></StatusBar>
        <FlatList 
            data = {DATA}
            renderItem = {renderItem}
            keyExtractor = {(item) => item.id}
            extraData = {selectedId}
        />
    </View>
    );
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
    bordes: {
        borderBottomWidth: 1.5,
        borderColor: 'black'
    },
    texto3: {
        // marginTop: -10,
        // backgroundColor: 'green',
        // flex: 1,
        fontSize: 40,
        fontWeight: 'bold',
        zIndex: 1,
    },
    foto : {
        backgroundColor: '#e84c22',
        borderRadius: 50,
        height: 70,
        maxHeight: 70,
        width: 70,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent:'center',
    }
});
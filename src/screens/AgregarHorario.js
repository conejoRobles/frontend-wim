import React, { useState } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, TextInput, FlatList } from 'react-native'
import { agregar } from '../store/actions/noticias'
import { back } from '../../env'
import uuid from 'uuid/v4'
import { LinearGradient } from 'expo-linear-gradient';

const Dias = [
    {
        id: "00",
        dia:"Lu",
        activo: false,
    },
    {
        id: "01",
        dia:"Ma",
        activo: false,
    },
    {
        id: "02",
        dia:"Mi",
        activo: false,
    },
    {
        id: "03",
        dia:"Ju",
        activo: false,
    },
    {
        id: "04",
        dia:"Vi",
        activo: true,
    },
    {
        id: "05",
        dia:"Sa",
        activo: false,
    },
    {
        id: "06",
        dia:"Do",
        activo: false,
    }
]
function precionado(){
    if (estado){
        setEstado(false)
    } 
    if (!estado){
        setEstado(true)
    } 
}

function AgregarRecorrido({ navigation, user }) {
    const [estado, setEstado] = useState(true);
    const color =  estado ? '#e84c22' : 'transparent'
    const color2 =  estado ? '#F79F46' : 'transparent'
    const color3 =  estado ? 'white' : 'black'
    // const []

    // const { recorrido, noticias } = route.params
    // const [noticia, setNoticia] = useState({
    //     id: uuid(),
    //     descripcion: '',
    //     titulo: '',
    //     fechaTermino: '',
    //     duracion: {
    //         cantidad: '1',
    //         unidad: '1'
    //     },
    //     fechaPublicacion: '',
    // })
    const renderItem = ({ item }) => {
        const [selectedId, setSelectedId] = useState(null)
        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.id)}

            />
        )
    }
    return (
        <View style={[styles.container]}>
            <StatusBar backgroundColor="#e84c22"></StatusBar>
            <View style={{flex:1, maxHeight: 100, flexDirection: "row", justifyContent:'center'}}>
                <View style={{flex:1, alignItems:'center'}}>
                    <Text style={styles.texto}>Salida:</Text>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            //value={noticia.titulo}
                            //onChangeText={text => setNoticia({ ...noticia, titulo: text })}
                        />
                    </View>
                </View>

                <View style={{flex:1, alignItems:'center'}}>
                    <Text style={styles.texto}>Llegada:</Text>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            //value={noticia.titulo}
                            //onChangeText={text => setNoticia({ ...noticia, titulo: text })}
                        />
                    </View>
                </View>
            </View>
            {/* 
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}}  colors={[color, color2]} style = {[styles.dias]}>
                <TouchableOpacity 
                style = {[styles.dias,{borderWidth: 1, borderColor:'#e84c22'}]}
                onPress={() => {
                    if (estado){
                        setEstado(false)
                    } 
                    if (!estado){
                        setEstado(true)
                    } 
                }}
                >
                    <Text style = {{color:color3, fontWeight:'bold', fontSize:20}}>Lu</Text>
                </TouchableOpacity>
            </LinearGradient> */}

            <FlatList
                horizontal = {true}
                data={Dias}
                renderItem={({item}) =>{
                return(
                    <View>
                        {item.activo ? (
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}}  colors={['#e84c22', '#F79F46']} style = {[styles.dias]}>
                            <TouchableOpacity style= {styles.dias} 
                            // onPress = {() => {
                            // }}
                            >
                                <Text style = {{color:'white', fontWeight:'bold'}}>{item.dia}</Text>
                            </TouchableOpacity>
                        </LinearGradient>) 
                        : (
                        <LinearGradient colors={['transparent', 'transparent']} style = {[styles.dias]}>
                            <TouchableOpacity style= {styles.dias}
                            // onPress = {() => {
                            // }}
                            >
                                <Text style = {{color:'#e84c22', fontWeight:'bold'}}>{item.dia}</Text>
                            </TouchableOpacity>
                        </LinearGradient> 
                        )}
                    </View>
                )}}
                keyExtractor={(item) => item.id}
                contentContainerStyle= {{flexGrow: 1, justifyContent: 'center'}}
                style = {{maxHeight: 50}}
            />


            <Text style={styles.texto}>Conductor:</Text>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            //value={noticia.titulo}
                            //onChangeText={text => setNoticia({ ...noticia, titulo: text })}
                        />
            </View>

            <Text style={styles.texto}>Patente:</Text>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            //value={noticia.titulo}
                            //onChangeText={text => setNoticia({ ...noticia, titulo: text })}
                        />
            </View>

            <View style={{flexDirection:"row"}}>
                <TouchableOpacity style={[styles.button , {backgroundColor: "#04254E"}]} 
                // onPress={() => { publicar(noticia, agregar, navigation, user, recorrido, noticias) }}
                >
                    <Text style={[styles.texto, { color: 'white' }]}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button]} 
                // onPress={() => { publicar(noticia, agregar, navigation, user, recorrido, noticias) }}
                >
                    <Text style={[styles.texto, { color: 'white' }]}>Publicar</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}


// const publicar = async (noticia, agregar, navigation, user, recorrido, noticias) => {
//     let hoy = new Date()
//     let termino = new Date()

//     if (noticia.duracion.unidad == "2") {
//         termino.setDate(hoy.getDate() + parseInt(noticia.duracion.cantidad))
//     } else if (noticia.duracion.unidad == "3") {
//         termino.setDate(hoy.getDate() + parseInt(noticia.duracion.cantidad) * 7)
//     } else if (noticia.duracion.unidad == "4") {
//         termino.setMonth(hoy.getMonth() + parseInt(noticia.duracion.cantidad))
//     } else if (noticia.duracion.unidad == "1") {
//         let addTime = parseInt(noticia.duracion.cantidad) * 3600;
//         termino.setSeconds(addTime)
//     }

//     let res = await fetch(back + 'addNoticia', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'Application/json',
//         },
//         body: JSON.stringify({
//             rut: user.rut,
//             recorrido,
//             id: noticia.id,
//             descripcion: noticia.descripcion,
//             titulo: noticia.titulo,
//             fechaTermino: termino.toString(),
//             duracion: noticia.duracion,
//             fechaPublicacion: hoy.toString(),
//         }),
//     })
//     noticia = { ...noticia, fechaTermino: termino.toString(), fechaPublicacion: hoy.toString() }
//     res = await res.json()
//     if (res.ok) {
//         await agregar(noticia, recorrido)
//         noticias.unshift(noticia)
//         Alert.alert(
//             "Genial!",
//             'Se ha agregado su noticia!',
//             [
//                 {
//                     text: "OK", onPress: () => navigation.navigate('NoticiasxRecorridoEmpresa', {
//                         recorrido,
//                         noticia
//                     })
//                 }
//             ],
//             { cancelable: false }
//         );
//     } else {
//         Alert.alert(
//             "Oh no! algo anda mal",
//             'No se ha podido agregar su noticia',
//             [
//                 { text: "Volver a intentar" }
//             ],
//             { cancelable: false }
//         );
//     }
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    button: {
        width:'40%',
        borderRadius: 10,
        height: 50,
        backgroundColor:'#e84c22',
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
        marginVertical: 15
    },
    button2: {
        backgroundColor: 'rgba(232,76,34,0.3)',
        alignItems: 'center',
        minWidth:'65%',
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        height: 35,
        paddingTop: 2,
        marginBottom: 20,
    },
    contenedor: {
        backgroundColor: 'white',
        alignItems: 'center',
    },
    texto:{
        marginTop: 10, 
        color:'#e84c22', 
        fontSize:25, 
        fontWeight: 'bold', 
        marginBottom:5
    },
    texto1: {
        fontSize:25,
        color:'black'
    },
    bordes: {
        borderWidth: 1,
        borderBottomWidth: 5,
        borderTopWidth: 0,
        borderColor: '#e84c22'
    },
    inputView: {
        width: "80%",
        borderRadius: 25,
        borderWidth: 1,
        borderBottomWidth: 3,
        height: 50,
        marginBottom: 10,
        borderColor:'#e84c22'
    },
    inputText: {
        fontSize: 20,
        color: "black",
        marginHorizontal: 10,
        marginVertical: 10,
        textAlignVertical: 'top'
    },
    texto4: {
        color: '#e84c22',
        textAlign: 'center',
        fontSize: 22,
    },
    texto2: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white'
    },
    dias: {
        borderRadius: 50,
        width:40,
        height: 40,
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

const mapDispatchToProps = dispatch => ({
    agregar: (item, recorrido) => dispatch(agregar(item, recorrido)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AgregarRecorrido)

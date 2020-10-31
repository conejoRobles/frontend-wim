import React, { useState } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, TextInput, FlatList } from 'react-native'
import { agregar } from '../store/actions/noticias'
import { back } from '../../env'
import uuid from 'uuid/v4'

const DATA = [
    {
        id: "0",
        nombre: 'General',
        precio: '2000'
    },
    {
        id: "1",
        nombre: 'Estudiante',
        precio: '1500'
    },
    {
        id: "2",
        nombre: 'Adulto Mayor',
        precio: '1000'
    },
]

const Item = ({ item, onPress, style }) => (
    <View>
        <Text style={styles.texto1}>{item.nombre}: ${item.precio}</Text>
    </View>
)

const renderItem = ({ item }) => {
    const [selectedId, setSelectedId] = useState(null)
    return (
        <Item
            item={item}
            // onPress={() => setSelectedId(item.id)}

        />
    )
}


function AgregarRecorrido({ navigation, user }) {
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

    return (
        <View style={[styles.container]}>
            <StatusBar backgroundColor="#e84c22"></StatusBar>
            <View style={{flex:1, maxHeight: 100, flexDirection: "row", justifyContent:'center'}}>
                <View style={{flex:1, alignItems:'center'}}>
                    <Text style={styles.texto}>Origen:</Text>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            //value={noticia.titulo}
                            //onChangeText={text => setNoticia({ ...noticia, titulo: text })}
                        />
                    </View>
                </View>

                <View style={{flex:1, alignItems:'center'}}>
                    <Text style={styles.texto}>Destino:</Text>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            //value={noticia.titulo}
                            //onChangeText={text => setNoticia({ ...noticia, titulo: text })}
                        />
                    </View>
                </View>
            </View>

            <TouchableOpacity style={[styles.button, styles.bordes]}>
                <Text style={styles.texto2}>Valor del Pasaje</Text>
            </TouchableOpacity>

            <View style= {{alignContent:'center', alignItems:'center'}}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('AgregarRecorrido',{user})
                    }}
                    style={[styles.button2]}>
                    <Text style={styles.texto4}>Agregar Precio</Text>
                </TouchableOpacity>
            </View>
            
            <View style = {{width:'90%', borderColor:'#e84c22', borderWidth: 1, borderRadius:20, height:380, alignItems:'center'}}>
                <FlatList
                data={DATA}
                renderItem={({item}) => 
                    <View>
                        <Text style={styles.texto1}>{item.nombre}: ${item.precio}</Text>
                    </View>
                }
                keyExtractor={(item) => item.id}
                // extraData={selectedId}
                style = {{width:'90%', padding:15}}
                />
            </View>

            <TouchableOpacity style={[styles.button]} 
            // onPress={() => { publicar(noticia, agregar, navigation, user, recorrido, noticias) }}
            >
                <Text style={[styles.texto, { color: 'white' }]}>Publicar</Text>
            </TouchableOpacity>

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
        width:'80%',
        borderRadius: 30,
        height: 50,
        backgroundColor:'#e84c22',
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
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
});

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = dispatch => ({
    agregar: (item, recorrido) => dispatch(agregar(item, recorrido)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AgregarRecorrido)

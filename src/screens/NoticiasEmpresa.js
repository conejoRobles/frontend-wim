import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'


const Item = ({ item, onPress, style }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
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
            <View style={{ flexDirection: "row", }}>
                {<View style={{ marginTop: '1%', marginRight: '2%' }}>
                    <FontAwesome5
                        name={'bell'}
                        solid
                        size={15}
                        color='white'
                    />
                </View>}
                <Text style={[styles.texto3, { fontSize: 15, color: 'white', }]}>Noticias: {item.cantidadNoticias} </Text>
            </View>

        </TouchableOpacity>
    )
}

function NoticiasEmpresa({ navigation, empresas }) {
    const [selectedId, setSelectedId] = useState(null)
    const renderItem = ({ item }) => {
        return (
            <Item
                item={item}
                onPress={() => {
                    setSelectedId(item.id)
                    navigation.navigate('Horarios', {
                        reco: item,
                        forNews: true
                    })
                }}
                style={{ backgroundColor: '#e84c22' }}
            />
        )
    }
    return (
        <View style={[styles.container]}>
            <StatusBar backgroundColor="#e84c22"></StatusBar>
            {empresas.data.length > 0 ? (<FlatList
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
    container: {
        flex: 1,
        // marginTop: Constants.statusBarHeight,
    },
    texto4: {
        color: '#e84c22',
        textAlign: 'center',
        fontSize: 20,
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

export default connect(mapStateToProps)(NoticiasEmpresa)
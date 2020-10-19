import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, TextInput } from 'react-native'
import { Picker } from '@react-native-community/picker'


export default function agregarNoticia({navigation}) {
    const [selectedValue, setSelectedValue] = useState("");
    const [selectedValue1, setSelectedValue1] = useState("");
    return (
    <View style={[styles.container]}>
        <StatusBar backgroundColor="#e84c22"></StatusBar>
        <Text style={[styles.texto, {marginTop: 20}]}>Titulo:</Text>
        <View style={styles.inputView}>
            <TextInput
                style={styles.inputText}
                // placeholder="Rut"
                // placeholderTextColor="grey"
                // onChangeText={text => setRut(text)}
            />
		</View>
        <Text style={styles.texto}>Descripción:</Text>
        <View style={[styles.inputView, {height: 300}]}>
            <TextInput
            multiline
            numberOfLines={13}
            maxLength={330}
                style={styles.inputText}
                // placeholder="Rut"
                // placeholderTextColor="grey"
                // onChangeText={text => setRut(text)}
            />
		</View>
        <Text style={styles.texto}>Duración:</Text>
        <View style = {{flex:1, flexDirection:'row',maxHeight:50, marginHorizontal:30}}>
            <View style={[styles.inputView, {flex:1, marginHorizontal:10}]}>
                <Picker style = {{width: '100%', color:'black'}}
                itemStyle = {{borderRadius:4, borderColor:'blue'}}
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                    <Picker.Item label='1' value="1"/>
                    <Picker.Item label='2' value="2"/>
                    <Picker.Item label='3' value="3"/>
                    <Picker.Item label='4' value="4"/>
                    <Picker.Item label='5' value="5"/>
                    <Picker.Item label='6' value="6"/>
                    <Picker.Item label='7' value="7"/>
                    <Picker.Item label='8' value="8"/>
                    <Picker.Item label='9' value="9"/>
                    <Picker.Item label='10' value="10"/>
                    <Picker.Item label='11' value="11"/>
                    <Picker.Item label='12' value="12"/>
                </Picker>
            </View>
            <View style={[styles.inputView, {flex:1, marginHorizontal:10}]}>
                <Picker style = {{width: '100%', color:'black'}}
                itemStyle = {{borderRadius:4, borderColor:'blue'}}
                selectedValue={selectedValue1}
                onValueChange={(itemValue, itemIndex) => setSelectedValue1(itemValue)}
                >
                    <Picker.Item label='Hora' value="1"/>
                    <Picker.Item label='Dia' value="2"/>
                    <Picker.Item label='Semana' value="3"/>
                    <Picker.Item label='Mes' value="4"/>
                </Picker>
            </View>
        </View>
        <TouchableOpacity  style={[styles.button]}>
            <Text style = {[styles.texto, {color:'white', marginBottom: 0}]}>Publicar</Text>
        </TouchableOpacity>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
    },
    button: {
		width: "65%",
		backgroundColor: "#e84c22",
		borderRadius: 10,
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 25,
        marginBottom: 10,
        alignContent:'center'
    },
    contenedor: {
        backgroundColor: 'white',
        alignItems: 'center',
    },
    texto: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10
    },
    bordes: {
        borderWidth: 1,
        borderBottomWidth: 5,
        borderTopWidth:0,
        borderColor: '#ff4b00'
    },
    inputView: {
		width: "80%",
		backgroundColor: "#f6f6f6",
        borderRadius: 25,
        borderWidth: 1,
        borderBottomWidth: 3,
		height: 50,
		marginBottom: 20,
	},
	inputText: {
		fontSize: 20,
        color: "black",
        marginHorizontal: 10,
        marginVertical: 10,
        textAlignVertical:'top'
	},
});


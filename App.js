// import React, { useState } from 'react';
// import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableHighlight } from 'react-native';
// import { createAppContainer, createSwitchNavigator } from 'react-navigation'
// import Home from './src/screens/Home';
// import Login from './src/screens/Login';
// import Registration from './src/screens/Registration';

// const AppNavigator = createSwitchNavigator({
//   HomeScreen: {
//     screen: Home,
//   },
//   LoginScreen: {
//     screen: Login
//   },
//   RegistrationScreen: {
//     screen: Registration
//   }
// }, {
//   initialRouteName: 'HomeScreen',
// })

// export default createAppContainer(AppNavigator)

import React from 'react'
import { StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './src/screens/Home'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Login from './src/screens/Login'
import PasajeroRegistration from './src/screens/PasajeroRegistration'
import EmpresaRegistration from './src/screens/EmpresaRegistration'
import PreRegistration from './src/screens/PreRegistration'
import Bienvenida from './src/screens/Bienvenida'
import Noticias from './src/screens/Noticias'
import Perfil from './src/screens/Perfil'
import { SafeAreaView } from 'react-native-safe-area-context'

function CustomHeader() {
  return (
    <View style = {styles.header}>
      <View style = {{flex: 1}}>
        <Icon name="bars" size= {30} style= {styles.icon}/>
      </View>
      <View style = {{flex: 2, backgroundColor: 'blue'}}>
      </View> 
      <View style = {{flex: 1, alignContent: 'flex-end', alignItems: 'flex-end',right: -10}}>
        <Icon name="info-circle" size= {30} style= {styles.icon}/>
      </View>
    </View>
  )
}

const AuthStack = createStackNavigator()
const NoticiaStack = createStackNavigator()
const BuscarStack = createStackNavigator()
const RutasStack = createStackNavigator()

function AuthStackScreen() {
  return (
    <AuthStack.Navigator 
    screenOptions = {{
      headerShown: false
    }}
    >
      <AuthStack.Screen name="Home" component={Home} />
      <AuthStack.Screen name="LoginScreen" component={Login} />
      <AuthStack.Screen name="PreRegistrationScreen" component={PreRegistration} />
      <AuthStack.Screen name="EmpresaRegistrationScreen" component={EmpresaRegistration} />
      <AuthStack.Screen name="PasajeroRegistrationScreen" component={PasajeroRegistration} />
      <AuthStack.Screen name="PrincipalDrawer" component={PrincipalDrawer} options={{headerShown:true}} />
    </AuthStack.Navigator>
  );
}

function NoticiaStackScreen(){
  return (
    <NoticiaStack.Navigator>
      <NoticiaStack.Screen name="Noticias" component={Noticias} />
      {/* <NoticiaStack.Screen name="NoticiasxEmpresa" component={Noticia} /> */}
    </NoticiaStack.Navigator>
  )
}


function BuscarStackScreen(){
  return (
    <BuscarStack.Navigator>
      <BuscarStack.Screen name="Buscar" component={Noticias} />
      {/* <NoticiaStack.Screen name="MostrarRecorrido" component={} /> */}
    </BuscarStack.Navigator>
  )
}

function RutasStackScreen(){
  return (
    <RutasStack.Navigator>
      <RutasStack.Screen name="Bienvenida" component={Bienvenida} />
    </RutasStack.Navigator>
  )
}

const Tab = createBottomTabNavigator();

function TabPasajero(){
  return (
    <Tab.Navigator
    initialRouteName="Bienvenida"
    tabBarOptions={{
      activeTintColor: '#ff6900',
      showLabel: false,
    }}
    >
      <Tab.Screen
        name="HomePage"
        component={BuscarStackScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5
              name = {'search'}
              color = {color}
              size = {35}
            />
          ),
        }} />
      <Tab.Screen
        name="Bienvenida"
        component={RutasStackScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5
              name= {'route'}
              size={35}
              color = {color}
            />
          ),
        }} />
        <Tab.Screen
        name="Noticia"
        component={NoticiaStackScreen}
        options={{
          tabBarBadge: 3,
          tabBarIcon: ({ color }) => (
            <FontAwesome5
              name= {'bell'}
              solid
              size={35}
              color = {color}
            />
          ),
        }} />
    </Tab.Navigator>
  )
}


const Drawer = createDrawerNavigator()

function PrincipalDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={TabPasajero} />
      <Drawer.Screen name="Profile" component={Perfil} />
    </Drawer.Navigator>
  )
}

function App() {
  
  return (
    <NavigationContainer>
      <AuthStackScreen></AuthStackScreen>
    </NavigationContainer>
  );
}
export default App;

const styles = StyleSheet.create({
  header: {
      width: '100%',
      height: 50,
      // flex: 1,
      flexDirection:'row',
      backgroundColor: '#ff6900',
      paddingLeft: 20,
      alignItems: 'center',
      // justifyContent: 'center',
  },
})

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
import { StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './src/screens/Home'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Login from './src/screens/Login'
import PasajeroRegistration from './src/screens/PasajeroRegistration'
import EmpresaRegistration from './src/screens/EmpresaRegistration'
import PreRegistration from './src/screens/PreRegistration'
import Bienvenida from './src/screens/Bienvenida'
import Noticias from './src/screens/Noticias'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'

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

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="LoginScreen" component={Login} />
      <HomeStack.Screen name="PreRegistrationScreen" component={PreRegistration} />
      <HomeStack.Screen name="EmpresaRegistrationScreen" component={EmpresaRegistration} />
      <HomeStack.Screen name="PasajeroRegistrationScreen" component={PasajeroRegistration} />
      <HomeStack.Screen name="TabPrincipal" component={TabPrincipal} />
    </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function TabPrincipal(){
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
        component={Bienvenida}
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
        component={Bienvenida}
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
        component={Noticias}
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

function App() {
  
  return (
    <NavigationContainer>
      <HomeStackScreen></HomeStackScreen>
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

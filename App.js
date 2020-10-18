import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './src/screens/Home'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { DrawerActions, NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Login from './src/screens/Login'
import PasajeroRegistration from './src/screens/PasajeroRegistration'
import EmpresaRegistration from './src/screens/EmpresaRegistration'
import PreRegistration from './src/screens/PreRegistration'
import Bienvenida from './src/screens/Bienvenida'
import Noticias from './src/screens/Noticias'
import Perfil from './src/screens/Perfil'
import { Provider, connect } from 'react-redux'
import store from './src/store/store'
import EditarCuenta from './src/screens/EditarCuenta'

const AuthStack = createStackNavigator()
const NoticiaStack = createStackNavigator()
const BuscarStack = createStackNavigator()
const RutasStack = createStackNavigator()
const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()


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




// function CustomHeader() {
//   return (
//     <View style = {styles.header}>
//       <View style = {{flex: 1}}>
//         <TouchableOpacity onPress= {() => navigation}>
//           <Icon name="bars" size= {30} style= {styles.icon}/>
//         </TouchableOpacity>
//       </View>
//       <View style = {{flex: 2}}>
//         {/* <Text>HOLA</Text> */}
//       </View> 
//       <View style = {{flex: 1, alignContent: 'flex-end', alignItems: 'flex-end', marginRight:15 }}>
//         <TouchableOpacity>
//           <Icon name="info-circle" size= {30} style= {styles.icon}/>
//         </TouchableOpacity>
//       </View>
//     </View>
//   )
// }

function leftButton({ navigation }) {

  return (
    <TouchableOpacity style={{ marginLeft: 20 }}
      onPress={() => navigation.toggleDrawer()}
    >
      <Icon name="bars" size={30} style={styles.icon} />
    </TouchableOpacity>
  )
}

function rightButton() {
  return (
    <TouchableOpacity>
      <Icon name="info-circle" size={30} style={styles.icon} />
    </TouchableOpacity>
  )
}

function AuthStackScreen({ navigation }) {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <AuthStack.Screen name="Home" component={Home} />
      <AuthStack.Screen name="LoginScreen" component={Login} />
      <AuthStack.Screen name="PreRegistrationScreen" component={PreRegistration} />
      <AuthStack.Screen name="EmpresaRegistrationScreen" component={EmpresaRegistration} />
      <AuthStack.Screen name="PasajeroRegistrationScreen" component={PasajeroRegistration} />
      <AuthStack.Screen name="EditarCuentaScreen" component={EditarCuenta} />
      <AuthStack.Screen name="PrincipalDrawer"
        component={PrincipalDrawer}
        options={({ navigation }) => ({
          headerShown: true,
          headerLeft: () => {
            return (
              <TouchableOpacity style={{ marginLeft: 20 }}
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              >
                <Icon name="bars" size={30} style={styles.icon} />
              </TouchableOpacity>
            )
          },
          headerStyle: { backgroundColor: '#ff6900' },
          headerTitleStyle: { color: 'white' },
          headerRight: rightButton

        })}
      />
    </AuthStack.Navigator>
  );
}

function NoticiaStackScreen() {
  return (
    <NoticiaStack.Navigator>
      <NoticiaStack.Screen name="Noticias" component={Noticias} />
      {/* <NoticiaStack.Screen name="NoticiasxEmpresa" component={Noticia} /> */}
    </NoticiaStack.Navigator>
  )
}


function BuscarStackScreen() {
  return (
    <BuscarStack.Navigator>
      <BuscarStack.Screen name="Buscar" component={Noticias} />
      {/* <NoticiaStack.Screen name="MostrarRecorrido" component={} /> */}
    </BuscarStack.Navigator>
  )
}

function RutasStackScreen() {
  return (
    <RutasStack.Navigator>
      <RutasStack.Screen name="Bienvenida" component={Bienvenida} />
    </RutasStack.Navigator>
  )
}

function TabPasajero() {
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
              name={'search'}
              color={color}
              size={35}
            />
          ),
        }} />
      <Tab.Screen
        name="Bienvenida"
        component={RutasStackScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5
              name={'route'}
              size={35}
              color={color}
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
              name={'bell'}
              solid
              size={35}
              color={color}
            />
          ),
        }} />
    </Tab.Navigator>
  )
}

function PrincipalDrawer() {
  return (
    <Drawer.Navigator
    // drawerContent={({navigation}) => (
    // <DrawerComponent navigation={navigation} />)}
    >
      <Drawer.Screen options={{}} name="Inicio" component={TabPasajero} />
      <Drawer.Screen options={{}} name="Cuenta" component={EditarCuenta} />

    </Drawer.Navigator>
  )
}


const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthStackScreen />
      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 50,
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ff6900',
    paddingLeft: 20,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  icon: {
    width: 50,
    color: 'white'
  },
})

export default App;
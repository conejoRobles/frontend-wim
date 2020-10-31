import React, { useState } from 'react'
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
import NoticiasPasajero from './src/screens/NoticiasPasajero'
import NoticiasXRecorridoEmpresa from './src/screens/NoticiasXRecorridoEmpresa'
import NoticiasXRecorridoPasajero from './src/screens/NoticiasXRecorridoPasajero'
import NoticiaEmpresa from './src/screens/NoticiasEmpresa'
import { LinearGradient } from 'expo-linear-gradient';

import { Provider, connect } from 'react-redux'
import store from './src/store/store'
import EditarCuenta from './src/screens/EditarCuenta'
import agregarNoticia from './src/screens/agregarNoticia'
import editarNoticia from './src/screens/editarNoticia'
import AgregarRecorrido from './src/screens/AgregarRecorrido'
import Horarios from './src/screens/Horarios'
import AgregarHorario from './src/screens/AgregarHorario'

const AuthStack = createStackNavigator()
const NoticiaStack = createStackNavigator()
const BuscarStack = createStackNavigator()
const RutasStack = createStackNavigator()
const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()


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

function header(){
  return (
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}}  colors={['#e84c22', '#F79F46']}>
    </LinearGradient>
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
          headerStyle: { backgroundColor: '#e84c22' },
          headerTitleStyle: { color: 'white' },
          headerRight: rightButton

        })}
      />
    </AuthStack.Navigator>
  )
}




function NoticiaPasajeroStackScreen() {
  return (
    <NoticiaStack.Navigator>
      <NoticiaStack.Screen name="Noticias" component={NoticiasPasajero} />
      <NoticiaStack.Screen name="NoticiasXRecorridoPasajero" component={NoticiasXRecorridoPasajero} />
    </NoticiaStack.Navigator>
  )
}

function NoticiaEmpresaStackScreen() {
  return (
    <NoticiaStack.Navigator>
      <NoticiaStack.Screen name="Noticias" component={NoticiaEmpresa} />
      <NoticiaStack.Screen name="AgregarNoticias" component={agregarNoticia} />
      <NoticiaStack.Screen name="EditarNoticia" component={editarNoticia} />
      <NoticiaStack.Screen name="NoticiasxRecorridoEmpresa" component={NoticiasXRecorridoEmpresa} />
    </NoticiaStack.Navigator>
  )
}


function BuscarStackScreen() {
  return (
    <BuscarStack.Navigator>
      <BuscarStack.Screen name="Buscar" component={NoticiasPasajero} />
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

function RutasStackScreenEmpresa() {
  return (
    <RutasStack.Navigator>
      <RutasStack.Screen name="Bienvenida" component={Bienvenida} />
      <RutasStack.Screen name="AgregarRecorrido" component={AgregarRecorrido} />
      <RutasStack.Screen name="Horarios" component={Horarios} />
      <RutasStack.Screen name="AgregarHorario" component={AgregarHorario} />
    </RutasStack.Navigator>
  )
}

function TabPasajero() {
  return (
    <Tab.Navigator
      initialRouteName="Bienvenida"
      tabBarOptions={{
        activeTintColor: '#e84c22',
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
        name="NoticiaPasajero"
        component={NoticiaPasajeroStackScreen}
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

function TabEmpresa() {
  return (
    <Tab.Navigator
      initialRouteName="Bienvenida"
      tabBarOptions={{
        activeTintColor: '#e84c22',
        showLabel: false,
      }}
    >
      <Tab.Screen
        name="Bienvenida"
        component={RutasStackScreenEmpresa}
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
        name="NoticiaEmpresa"
        component={NoticiaEmpresaStackScreen}
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

function PrincipalDrawer({ route, navigation }) {
  const { rol } = route.params
  return (
    <Drawer.Navigator>
      { rol == 'empresa' ? (
        <Drawer.Screen options={{}} name="Inicio" component={TabEmpresa} />
      ) : (
          <Drawer.Screen options={{}} name="Inicio" component={TabPasajero} />
        )
      }
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
    backgroundColor: '#e84c22',
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
import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, LogBox } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack'
import Home from './src/screens/Home'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { DrawerActions, NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator, DrawerContent } from '@react-navigation/drawer'
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
import { Provider, connect, useSelector } from 'react-redux'
import store from './src/store/store'
import EditarCuenta from './src/screens/EditarCuenta'
import agregarNoticia from './src/screens/agregarNoticia'
import editarNoticia from './src/screens/editarNoticia'
import AgregarRecorrido from './src/screens/AgregarRecorrido'
import Horarios from './src/screens/Horarios'
import AgregarHorario from './src/screens/AgregarHorario'
import buscarRecorrido from './src/screens/buscarRecorrido'
import infoRecorrido from './src/screens/infoRecorrido'
import Help from './src/screens/help'
import FavXRecorridos from './src/screens/FavXRecorridos'


const AuthStack = createStackNavigator()
const NoticiaStack = createStackNavigator()
const BuscarStack = createStackNavigator()
const RutasStack = createStackNavigator()
const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'value provided is not in a recognized RFC2822 or ISO format',
  'Already read',
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.',
  '_reactNative.NativeModules.RNDatePickerAndroid.dismiss is not a function.',
  '_reactNative.NativeModules.RNDatePickerAndroid.dismiss()',
  '_reactNative.NativeModules.RNDatePickerAndroid.dismiss'


]);
let noticias = 0
const getTotalNoticias = () => {
  return noticias
}
const setTotalNoticias = (value) => {
  noticias = value
  return noticias
}
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
    <TouchableOpacity style={{ marginLeft: 20 }}
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
    >
      <Icon name="question-circle" size={30} style={styles.icon} />
    </TouchableOpacity>
  )
}

function header() {
  return (
    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#e84c22', '#F79F46']}>
    </LinearGradient>
  )
}

function AuthStackScreen({ navigation, horarios }) {
  const [title, setTitle] = useState('')
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
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
          title: '',
          headerLeft: () => {
            return (
              <TouchableOpacity style={{ marginLeft: 20 }}
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              >
                <Icon name="bars" size={30} style={styles.icon} />
              </TouchableOpacity>
            )
          },
          number: 5,
          headerStyle: { backgroundColor: '#e84c22' },
          headerTitleStyle: { color: 'white' },
          headerRight: () => {
            return (
              <TouchableOpacity style={{ marginLeft: 20 }}
                onPress={() => {
                  navigation.navigate('Ayuda')
                }}
              >
                <Icon name="question-circle" size={30} style={styles.icon} />
              </TouchableOpacity>
            )
          }
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
      <NoticiaStack.Screen name="NoticiasxRecorridoEmpresa" component={NoticiasXRecorridoEmpresa} />
      <RutasStack.Screen name="Horarios" component={Horarios} />
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
      <RutasStack.Screen name="Horarios" component={Horarios} />
    </NoticiaStack.Navigator>
  )
}


function BuscarStackScreen() {
  return (
    <BuscarStack.Navigator>
      <NoticiaStack.Screen name="BuscarRecorrido" component={buscarRecorrido} />
      <NoticiaStack.Screen name="InfoRecorrido" component={infoRecorrido} />
    </BuscarStack.Navigator>
  )
}

function RutasStackScreen() {
  return (
    <RutasStack.Navigator>
      <RutasStack.Screen name="Bienvenida" component={Bienvenida} />
      <RutasStack.Screen name="FavXRecorridos" component={FavXRecorridos} />
      <NoticiaStack.Screen name="InfoRecorrido" component={infoRecorrido} />
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

function TabPasajero({ navigation, route }) {


  let cant2 = getTotalNoticias()

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
      {cant2 > 0 ? (<Tab.Screen
        name="NoticiaPasajero"
        component={NoticiaPasajeroStackScreen}
        options={{
          tabBarBadge: cant2,
          tabBarIcon: ({ color }) => (
            <FontAwesome5
              name={'bell'}
              solid
              size={35}
              color={color}
            />
          ),
        }} />) : (<Tab.Screen
          name="NoticiaPasajero"
          component={NoticiaPasajeroStackScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome5
                name={'bell'}
                solid
                size={35}
                color={color}
              />
            ),
          }} />)}
    </Tab.Navigator>
  )
}

function TabEmpresa() {
  let cant2 = getTotalNoticias()
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
          tabBarBadge: cant2,
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
  const { rol, cantNoticias } = route.params
  const user = useSelector(state => state.user)
  let cantiNoticias = 0
  if (user.rol == 'pasajero') {
    let data = useSelector(state => state.horarios.data)
    data.map(item => {
      if (item.Horarios != null && item.Horarios != undefined) {
        item.Horarios.map(x => {
          if (x.Noticias != null && x.Noticias != undefined) {
            cantiNoticias += Object.values(x.Noticias).length
          }
        })
      }
    })
    setTotalNoticias(cantiNoticias)
  } else {
    let recorridos = useSelector(state => state.empresas.data)
    recorridos.map(x => {
      if (x.Horarios != null && x.Horarios != undefined) {
        Object.values(x.Horarios).map(y => {
          if (y.Noticias != undefined && y.Noticias != null) {
            cantiNoticias += Object.values(y.Noticias).length

          }
        })
      }
    })
    setTotalNoticias(cantiNoticias)
  }

  return (
    <Drawer.Navigator drawerContentOptions={{
      activeTintColor: 'white',
      activeBackgroundColor: '#e84c22',
      inactiveTintColor: '#04254E',
      inactiveBackgroundColor: 'white',
      labelStyle: {
        marginLeft: 5,
      }
    }}>
      { rol == 'empresa' ? (
        <Drawer.Screen options={{}} name="Inicio" component={TabEmpresa} />
      ) : (
          <Drawer.Screen options={{}} name="Inicio" component={TabPasajero} />
        )
      }
      <Drawer.Screen options={{}} name="Cuenta" component={EditarCuenta} />
      <Drawer.Screen options={{}} name="Ayuda" component={Help} />
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

const mapStateToProps = state => {
  return state
}

connect(mapStateToProps)(PrincipalDrawer)
export default App;
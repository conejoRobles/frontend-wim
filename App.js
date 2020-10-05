import React, { useState } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import PasajeroRegistration from './src/screens/PasajeroRegistration';
import EmpresaRegistration from './src/screens/EmpresaRegistration';
import PreRegistration from './src/screens/PreRegistration';

const AppNavigator = createSwitchNavigator({
  HomeScreen: {
    screen: Home
  },
  LoginScreen: {
    screen: Login
  },
  PasajeroRegistrationScreen: {
    screen: PasajeroRegistration
  },
  EmpresaRegistrationScreen: {
    screen: EmpresaRegistration
  },
  PreRegistrationScreen: {
    screen: PreRegistration
  }
}, {
  initialRouteName: 'HomeScreen',
})

export default createAppContainer(AppNavigator)


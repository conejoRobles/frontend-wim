import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableHighlight } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Registration from './src/screens/Registration';

const AppNavigator = createSwitchNavigator({
  HomeScreen: {
    screen: Home,
  },
  LoginScreen: {
    screen: Login
  },
  RegistrationScreen: {
    screen: Registration
  }
}, {
  initialRouteName: 'HomeScreen',
})

export default createAppContainer(AppNavigator)


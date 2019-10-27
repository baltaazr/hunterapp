import SigninScreen from './src/screens/SigninScreen'
import SignupScreen from './src/screens/SignupScreen'
import AccountScreen from './src/screens/AccountScreen'
import CameraScreen from './src/screens/CameraScreen'
import HuntListScreen from './src/screens/HuntListScreen'
import FormScreen from './src/screens/FormScreen'
import HuntDetailScreen from './src/screens/HuntDetailScreen'
import { Provider as AuthProvider } from './src/context/AuthContext'
import { Provider as HuntProvider } from './src/context/HuntContext'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import React from 'react'

const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen
  }),
  mainFlow: createBottomTabNavigator({
    HuntRecordFlow: createStackNavigator({
      Camera: CameraScreen,
      Form: FormScreen
    }),
    HuntListFlow: createStackNavigator({
      HuntList: HuntListScreen,
      HuntDetail: HuntDetailScreen
    }),
    Account: AccountScreen
  })
})

const App = createAppContainer(switchNavigator)

export default () => (
  <HuntProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </HuntProvider>
)

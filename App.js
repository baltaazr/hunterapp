import {
  AccountScreen,
  CameraScreen,
  FormScreen,
  HuntDetailScreen,
  HuntListScreen,
  SigninScreen,
  SignupScreen
} from './src/screens'
import { AuthProvider, HuntProvider } from './src/context'

import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

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

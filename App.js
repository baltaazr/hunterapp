import {
  AccountScreen,
  CameraScreen,
  FormScreen,
  HuntDetailScreen,
  HuntListScreen,
  ResolveAuthScreen,
  SigninScreen,
  SignupScreen
} from './src/screens'
import { AuthProvider, HuntProvider, PictureProvider } from './src/context'
import { setNavigator } from './src/utils'

import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen
  }),
  mainFlow: createMaterialTopTabNavigator(
    {
      HuntListFlow: createStackNavigator({
        HuntList: HuntListScreen,
        HuntDetail: HuntDetailScreen
      }),
      HuntRecordFlow: createStackNavigator({
        Camera: CameraScreen,
        Form: FormScreen
      }),
      Account: AccountScreen
    },
    {
      animationEnabled: true,
      tabBarOptions: {
        showLabel: false,
        showIcon: false,
        style: { height: 0 }
      }
    }
  )
})

const App = createAppContainer(switchNavigator)

export default () => (
  <PictureProvider>
    <HuntProvider>
      <AuthProvider>
        <App
          ref={navigator => {
            setNavigator(navigator)
          }}
        />
      </AuthProvider>
    </HuntProvider>
  </PictureProvider>
)

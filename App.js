import {
  CameraScreen,
  FormScreen,
  HuntDetailScreen,
  HuntListScreen,
  ResolveAuthScreen,
  SigninScreen,
  SignupScreen,
  SaveListScreen
} from './src/screens'
import { Drawer } from './src/components'
import {
  AuthProvider,
  HuntProvider,
  PictureProvider,
  UserProvider,
  SaveProvider
} from './src/context'
import { setNavigator } from './src/utils'

import { DRAWER_WIDTH } from 'config'
import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer'

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen
  }),
  mainFlow: createMaterialTopTabNavigator(
    {
      SaveList: SaveListScreen,
      HuntRecordFlow: createStackNavigator(
        {
          DrawerFlow: createDrawerNavigator(
            {
              Camera: CameraScreen
            },
            {
              contentComponent: Drawer,
              drawerWidth: DRAWER_WIDTH,
              drawerBackgroundColor: 'transparent'
            }
          ),
          Form: FormScreen
        },
        {
          headerMode: 'none',
          navigationOptions: ({ navigation }) => {
            const { routeName } = navigation.state.routes[
              navigation.state.index
            ]

            if (routeName === 'Form') return { swipeEnabled: false }
            return { swipeEnabled: true }
          }
        }
      ),
      HuntListFlow: createStackNavigator({
        HuntList: HuntListScreen,
        HuntDetail: HuntDetailScreen
      })
    },
    {
      animationEnabled: true,
      tabBarOptions: {
        showLabel: false,
        showIcon: false,
        style: { height: 0 }
      },
      swipeEnabled: true
    }
  )
})

const App = createAppContainer(switchNavigator)

export default () => (
  <SaveProvider>
    <UserProvider>
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
    </UserProvider>
  </SaveProvider>
)

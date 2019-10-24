import HomeScreen from './src/screens/HomeScreen'
import ListScreen from './src/screens/ListScreen'

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    List: ListScreen
  },
  {
    initialRouteName: 'List',
    defaultNavigationOptions: {
      title: 'App'
    }
  }
)

export default createAppContainer(navigator)

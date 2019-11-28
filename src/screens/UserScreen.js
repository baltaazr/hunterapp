import Spacer from '../components/utils/Spacer'
import { AuthContext } from '../context'

import React, { useContext } from 'react'
import { Text } from 'react-native'
import { Button } from 'react-native-elements'
import { SafeAreaView } from 'react-navigation'
import { FontAwesome } from '@expo/vector-icons'

const UserScreen = () => {
  const { signout } = useContext(AuthContext)

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Text style={{ fontSize: 48 }}>UserScreen</Text>
      <Spacer>
        <Button title="Sign Out" onPress={signout} />
      </Spacer>
    </SafeAreaView>
  )
}

UserScreen.navigationOptions = {
  title: 'Account',
  tabBarIcon: <FontAwesome name="gear" size={20} />
}

export default UserScreen

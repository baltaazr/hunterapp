import { UserContext, AuthContext } from '../context'

import React, { useContext } from 'react'
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Platform,
  StatusBar,
  Button
} from 'react-native'

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
  }
})

const Drawer = () => {
  const {
    state: { name }
  } = useContext(UserContext)
  const { signout } = useContext(AuthContext)

  return (
    <ScrollView>
      <SafeAreaView
        style={styles.safeArea}
        forceInset={{ top: 'always', horizontal: 'never' }}
      >
        <Text>{name}</Text>
        <Button title="Sign Out" onPress={signout} />
      </SafeAreaView>
    </ScrollView>
  )
}

export default Drawer

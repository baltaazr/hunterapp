import { UserContext, AuthContext } from '../context'

import React, { useContext } from 'react'
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Platform,
  StatusBar,
  TouchableOpacity
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(125, 57, 58, 0.7)'
    // opacity: 0
  },
  userInfo: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: { color: 'white', fontSize: 20 },
  buttons: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50
  }
})

const Drawer = () => {
  const {
    state: { name }
  } = useContext(UserContext)
  const { signout } = useContext(AuthContext)

  return (
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <View style={styles.userInfo}>
        <FontAwesome name="user" size={60} color="white" />
        <Text style={styles.text}>{name}</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={signout}>
          <View>
            <Text style={styles.text}>登出</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Drawer

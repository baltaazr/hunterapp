import Spacer from './Spacer'

import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { withNavigation } from 'react-navigation'

const styles = StyleSheet.create({
  link: {
    color: 'blue'
  }
})

const NavLink = ({ navigation, text, routeName }) => (
  <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
    <Spacer>
      <Text style={styles.link}>{text}</Text>
    </Spacer>
  </TouchableOpacity>
)

export default withNavigation(NavLink)

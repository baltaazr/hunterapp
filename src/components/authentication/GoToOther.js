import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { withNavigation } from 'react-navigation'

const styles = StyleSheet.create({
  wrapper: {},
  link: {
    color: 'gray',
    fontSize: 20,
    width: '100%',
    textAlign: 'center',
    marginBottom: 20
  }
})

const NavLink = ({ navigation, text, routeName }) => (
  <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
    <View style={styles.wrapper}>
      <Text style={styles.link}>{text}</Text>
    </View>
  </TouchableOpacity>
)

export default withNavigation(NavLink)

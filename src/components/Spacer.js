import React from 'react'
import { View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  spacer: {
    margin: 15
  }
})

const Spacer = ({ children }) => <View style={styles.spacer}>{children}</View>

export default Spacer

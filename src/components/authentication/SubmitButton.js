import React from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native'

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 15,
    width: '80%'
  },
  text: {}
})

const SubmitButton = ({ title }) => (
  <TouchableOpacity style={styles.wrapper}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
)

export default SubmitButton

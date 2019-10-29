import React from 'react'
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native'

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 21,
    width: 350,
    height: 42,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 30
  },
  text: {
    color: 'purple',
    textAlignVertical: 'center',
    fontSize: 25
  },
  iconWrapper: {
    marginLeft: 25
  }
})

const SubmitButton = ({ title, icon, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.wrapper}>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.iconWrapper}>{icon}</View>
    </View>
  </TouchableOpacity>
)

export default SubmitButton

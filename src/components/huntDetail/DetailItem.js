import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // backgroundColor: 'gray',
    margin: 5
  },
  questionWrapper: {
    flex: 1
  },
  question: {
    // color: 'white',
    fontSize: 25,
    fontWeight: '400',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  pickerWrapper: {
    flex: 2
  }
})

const FormItem = ({ question, value }) => (
  <View style={styles.container}>
    <View style={styles.questionWrapper}>
      <Text style={styles.question}>{question}</Text>
    </View>
    <View style={styles.pickerWrapper}>
      <Text style={styles.question}>{value}</Text>
    </View>
  </View>
)

export default FormItem

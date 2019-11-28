import { PictureContext } from '../../context'

import React, { useContext } from 'react'
import { View, StyleSheet, Text, TextInput } from 'react-native'

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
  inputWrapper: {
    flex: 2
  }
})

const FormInput = ({ question, responses, index, changeForm }) => {
  const {
    state: { formInfo }
  } = useContext(PictureContext)

  return (
    <View style={styles.container}>
      <View style={styles.questionWrapper}>
        <Text style={styles.question}>{question}</Text>
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          value={formInfo[index]}
          onChangeText={newVal => {
            changeForm(index, newVal)
          }}
          keyboardType={responses}
        />
      </View>
    </View>
  )
}

export default FormInput

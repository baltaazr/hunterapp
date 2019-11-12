import { PictureContext } from '../../context'

import React, { useContext } from 'react'
import { View, StyleSheet, Text, Picker } from 'react-native'

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

const FormItem = ({ question, responses, index }) => {
  const {
    state: { formInfo },
    setFormInfo
  } = useContext(PictureContext)

  return (
    <View style={styles.container}>
      <View style={styles.questionWrapper}>
        <Text style={styles.question}>{question}</Text>
      </View>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={formInfo[index]}
          onValueChange={value => setFormInfo({ index, value })}
        >
          {responses.map(item => (
            <Picker.Item
              label={item.label}
              value={item.value}
              key={item.value}
            />
          ))}
        </Picker>
      </View>
    </View>
  )
}

export default FormItem

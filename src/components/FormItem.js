import { PictureContext } from '../context'

import React, { useContext } from 'react'
import { View, StyleSheet, Text, Picker } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1
  },
  child: {
    flex: 1
  }
})

const FormItem = ({ question, responses, index }) => {
  const {
    state: { formInfo },
    setFormInfo
  } = useContext(PictureContext)

  return (
    <View style={styles.container}>
      <View style={styles.child}>
        <Text>{question}</Text>
      </View>
      <View style={styles.child}>
        <Picker
          selectedValue={formInfo[index] ? formInfo[index] : responses[0].value}
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

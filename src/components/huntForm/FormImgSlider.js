/* eslint-disable no-unused-expressions */
import { PictureContext } from '../../context'

import React, { useContext } from 'react'
import { View, StyleSheet, Image, Button, Text } from 'react-native'

const styles = StyleSheet.create({
  container: { height: 300 },
  img: { height: 200 }
})

const FormImgSlider = ({ question, responses, index }) => {
  const {
    state: { formInfo },
    setFormInfo
  } = useContext(PictureContext)

  const response = responses.find(res => res.value === formInfo[index])
  const responseIndex = responses.indexOf(response)

  return (
    <View style={styles.container}>
      <Text>{question}</Text>
      <Image style={styles.img} source={response.img} />
      <Button
        title="Next"
        onPress={() => {
          responseIndex === responses.length - 1
            ? setFormInfo({ index, value: responses[0].value })
            : setFormInfo({ index, value: responses[responseIndex + 1].value })
        }}
      />
      <Button
        title="Prev"
        onPress={() => {
          responseIndex === 0
            ? setFormInfo({
                index,
                value: responses[responses.length - 1].value
              })
            : setFormInfo({ index, value: responses[responseIndex - 1].value })
        }}
      />
    </View>
  )
}

export default FormImgSlider

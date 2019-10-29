/* eslint-disable no-underscore-dangle */
import { HuntContext } from '../context'

import React, { useContext } from 'react';
import { StyleSheet, Text, Image, FlatList } from 'react-native';
import { FORM_ITEMS } from 'config'

const styles = StyleSheet.create({
  question: {
    fontWeight: 'bold'
  }
})

const HuntDetailScreen = ({ navigation }) => {
  const { state } = useContext(HuntContext)

  const _id = navigation.getParam('_id')

  const hunt = state.find(t => t._id === _id)

  const base64Icon = `data:image/png;base64,${hunt.picture}`

  return (
    <>
      {/* <Image source={{ uri: base64Icon }} /> */}
      <FlatList
        data={hunt.formInfo}
        renderItem={({ item, index }) => (
          <>
            <Text style={styles.question}>{`${FORM_ITEMS[index].question}: `}</Text>
            <Text>{item}</Text>
          </>
        )}
        keyExtractor={item => item.question}
      />
    </>
  )
}

export default HuntDetailScreen

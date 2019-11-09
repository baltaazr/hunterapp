/* eslint-disable no-unused-vars */
import { HuntContext } from '../context'

import LZString from 'lz-string'
import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, Image, FlatList } from 'react-native'
import { FORM_ITEMS } from 'config'

const styles = StyleSheet.create({
  question: {
    fontWeight: 'bold'
  },
  background: { width: '50%', height: '50%' }
})

const HuntDetailScreen = ({ navigation }) => {
  console.log('load')
  const { state } = useContext(HuntContext)
  const _id = navigation.getParam('_id')

  const hunt = state.find(t => t._id === _id)

  const [picture, setPicture] = useState('')

  useEffect(() => {
    console.log(hunt.picture.length)
    const string = LZString.decompressFromUTF16(hunt.picture)
    console.log(string.length)
    setPicture(string)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Image
        source={{ uri: `data:image/png;base64,${picture}` }}
        style={styles.background}
      />
      <FlatList
        data={hunt.formInfo}
        keyExtractor={item => item}
        renderItem={({ item, index }) => (
          <>
            <Text style={styles.question}>
              {`${FORM_ITEMS[index].question}: `}
            </Text>
            <Text>{item}</Text>
          </>
        )}
      />
    </>
  )
}

export default HuntDetailScreen

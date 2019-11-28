import { SaveContext } from '../context'

import React, { useContext } from 'react'
import { StyleSheet, Text, FlatList, Image } from 'react-native'

const styles = StyleSheet.create({
  img: { height: 200 }
})

const SaveList = () => {
  const {
    state: { saveList }
  } = useContext(SaveContext)

  return (
    <>
      <Text>SAVELIST SCREEN</Text>
      <FlatList
        data={saveList}
        renderItem={({ item }) => (
          <Image
            source={{ uri: `data:image/png;base64,${item.picture}` }}
            style={styles.img}
          />
        )}
        keyExtractor={item => item.date.toString()}
      />
    </>
  )
}

export default SaveList

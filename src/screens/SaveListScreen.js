import { SaveContext } from '../context'
import { useActivateSave } from '../hooks'

import React, { useContext } from 'react'
import {
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native'

const styles = StyleSheet.create({
  img: { height: 200 }
})

const SaveList = () => {
  const {
    state: { saveList }
  } = useContext(SaveContext)

  const [activateSave] = useActivateSave()

  return (
    <>
      <Text>SAVELIST SCREEN</Text>
      <FlatList
        data={saveList}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              activateSave(index)
            }}
          >
            <Image
              source={{ uri: `data:image/png;base64,${item.picture}` }}
              style={styles.img}
            />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.date.toString()}
      />
    </>
  )
}

export default SaveList

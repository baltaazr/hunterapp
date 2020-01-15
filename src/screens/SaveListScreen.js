import { SaveContext, PictureContext } from '../context'

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

const SaveList = ({ navigation }) => {
  const { setPictureData } = useContext(PictureContext)

  const {
    state: { saveList },
    setActiveSave
  } = useContext(SaveContext)

  const activateSave = idx => {
    setPictureData(saveList[idx])
    setActiveSave(idx)
    navigation.navigate('Camera')
  }

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

import { SaveContext, PictureContext } from '../context'
import { navigate } from '../utils'

import { useContext } from 'react'
import shorthash from 'shorthash'
import * as FileSystem from 'expo-file-system'

export default () => {
  const {
    state: { uri, picture, date, location, weather, formInfo },
    reset
  } = useContext(PictureContext)

  const {
    state: { saveList },
    setSaves
  } = useContext(SaveContext)

  const addSave = async () => {
    const name = shorthash.unique(uri)
    const path = `${FileSystem.documentDirectory}${name}`
    await FileSystem.moveAsync({ from: uri, to: path })
    const newSaveList = [
      ...saveList,
      { uri: path, picture, date, location, weather, formInfo }
    ]
    await setSaves(newSaveList)
    reset()
    navigate('Camera')
  }

  return [addSave]
}

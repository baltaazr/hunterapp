import { SaveContext, PictureContext } from '../context'

import { useContext } from 'react'
import * as FileSystem from 'expo-file-system'

export default () => {
  const {
    state: { uri }
  } = useContext(PictureContext)

  const {
    state: { saveList, idxActive },
    setSaves,
    setActiveSave
  } = useContext(SaveContext)

  const deleteSave = async () => {
    const newSaveList = saveList.filter((el, i) => idxActive !== i)
    setSaves(newSaveList)
    await FileSystem.deleteAsync(uri)
    setActiveSave(-1)
  }

  return [deleteSave]
}

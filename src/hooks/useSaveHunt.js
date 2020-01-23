import { HuntContext, PictureContext, SaveContext } from '../context'
import { navigate } from '../utils/navigationRef'

import { useContext } from 'react'
import * as FileSystem from 'expo-file-system'

export default () => {
  const { createHunt } = useContext(HuntContext)
  const {
    state: { uri, picture, date, location, weather, formInfo },
    reset,
    setLoading
  } = useContext(PictureContext)
  const {
    state: { saveList, idxActive },
    setSaves,
    setActiveSave
  } = useContext(SaveContext)

  const saveHunt = async () => {
    setLoading(true)
    if (idxActive !== -1) {
      const newSaveList = saveList.filter((el, i) => idxActive !== i)
      setSaves(newSaveList)
      await FileSystem.deleteAsync(uri)
      setActiveSave(-1)
    }
    await createHunt(picture, date, location, weather, formInfo)
    navigate('Camera')
    reset()
  }

  return [saveHunt]
}

import { SaveContext, PictureContext } from '../context'
import { navigate } from '../utils'

import { useContext } from 'react'

export default () => {
  const {
    state: { picture, date, location, weather, formInfo },
    reset
  } = useContext(PictureContext)
  const {
    state: { saveList },
    setSaves
  } = useContext(SaveContext)
  const addSave = async () => {
    const newSaveList = [
      ...saveList,
      { picture, date, location, weather, formInfo }
    ]
    await setSaves(newSaveList)
    reset()
    navigate('Camera')
  }

  return [addSave]
}

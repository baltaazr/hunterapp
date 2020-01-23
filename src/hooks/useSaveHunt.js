import { HuntContext, PictureContext, SaveContext } from '../context'
import { navigate } from '../utils/navigationRef'

import { useDeleteSave } from '.'
import { useContext } from 'react'

export default () => {
  const [deleteSave] = useDeleteSave()
  const { createHunt } = useContext(HuntContext)
  const {
    state: { picture, date, location, weather, formInfo },
    reset,
    setLoading
  } = useContext(PictureContext)
  const {
    state: { idxActive }
  } = useContext(SaveContext)

  const saveHunt = async () => {
    setLoading(true)
    if (idxActive !== -1) {
      deleteSave()
    }
    await createHunt(picture, date, location, weather, formInfo)
    navigate('Camera')
    reset()
  }

  return [saveHunt]
}

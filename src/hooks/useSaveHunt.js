import { HuntContext, PictureContext } from '../context'
import { navigate } from '../utils/navigationRef'

import { useContext } from 'react'

export default () => {
  const { createHunt } = useContext(HuntContext)
  const {
    state: { picture, formInfo },
    reset
  } = useContext(PictureContext)

  const saveHunt = async () => {
    await createHunt(picture, formInfo)
    reset()
    navigate('HuntList')
  }

  return [saveHunt]
}
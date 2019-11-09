import { HuntContext, PictureContext } from '../context'
import { navigate } from '../utils/navigationRef'

import LZString from 'lz-string'
import { useContext } from 'react'

export default () => {
  const { createHunt } = useContext(HuntContext)
  const {
    state: { picture, location, formInfo },
    reset
  } = useContext(PictureContext)

  const saveHunt = async () => {
    await createHunt(
      LZString.compressToUTF16(picture.base64),
      location,
      formInfo
    )
    reset()
    navigate('HuntList')
  }

  return [saveHunt]
}

import { HuntContext, PictureContext } from '../context'
import { navigate } from '../utils/navigationRef'

import LZString from 'lz-string'
import { useContext } from 'react'

export default () => {
  const { createHunt, fetchHunts } = useContext(HuntContext)
  const {
    state: { picture, date, location, weather, formInfo },
    reset,
    setLoading
  } = useContext(PictureContext)

  const saveHunt = async () => {
    setLoading(true)
    await createHunt(
      LZString.compressToUTF16(picture.base64),
      date,
      location,
      weather,
      formInfo
    )
    reset()
    await fetchHunts()
    navigate('HuntList')
    setLoading(false)
  }

  return [saveHunt]
}

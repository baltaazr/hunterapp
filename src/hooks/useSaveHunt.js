import { HuntContext, PictureContext } from '../context'
import { navigate } from '../utils/navigationRef'

import { useContext } from 'react'

export default () => {
  const {
    state: { loading },
    createHunt,
    fetchHunts
  } = useContext(HuntContext)
  const {
    state: { picture, date, location, weather, formInfo },
    reset,
    setLoading
  } = useContext(PictureContext)

  const saveHunt = async () => {
    setLoading(true)
    await createHunt(picture, date, location, weather, formInfo)
    navigate('Camera')
    reset()
    if (!loading) {
      await fetchHunts()
    }
  }

  return [saveHunt]
}

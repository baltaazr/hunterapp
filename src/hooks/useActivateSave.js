import { SaveContext, PictureContext } from '../context'
import { navigate } from '../utils'

import { useContext } from 'react'

export default () => {
  const { setPictureData } = useContext(PictureContext)

  const {
    state: { saveList },
    setActiveSave
  } = useContext(SaveContext)

  const activateSave = idx => {
    setPictureData(saveList[idx])
    setActiveSave(idx)
    navigate('Camera')
  }

  return [activateSave]
}

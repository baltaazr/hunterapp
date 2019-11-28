import createDataContext from './createDataContext'

import LZString from 'lz-string'
import { AsyncStorage } from 'react-native'

const saveReducer = (state, action) => {
  switch (action.type) {
    case 'set_saves':
      return { ...state, saveList: action.payload }
    default:
      return state
  }
}

const fetchSaves = dispatch => async () => {
  const compressedSaves = JSON.parse(await AsyncStorage.getItem('saves'))
  if (compressedSaves) {
    const saves = compressedSaves.map(save => ({
      ...save,
      picture: LZString.decompress(save.picture)
    }))
    dispatch({ type: 'set_saves', payload: saves })
  }
}

const setSaves = dispatch => async saves => {
  const compressedSaves = saves.map(save => ({
    ...save,
    picture: LZString.compress(save.picture)
  }))
  await AsyncStorage.setItem('saves', JSON.stringify(compressedSaves))
  dispatch({ type: 'set_saves', payload: saves })
}

export const { Provider, Context } = createDataContext(
  saveReducer,
  { fetchSaves, setSaves },
  { saveList: [], idxActive: -1 }
)

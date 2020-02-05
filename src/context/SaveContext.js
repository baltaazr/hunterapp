import createDataContext from './createDataContext'

import * as FileSystem from 'expo-file-system'
import { AsyncStorage } from 'react-native'

const saveReducer = (state, action) => {
  switch (action.type) {
    case 'set_saves':
      return { ...state, saveList: action.payload }
    case 'set_active_save':
      return { ...state, idxActive: action.payload }
    default:
      return state
  }
}

const fetchSaves = dispatch => async () => {
  const savesInfo = JSON.parse(await AsyncStorage.getItem('saves'))
  if (savesInfo) {
    const saves = []
    for (let i = 0; i < savesInfo.length; i++) {
      const save = savesInfo[i]
      try {
        saves.push({
          ...save,
          // eslint-disable-next-line no-await-in-loop
          picture: await FileSystem.readAsStringAsync(save.uri, {
            encoding: FileSystem.EncodingType.Base64
          })
        })
      } catch (error) {
        console.log(error)
      }
    }
    dispatch({ type: 'set_saves', payload: saves })
  }
}

const setSaves = dispatch => async saves => {
  const savesInfo = saves.map(save => ({
    ...save,
    picture: null
  }))
  await AsyncStorage.setItem('saves', JSON.stringify(savesInfo))
  dispatch({ type: 'set_saves', payload: saves })
}

const setActiveSave = dispatch => idx => {
  dispatch({ type: 'set_active_save', payload: idx })
}

export const { Provider, Context } = createDataContext(
  saveReducer,
  { fetchSaves, setSaves, setActiveSave },
  { saveList: [], idxActive: -1 }
)

import createDataContext from './createDataContext'

import { AsyncStorage } from 'react-native'

const saveReducer = (state, action) => {
  switch (action.type) {
    case 'set_saves':
      return { ...state, savesList: action.payload }
    default:
      return state
  }
}

const fetchSaves = dispatch => async () => {
  const saves = await AsyncStorage.getItem('saves')
  if (saves) {
    dispatch({ type: 'set_saves', payload: saves })
  }
}

const setSaves = dispatch => async saves => {
  await AsyncStorage.setItem('saves', saves)
  dispatch({ type: 'set_saves', payload: saves })
}

// state contains list of hunts
export const { Provider, Context } = createDataContext(
  saveReducer,
  { fetchSaves, setSaves },
  { savesList: null, idxActive: -1 }
)

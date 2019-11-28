import { hunterApi } from '../api'

import createDataContext from './createDataContext'

import LZString from 'lz-string'

const huntReducer = (state, action) => {
  switch (action.type) {
    case 'fetch_hunts':
      return action.payload
    default:
      return state
  }
}

const fetchHunts = dispatch => async () => {
  const { data: compressedHunts } = await hunterApi.get('/hunts')
  const hunts = compressedHunts.map(hunt => ({
    ...hunt,
    picture: LZString.decompressFromUTF16(hunt.picture)
  }))
  dispatch({ type: 'fetch_hunts', payload: hunts })
}
// eslint-disable-next-line no-unused-vars
const createHunt = dispatch => async (
  picture,
  date,
  location,
  weather,
  formInfo
) => {
  await hunterApi.post('/hunts', { picture, date, location, weather, formInfo })
}

export const { Provider, Context } = createDataContext(
  huntReducer,
  { fetchHunts, createHunt },
  []
)

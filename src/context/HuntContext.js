import { hunterApi } from '../api'

import createDataContext from './createDataContext'

const huntReducer = (state, action) => {
  switch (action.type) {
    case 'fetch_hunts':
      return action.payload
    default:
      return state
  }
}

const fetchHunts = dispatch => async () => {
  const response = await hunterApi.get('/hunts')
  dispatch({ type: 'fetch_hunts', payload: response.data })
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

// state contains list of hunts
export const { Provider, Context } = createDataContext(
  huntReducer,
  { fetchHunts, createHunt },
  []
)

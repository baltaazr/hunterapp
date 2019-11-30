import { hunterApi } from '../api'

import createDataContext from './createDataContext'

const huntReducer = (state, action) => {
  switch (action.type) {
    case 'fetch_hunts':
      return { hunts: action.payload, loading: false }
    case 'set_loading':
      return { ...state, loading: true }
    default:
      return state
  }
}

const fetchHunts = dispatch => async () => {
  dispatch({ type: 'set_loading', payload: true })
  const { data: hunts } = await hunterApi.get('/hunts')
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
  { hunts: [], loading: false }
)

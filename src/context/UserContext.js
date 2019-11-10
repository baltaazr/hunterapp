import { hunterApi } from '../api'

import createDataContext from './createDataContext'

const userReducer = (state, action) => {
  switch (action.type) {
    case 'fetch_user_data':
      return action.payload
    default:
      return state
  }
}

const fetchUserData = dispatch => async () => {
  const response = await hunterApi.get('/user')
  dispatch({ type: 'fetch_user_data', payload: response.data })
}

export const { Provider, Context } = createDataContext(
  userReducer,
  {
    fetchUserData
  },
  { name: null, email: null }
)

import createDataContext from './createDataContext'

import { FORM_ITEMS } from 'config'

const defaultFormInfo = FORM_ITEMS.map(item => item.responses[0].value)

const pictureReducer = (state, action) => {
  switch (action.type) {
    case 'reset':
      return {
        picture: null,
        location: null,
        weather: null,
        formInfo: defaultFormInfo
      }
    case 'set_picture_data':
      return { ...action.payload, formInfo: defaultFormInfo }
    case 'set_form_info':
      // eslint-disable-next-line no-case-declarations
      const newFormInfo = [...state.formInfo]
      newFormInfo[action.payload.index] = action.payload.value
      return { ...state, formInfo: newFormInfo }
    case 'set_loading':
      return { ...state, loading: action.payload }
    default:
      return state
  }
}

const reset = dispatch => () => {
  dispatch({ type: 'reset' })
}

const setPictureData = dispatch => pictureData => {
  dispatch({ type: 'set_picture_data', payload: pictureData })
}

const setFormInfo = dispatch => formInfo => {
  dispatch({ type: 'set_form_info', payload: formInfo })
}

const setLoading = dispatch => loading => {
  dispatch({ type: 'set_loading', payload: loading })
}

// state contains list of hunts
export const { Provider, Context } = createDataContext(
  pictureReducer,
  { reset, setPictureData, setFormInfo, setLoading },
  {
    picture: null,
    location: null,
    weather: null,
    formInfo: defaultFormInfo,
    loading: false
  }
)

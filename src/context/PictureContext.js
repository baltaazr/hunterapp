import createDataContext from './createDataContext'

import { FORM_ITEMS } from 'config'

const pictureReducer = (state, action) => {
  switch (action.type) {
    case 'reset':
      return {
        picture: null,
        formInfo: FORM_ITEMS.map(item => item.responses[0].value)
      }
    case 'set_picture':
      return { ...state, picture: action.payload }
    case 'set_location':
      return { ...state, location: action.payload }
    case 'set_form_info':
      // eslint-disable-next-line no-case-declarations
      const newFormInfo = [...state.formInfo]
      newFormInfo[action.payload.index] = action.payload.value
      return { ...state, formInfo: newFormInfo }
    default:
      return state
  }
}

const reset = dispatch => () => {
  dispatch({ type: 'reset' })
}

const setPicture = dispatch => picture => {
  dispatch({ type: 'set_picture', payload: picture })
}

const setLocation = dispatch => location => {
  dispatch({ type: 'set_location', payload: location })
}

const setFormInfo = dispatch => formInfo => {
  dispatch({ type: 'set_form_info', payload: formInfo })
}

// state contains list of hunts
export const { Provider, Context } = createDataContext(
  pictureReducer,
  { reset, setPicture, setLocation, setFormInfo },
  {
    picture: null,
    location: null,
    formInfo: FORM_ITEMS.map(item => item.responses[0].value)
  }
)

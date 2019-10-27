import createDataContext from './createDataContext'

const huntReducer = (state, action) => {
  switch (action.type) {
    default:
      return state
  }
}

// state contains list of hunts
export const { Provider, Context } = createDataContext(huntReducer, {}, [])

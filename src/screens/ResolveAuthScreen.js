import { Context as AuthContext } from '../context/AuthContext'

import { useEffect, useContext } from 'react'

const ResolveAuthScreen = () => {
  const { tryLocalSignin } = useContext(AuthContext)

  useEffect(() => {
    tryLocalSignin()
  }, [tryLocalSignin])

  return null
}

export default ResolveAuthScreen

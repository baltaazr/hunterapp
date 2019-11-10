import { AuthContext, UserContext } from '../context'

import { useEffect, useContext } from 'react'

const ResolveAuthScreen = () => {
  const { tryLocalSignin } = useContext(AuthContext)
  const { fetchUserData } = useContext(UserContext)

  useEffect(() => {
    const signIn = async () => {
      await tryLocalSignin()
      await fetchUserData()
    }
    signIn()
  }, [])

  return null
}

export default ResolveAuthScreen

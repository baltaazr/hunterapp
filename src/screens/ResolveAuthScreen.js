import { AuthContext, UserContext, HuntContext } from '../context'

import { useEffect, useContext } from 'react'

const ResolveAuthScreen = () => {
  const { tryLocalSignin } = useContext(AuthContext)
  const { fetchUserData } = useContext(UserContext)
  const { fetchHunts } = useContext(HuntContext)

  useEffect(() => {
    const signIn = async () => {
      await tryLocalSignin()
      await fetchUserData()
      await fetchHunts()
    }
    signIn()
  }, [])

  return null
}

export default ResolveAuthScreen

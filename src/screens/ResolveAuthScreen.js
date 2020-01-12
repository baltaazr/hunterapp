import { AuthContext, UserContext, HuntContext, SaveContext } from '../context'

import { useEffect, useContext } from 'react'

const ResolveAuthScreen = () => {
  const { tryLocalSignin } = useContext(AuthContext)
  const { fetchUserData } = useContext(UserContext)
  const { fetchHunts } = useContext(HuntContext)
  const { fetchSaves } = useContext(SaveContext)

  useEffect(() => {
    const signIn = async () => {
      await tryLocalSignin()
      await fetchUserData()
      await fetchSaves()
      await fetchHunts()
    }
    signIn()
  }, [])

  return null
}

export default ResolveAuthScreen

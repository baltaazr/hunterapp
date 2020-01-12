import { useState, useEffect } from 'react'
import * as Permissions from 'expo-permissions'

export default () => {
  const [perm, setPerm] = useState(null)
  useEffect(() => {
    const askForPerimissions = async () => {
      const cameraPermission = await Permissions.askAsync(Permissions.CAMERA)
      const locationPerimission = await Permissions.askAsync(
        Permissions.LOCATION
      )
      const cameraRollPermission = await Permissions.askAsync(
        Permissions.CAMERA_ROLL
      )
      if (
        cameraPermission.status === 'granted' &&
        locationPerimission.status === 'granted' &&
        cameraRollPermission.status === 'granted'
      ) {
        setPerm('granted')
      } else {
        setPerm('denied')
      }
    }

    try {
      askForPerimissions()
    } catch (err) {
      setPerm('denied')
    }
  }, [])

  return [perm]
}

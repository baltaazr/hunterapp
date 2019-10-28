/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import * as Permissions from 'expo-permissions'
import { Camera } from 'expo-camera'

const styles = StyleSheet.create({ container: { flex: 1 } })

const CameraScreen = () => {
  const [perm, setPerm] = useState(null)
  useEffect(() => {
    const askCameraPermission = async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA)
      setPerm(status)
    }
    try {
      askCameraPermission()
    } catch (err) {
      setPerm('denied')
    }
  }, [])

  return (
    <View style={styles.container}>
      {perm === 'granted' ? (
        <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row'
            }}
          />
        </Camera>
      ) : perm === 'denied' ? (
        <Text>Please grant camera access</Text>
      ) : null}
    </View>
  )
}

export default CameraScreen

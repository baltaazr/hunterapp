/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, Button, Image } from 'react-native'
import * as Permissions from 'expo-permissions'
import { Camera } from 'expo-camera'
import { NavigationEvents } from 'react-navigation'

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  picture: { flex: 1 }
})

let camera

const CameraScreen = () => {
  const [perm, setPerm] = useState(null)
  const [focus, setFocus] = useState(true)
  const [picture, setPicture] = useState(null)

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

  const snap = async () => {
    if (camera) {
      const pic = await camera.takePictureAsync()
      setPicture(pic)
    }
  }

  return (
    <View style={styles.container}>
      <NavigationEvents
        onWillBlur={() => {
          setFocus(false)
        }}
        onWillFocus={() => {
          setFocus(true)
        }}
      />
      {picture ? (
        <>
          <Image source={{ uri: picture.uri }} style={styles.picture} />
          <Button title="Proceed" />
        </>
      ) : perm === 'granted' && focus ? (
        <Camera
          style={styles.camera}
          ref={ref => {
            camera = ref
          }}
        >
          <Button
            title="Take Picture"
            onPress={() => {
              snap()
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

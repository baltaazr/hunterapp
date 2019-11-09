/* eslint-disable react-hooks/exhaustive-deps */
import { PictureContext } from '../context'

import React, { useState, useEffect, useContext } from 'react'
import {
  TouchableOpacity,
  Dimensions,
  View,
  StyleSheet,
  Text,
  Button,
  Image
} from 'react-native'
import * as Permissions from 'expo-permissions'
import { Camera } from 'expo-camera'
import { NavigationEvents } from 'react-navigation'

const takePicButtonWidth = Dimensions.get('window').width * 0.15
const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  picture: { flex: 1 },
  cameraTopComponents: { flex: 2 },
  cameraMidComponents: { flex: 6 },
  cameraBottomComponents: {
    flex: 2,
    flexDirection: 'row'
  },
  cameraBottomLeftComponents: {
    flex: 4
  },
  cameraBottomMidComponents: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  cameraBottomRightComponents: {
    flex: 4
  },
  takePicture: {
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height
      ) / 2,
    width: takePicButtonWidth,
    height: takePicButtonWidth,
    borderColor: 'white',
    borderWidth: 4,
    backgroundColor: 'transparent',
    marginBottom: 20
  }
})

let camera

const CameraScreen = ({ navigation }) => {
  const [perm, setPerm] = useState(null)
  const [focus, setFocus] = useState(true)
  const {
    state: { picture },
    setPicture
  } = useContext(PictureContext)

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
    const pic = await camera.takePictureAsync({ base64: true })
    setPicture(pic)
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
          <Button
            title="Delete Image"
            onPress={() => {
              setPicture(null)
            }}
          />
          <Button
            title="Proceed"
            onPress={() => {
              navigation.navigate('Form')
            }}
          />
        </>
      ) : perm === 'granted' && focus ? (
        <Camera
          style={styles.camera}
          ref={ref => {
            camera = ref
          }}
        >
          <View style={styles.cameraTopComponents} />
          <View style={styles.cameraMidComponents} />
          <View style={styles.cameraBottomComponents}>
            <View style={styles.cameraBottomLeftComponents} />
            <View style={styles.cameraBottomMidComponents}>
              <TouchableOpacity onPress={snap}>
                <View style={styles.takePicture} />
              </TouchableOpacity>
            </View>
            <View style={styles.cameraBottomRightComponents} />
          </View>
        </Camera>
      ) : perm === 'denied' ? (
        <Text>Please grant camera access</Text>
      ) : null}
    </View>
  )
}

CameraScreen.navigationOptions = {
  header: null
}

export default CameraScreen

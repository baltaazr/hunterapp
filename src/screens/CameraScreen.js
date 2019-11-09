/* eslint-disable react-hooks/exhaustive-deps */
import { PictureContext } from '../context'
import { weatherApi } from '../api'

import { weatherApiKey } from 'config'
import React, { useState, useEffect, useContext } from 'react'
import {
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Platform,
  View,
  StyleSheet,
  Text,
  StatusBar,
  ImageBackground
} from 'react-native'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import { Camera } from 'expo-camera'
import { NavigationEvents } from 'react-navigation'
import { Ionicons, Entypo } from '@expo/vector-icons'

const takePicButtonWidth = Dimensions.get('window').width * 0.15
const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { width: '100%', height: '100%' },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
  },
  camera: { flex: 1 },
  picture: { flex: 1 },
  pictureComponentsWrapper: {
    flexDirection: 'column'
  },
  cameraTopComponents: { flex: 2, flexDirection: 'row' },
  cameraTopLeftComponents: { flex: 2 },
  cameraTopMidComponents: {
    flex: 6,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  cameraTopRightComponents: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center'
  },
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
  pictureTopElements: {
    flex: 8,
    flexDirection: 'row'
  },
  pictureTopRightComponents: {
    flex: 5
  },
  pictureTopLeftComponents: {
    flex: 5,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 20
  },
  pictureBottomElements: {
    flex: 2,
    flexDirection: 'row'
  },
  pictureBottomRightComponents: {
    flex: 5,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: 20
  },
  pictureBottomLeftComponents: {
    flex: 5
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
  },
  deleteImage: { alignSelf: 'flex-start' },
  continueImage: {
    alignSelf: 'flex-end'
  }
})

let camera

const CameraScreen = ({ navigation }) => {
  const [perm, setPerm] = useState(null)
  const [focus, setFocus] = useState(true)
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)
  const {
    state: { picture },
    setPictureData,
    reset
  } = useContext(PictureContext)

  useEffect(() => {
    const askForPerimissions = async () => {
      const cameraPermission = await Permissions.askAsync(Permissions.CAMERA)
      const locationPerimission = await Permissions.askAsync(
        Permissions.LOCATION
      )
      if (
        cameraPermission.status === 'granted' &&
        locationPerimission.status === 'granted'
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

  const snap = async () => {
    const pic = await camera.takePictureAsync({ base64: true })
    const location = await Location.getCurrentPositionAsync({})
    const { data } = await weatherApi.get(
      '/locations/v1/cities/geoposition/search',
      {
        params: {
          apikey: weatherApiKey,
          q: `${location.coords.latitude},${location.coords.longitude}`
        }
      }
    )
    const weather = await weatherApi.get(`/currentconditions/v1/${data.Key}`, {
      params: {
        apikey: weatherApiKey,
        details: true
      }
    })
    const weatherObj = weather.data[0]
    setPictureData({
      picture: pic,
      location,
      weather: {
        temperature: weatherObj.Temperature.Metric.Value,
        text: weatherObj.WeatherText,
        humidity: weatherObj.RelativeHumidity
      }
    })
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
        <ImageBackground
          source={{ uri: picture.uri }}
          style={styles.background}
        >
          <SafeAreaView
            style={{ ...styles.safeArea, ...styles.pictureComponentsWrapper }}
          >
            <View style={styles.pictureTopElements}>
              <View style={styles.pictureTopLeftComponents}>
                <TouchableOpacity
                  style={styles.deleteImage}
                  onPress={() => reset()}
                >
                  <Entypo name="cross" color="white" size={40} />
                </TouchableOpacity>
              </View>
              <View style={styles.pictureTopRightComponents} />
            </View>
            <View style={styles.pictureBottomElements}>
              <View style={styles.pictureBottomLeftComponents} />
              <View style={styles.pictureBottomRightComponents}>
                <TouchableOpacity
                  style={styles.continueImage}
                  onPress={() => {
                    navigation.navigate('Form')
                  }}
                >
                  <Ionicons name="md-send" color="cyan" size={40} />
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </ImageBackground>
      ) : perm === 'granted' && focus ? (
        <Camera
          style={styles.camera}
          ref={ref => {
            camera = ref
          }}
          type={cameraType}
        >
          <SafeAreaView style={styles.safeArea} forceInset={{ top: 'always' }}>
            <View style={styles.cameraTopComponents}>
              <View style={styles.cameraTopLeftComponents} />
              <View style={styles.cameraTopMidComponents} />
              <View style={styles.cameraTopRightComponents}>
                <TouchableOpacity
                  onPress={() => {
                    setCameraType(
                      cameraType === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    )
                  }}
                >
                  <Ionicons name="ios-reverse-camera" size={48} color="white" />
                </TouchableOpacity>
              </View>
            </View>
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
          </SafeAreaView>
        </Camera>
      ) : perm === 'denied' ? (
        <Text>Please grant camera and location access</Text>
      ) : null}
    </View>
  )
}

CameraScreen.navigationOptions = {
  header: null
}

export default CameraScreen

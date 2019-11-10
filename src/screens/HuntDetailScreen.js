/* eslint-disable no-unused-vars */
import { HuntContext } from '../context'

import LZString from 'lz-string'
import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, Image, FlatList } from 'react-native'
import { FORM_ITEMS } from 'config'
import MapView, { Marker } from 'react-native-maps'

const styles = StyleSheet.create({
  question: {
    fontWeight: 'bold'
  },
  img: { height: 200 },
  map: {
    height: 200
  }
})

const HuntDetailScreen = ({ navigation }) => {
  const { state } = useContext(HuntContext)
  const _id = navigation.getParam('_id')

  const hunt = state.find(t => t._id === _id)

  const initialCoords = hunt.location.coords

  const [picture, setPicture] = useState('')

  useEffect(() => {
    setPicture(LZString.decompressFromUTF16(hunt.picture))
  }, [])

  return (
    <>
      <Image
        source={{ uri: `data:image/png;base64,${picture}` }}
        style={styles.img}
      />
      <MapView
        initialRegion={{
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
          ...initialCoords
        }}
        style={styles.map}
      >
        <Marker coordinate={{ ...initialCoords }} />
      </MapView>
      <Text>{`Weather: ${hunt.weather.text}, ${hunt.weather.temperature}°C, Humidity: ${hunt.weather.humidity}`}</Text>
      <FlatList
        data={hunt.formInfo}
        keyExtractor={item => item}
        renderItem={({ item, index }) => (
          <>
            <Text style={styles.question}>
              {`${FORM_ITEMS[index].question}: `}
            </Text>
            <Text>{item}</Text>
          </>
        )}
      />
    </>
  )
}

export default HuntDetailScreen

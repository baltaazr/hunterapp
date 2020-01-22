/* eslint-disable no-unused-vars */
import { HuntContext } from '../context'
import { DetailItem } from '../components'

import React, { useContext, useRef } from 'react'
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
  Animated,
  Platform,
  StatusBar,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native'
import { FORM_ITEMS } from 'config'
import MapView, { Marker } from 'react-native-maps'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const MIN_IMAGE_HEIGHT = 100
const MAX_IMAGE_HEIGHT = 250

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
  },
  innerContainer: {
    flex: 1,
    color: 'white',
    backgroundColor: '#efefef'
  },
  imageWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    alignItems: 'center',
    zIndex: 1
  },
  image: {
    width: '100%',
    height: '100%'
  },
  imgWrapper: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center'
  },
  img: {
    width: WIDTH * 0.5,
    height: HEIGHT * 0.5,
    borderWidth: 5,
    borderColor: '#DFDFDF'
  },
  map: {
    width: WIDTH * 0.8,
    height: HEIGHT * 0.5,
    borderWidth: 5,
    borderColor: '#DFDFDF'
  },
  listContainer: {
    flex: 1,
    // width: '100%',
    flexDirection: 'column'
    // alignItems: 'center'
    // justifyContent: 'center'
    // alignItems: 'center'
  },
  title: {
    position: 'absolute',
    // top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 50,
    color: 'white'
  }
})

const HuntDetailScreen = ({ navigation }) => {
  const {
    state: { hunts }
  } = useContext(HuntContext)

  const scrollY = useRef(new Animated.Value(0)).current

  const headerHeight = scrollY.interpolate({
    inputRange: [0, MAX_IMAGE_HEIGHT - MIN_IMAGE_HEIGHT],
    outputRange: [MAX_IMAGE_HEIGHT, MIN_IMAGE_HEIGHT],
    extrapolate: 'clamp'
  })

  const contentMarginTop = scrollY.interpolate({
    inputRange: [0, MAX_IMAGE_HEIGHT - MIN_IMAGE_HEIGHT],
    outputRange: [MAX_IMAGE_HEIGHT, MAX_IMAGE_HEIGHT],
    extrapolate: 'clamp'
  })

  const _id = navigation.getParam('_id')

  const hunt = hunts.find(t => t._id === _id)

  const initialCoords = hunt.location.coords

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Animated.View style={{ ...styles.imageWrapper, height: headerHeight }}>
        <Image
          style={styles.image}
          // eslint-disable-next-line global-require
          source={require('../../assets/something_background.png')}
        />
        <View style={styles.title}>
          <Text style={styles.titleText}>獵物</Text>
        </View>
      </Animated.View>
      <ScrollView
        style={styles.innerContainer}
        scrollEventThrottle={16}
        onScroll={Animated.event([
          {
            nativeEvent: { contentOffset: { y: scrollY } }
          }
        ])}
      >
        <Animated.View
          style={{
            flex: 1,
            paddingTop: contentMarginTop,
            paddingBottom: 20,
            // alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 30
          }}
        >
          <View style={styles.imgWrapper}>
            <MapView
              initialRegion={{
                longitudeDelta: 0.01,
                latitudeDelta: 0.01,
                ...initialCoords
              }}
              style={styles.map}
            />
          </View>
          <View style={styles.imgWrapper}>
            <Image
              source={{ uri: `data:image/png;base64,${hunt.picture}` }}
              style={styles.img}
            />
          </View>
          <FlatList
            data={hunt.formInfo}
            keyExtractor={item => item}
            renderItem={({ item, index }) => {
              let value = ''

              if (Array.isArray(FORM_ITEMS[index].responses)) {
                value =
                  FORM_ITEMS[index].responses[
                    FORM_ITEMS[index].responses.map(e => e.value).indexOf(item)
                  ].label
              } else {
                value = item
              }
              return (
                <DetailItem
                  question={FORM_ITEMS[index].question}
                  value={value}
                />
              )
            }}
          />
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default HuntDetailScreen

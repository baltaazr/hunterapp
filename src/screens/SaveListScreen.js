import { SaveContext, PictureContext } from '../context'

import React, { useContext, useRef } from 'react'
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
  Platform,
  StatusBar,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native'

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
const SaveList = ({ navigation }) => {
  const { setPictureData, setFormInfo } = useContext(PictureContext)

  const {
    state: { saveList },
    setActiveSave
  } = useContext(SaveContext)

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

  const activateSave = idx => {
    setPictureData(saveList[idx])
    setFormInfo(saveList[idx].formInfo)
    setActiveSave(idx)
    navigation.navigate('Camera')
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Animated.View style={{ ...styles.imageWrapper, height: headerHeight }}>
        <Image
          style={styles.image}
          // eslint-disable-next-line global-require
          source={require('../../assets/something_background.png')}
        />
        <View style={styles.title}>
          <Text style={styles.titleText}>資料下載</Text>
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
          <FlatList
            data={saveList}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  activateSave(index)
                }}
              >
                <View style={styles.imgWrapper}>
                  <Image
                    source={{ uri: `data:image/png;base64,${item.picture}` }}
                    style={styles.img}
                  />
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.date.toString()}
          />
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default SaveList

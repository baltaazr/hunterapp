import { FormItem, FormImgSlider, FormInput } from '../components'
import { useSaveHunt } from '../hooks'
import { PictureContext } from '../context'

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
  ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native'
import { FORM_ITEMS } from 'config'
import { AntDesign } from '@expo/vector-icons'

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
  },
  loadingScreen: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  submitButton: {
    backgroundColor: 'transparent'
  },
  submitButtonContentWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 10
  },
  submitText: {
    color: 'black',
    textAlign: 'right',
    marginRight: 5,
    fontSize: 25
  }
})

const FormScreen = () => {
  const [saveHunt] = useSaveHunt()
  const {
    state: { picture, loading, formInfo },
    setFormInfo
  } = useContext(PictureContext)
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

  const newFormInfo = [...formInfo]

  const changeForm = (idx, val) => {
    newFormInfo[idx] = val
    setFormInfo(newFormInfo)
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingScreen}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      </View>
    )
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
          <Text style={styles.titleText}>獵物資訊</Text>
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
            <Image
              source={{ uri: `data:image/png;base64,${picture}` }}
              style={styles.img}
            />
          </View>
          <FlatList
            contentContainerStyle={styles.listContainer}
            data={FORM_ITEMS}
            renderItem={({ item, index }) => {
              const FormType = !Array.isArray(item.responses)
                ? FormInput
                : item.responses[0].img
                ? FormImgSlider
                : FormItem
              return (
                <FormType
                  question={item.question}
                  responses={item.responses}
                  index={index}
                  changeForm={changeForm}
                />
              )
            }}
            keyExtractor={item => item.question}
          />

          <View style={styles.submitButton}>
            <TouchableOpacity
              onPress={() => {
                saveHunt()
              }}
              style={styles.submitButtonContentWrapper}
            >
              <Text style={styles.submitText}>傳送</Text>
              <AntDesign name="checkcircle" color="#38F46B" size={40} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default FormScreen

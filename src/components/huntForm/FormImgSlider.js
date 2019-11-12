/* eslint-disable no-unused-expressions */
import { PictureContext } from '../../context'

import React, { useContext } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import Swiper from 'react-native-swiper'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    marginTop: 20
  },
  swiperOuterContainer: {
    flex: 1,
    height: 300,
    width: '100%',
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: '#D5D5D5',
    borderWidth: 5,
    borderColor: '#DFDFDF'
  },
  swiperInnerContainer: { flex: 1, width: '80%', overflow: 'hidden' },
  question: {
    fontSize: 25,
    marginBottom: 10,
    textAlign: 'center'
  },
  imgContainer: { flex: 1 },
  img: { flex: 1, height: null, width: null },
  imgLabel: {
    color: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    fontSize: 30,
    textAlign: 'center',
    padding: 0,
    marginLeft: 5,
    marginBottom: 2
  }
  // img: { height: 200 }
})

const FormImgSlider = ({ question, responses }) => {
  const { setFormInfo } = useContext(PictureContext)

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
      <View style={styles.swiperOuterContainer}>
        <View style={styles.swiperInnerContainer}>
          <Swiper
            loop={false}
            onIndexChanged={idxActive =>
              setFormInfo({ idxActive, value: responses[idxActive].value })
            }
          >
            {responses.map(({ img, value, label }) => (
              <View style={styles.imgContainer} key={value}>
                <Image source={img} style={styles.img} />
                <Text style={styles.imgLabel}>{label}</Text>
              </View>
            ))}
          </Swiper>
        </View>
      </View>
    </View>
  )
}

export default FormImgSlider

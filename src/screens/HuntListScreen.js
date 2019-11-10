import { HuntContext } from '../context'

import React, { useContext, useRef } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  Animated,
  Image,
  Dimensions,
  ScrollView
} from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { Table, Row } from 'react-native-table-component'
import moment from 'moment'

const MIN_IMAGE_HEIGHT = 100
const MAX_IMAGE_HEIGHT = 300

const { width } = Dimensions.get('window')
const TABLE_HEADERS = ['時間 (Time)', '頻種 (Species)', '性別 (Gender)']
const WIDTH_ARR = [width * 0.4, width * 0.28, width * 0.28]

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
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
  image: { width: '100%', height: '100%' },
  list: {
    flex: 1,
    color: 'white',
    backgroundColor: '#eeeeee'
  },
  headTable: {
    borderWidth: 1,
    borderColor: '#C1C0B9'
  },
  header: { height: 50, backgroundColor: '#EEEEEE' },
  text: { textAlign: 'center', fontWeight: '100' },
  contentTable: { borderWidth: 1, borderColor: '#C1C0B9' },
  row: { height: 40, backgroundColor: '#FFB856' }
})

const HuntListScreen = ({ navigation }) => {
  const { state, fetchHunts } = useContext(HuntContext)
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

  return (
    <SafeAreaView forceInset={{ top: 'always' }} style={styles.safeArea}>
      <NavigationEvents onWillFocus={fetchHunts} />
      <Animated.View style={{ ...styles.imageWrapper, height: headerHeight }}>
        <Image
          style={styles.image}
          // eslint-disable-next-line global-require
          source={require('../../assets/dear_background2.png')}
        />
      </Animated.View>
      <ScrollView
        style={styles.list}
        scrollEventThrottle={16}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } }
        ])}
      >
        <Animated.View
          style={{
            flex: 1,
            // height: 1000,
            paddingTop: contentMarginTop,
            paddingBottom: 50,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Table borderStyle={styles.headTable}>
            <Row
              widthArr={WIDTH_ARR}
              data={TABLE_HEADERS}
              style={styles.header}
              textStyle={styles.text}
            />
          </Table>
          <Table borderStyle={styles.contentTable}>
            {state.map((data, index) => {
              const dateMoment = moment(data.date)
              return (
                <Row
                  widthArr={WIDTH_ARR}
                  key={data._id}
                  data={[
                    `${dateMoment.format('L')} ${dateMoment.format('LT')}`,
                    data.formInfo[0],
                    data.formInfo[1]
                  ]}
                  style={[
                    styles.row,
                    index % 2 && { backgroundColor: '#EEEEEE' }
                  ]}
                  textStyle={styles.text}
                  onPress={() => {
                    navigation.navigate('HuntDetail', { _id: data._id })
                  }}
                />
              )
            })}
          </Table>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  )
}

HuntListScreen.navigationOptions = {
  header: null
}

export default HuntListScreen

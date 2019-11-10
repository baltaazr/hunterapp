import { HuntContext } from '../context'

import React, { useContext, useRef } from 'react'
import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  Text,
  View,
  Animated,
  Image
} from 'react-native'
import { NavigationEvents } from 'react-navigation'

const MIN_IMAGE_HEIGHT = 100
const MAX_IMAGE_HEIGHT = 300

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
  list: { flex: 1, color: 'white', backgroundColor: '#012312' }
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
      <Animated.ScrollView
        style={{ ...styles.list, paddingTop: contentMarginTop }}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } }
        ])}
      >
        <FlatList
          data={state}
          keyExtractor={item => item._id}
          ListEmptyComponent={() => (
            <Text style={{ color: 'white' }}>Nothing to show</Text>
          )}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('HuntDetail', { _id: item._id })
              }
            >
              <Text>
                {`${item.date.toString()}, ${item.formInfo[0]}, ${
                  item.formInfo[1]
                }`}
              </Text>
            </TouchableOpacity>
          )}
        />
        <View style={{ height: 1000 }} />
      </Animated.ScrollView>
    </SafeAreaView>
  )
}

HuntListScreen.navigationOptions = {
  header: null
}

export default HuntListScreen

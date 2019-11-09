/* eslint-disable no-underscore-dangle */
import { HuntContext } from '../context'

import React, { useContext } from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { ListItem } from 'react-native-elements'

const HuntListScreen = ({ navigation }) => {
  const { state, fetchHunts } = useContext(HuntContext)
  return (
    <>
      <NavigationEvents onWillFocus={fetchHunts} />
      <FlatList
        data={state}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('HuntDetail', { _id: item._id })}
          >
            <ListItem chevron title={item.date.toString()} />
          </TouchableOpacity>
        )}
      />
    </>
  )
}

HuntListScreen.navigationOptions = {
  title: 'Hunts'
}

export default HuntListScreen

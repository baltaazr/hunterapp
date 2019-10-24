import React from 'react'
import { Text, FlatList } from 'react-native'

export default () => {
  const friends = [
    {
      name: 'Bob'
    }
  ]

  return (
    <FlatList
      keyExtractor={friend => friend.name}
      data={friends}
      renderItem={({ item }) => <Text>{item.name}</Text>}
    />
  )
}

// const styles = StyleSheet.create({})

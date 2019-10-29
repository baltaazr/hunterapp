import FormItem from '../components/FormItem'
import { useSaveHunt } from '../hooks'

import React from 'react'
import { StyleSheet, FlatList, View, Button } from 'react-native'
import { FORM_ITEMS } from 'config'

const styles = StyleSheet.create({
  container: { flex: 1 }
})

const FormScreen = () => {
  const [saveHunt] = useSaveHunt()

  return (
    <View style={styles.container}>
      <FlatList
        data={FORM_ITEMS}
        renderItem={({ item, index }) => (
          <FormItem
            question={item.question}
            responses={item.responses}
            index={index}
          />
        )}
        keyExtractor={item => item.question}
      />
      <Button title="submit" onPress={saveHunt} />
    </View>
  )
}

export default FormScreen

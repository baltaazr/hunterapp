import { FormItem, FormImgSlider } from '../components'
import { useSaveHunt } from '../hooks'

import React from 'react'
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import { FORM_ITEMS } from 'config'

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  listContainer: {
    width: '100%',
    flexDirection: 'column'
    // alignItems: 'center'
  },
  submitButton: {
    width: 100,
    color: 'white',
    backgroundColor: 'white'
  }
})

const FormScreen = ({ navigation }) => {
  const [saveHunt] = useSaveHunt()

  return (
    <SafeAreaView forceInset={{ top: 'always' }} style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={FORM_ITEMS}
        renderItem={({ item, index }) => {
          const FormType = item.responses[0].img ? FormImgSlider : FormItem
          return (
            <FormType
              question={item.question}
              responses={item.responses}
              index={index}
            />
          )
        }}
        keyExtractor={item => item.question}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Camera')
          saveHunt()
        }}
      >
        <View style={styles.submitButton}>
          <Text>Submit</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

FormScreen.navigationOptions = {
  header: null
}

export default FormScreen

import { FormItem, FormImgSlider } from '../components'
import { useSaveHunt } from '../hooks'
import { PictureContext } from '../context'

import React, { useContext } from 'react'
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image
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
  },
  img: { height: 200 }
})

const FormScreen = ({ navigation }) => {
  const [saveHunt] = useSaveHunt()
  const {
    state: { picture }
  } = useContext(PictureContext)

  return (
    <SafeAreaView forceInset={{ top: 'always' }} style={styles.container}>
      <Image source={{ uri: picture.uri }} style={styles.img} />
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

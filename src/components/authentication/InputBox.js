import React from 'react'
import { Text, View, TextInput, StyleSheet } from 'react-native'
// import { AntDesign } from '@expo/vector-icons'

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 15
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    width: '85%'
  },
  iconWrapper: {
    paddingRight: 15,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    color: '#eeeeee',
    marginBottom: 10
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  }
})

// <AntDesign name="mail" />
const InputBox = ({
  label,
  icon,
  placeholder,
  input,
  setInput,
  secureTextEntry
}) => (
  <View style={styles.wrapper}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputWrapper}>
      <View style={styles.iconWrapper}>{icon}</View>
      <TextInput
        style={styles.input}
        value={input}
        placeholder={placeholder}
        placeholderTextColor="white"
        onChangeText={setInput}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={secureTextEntry}
      />
    </View>
  </View>
)

export default InputBox

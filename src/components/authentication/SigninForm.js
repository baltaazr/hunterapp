import InputBox from './InputBox'
import SubmitButton from './SubmitButton'

import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import { Feather, Ionicons } from '@expo/vector-icons'

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
    flex: 3
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    // marginLeft: 15,
    flexDirection: 'column',
    justifyContent: 'flex-end'
    // flex: 2
  }
})

/**
 * TODO: PULL OUT ALL THE STRINGS
 */

const SigninForm = ({ errorMessage, onSubmit, submitButtonText }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View style={styles.wrapper}>
      <InputBox
        label="電子郵件 Email"
        placeholder="輸入電子郵件 Your Email"
        input={email}
        setInput={setEmail}
        icon={<Feather name="mail" size={32} color="white" />}
      />
      <InputBox
        label="密碼 Password"
        placeholder="輸入密碼 Your Password"
        input={password}
        setInput={setPassword}
        icon={<Ionicons name="md-lock" size={32} color="white" />}
      />
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <SubmitButton
        title={submitButtonText}
        icon={
          <Ionicons name="ios-arrow-dropdown-circle" size={32} color="purple" />
        }
        onPress={() => onSubmit({ email, password })}
      />
    </View>
  )
}

export default SigninForm

import { Context as AuthContext } from '../context/AuthContext'
import AuthForm from '../components/authentication/SigninForm'
import NavLink from '../components/utils/NavLink'

import React, { useContext } from 'react'
import { View, StyleSheet, Button } from 'react-native'
import { NavigationEvents } from 'react-navigation'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 250
  }
})

const SignupScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext)

  return (
    <View style={styles.container}>
      <NavigationEvents onWillBlur={clearErrorMessage} />
      <AuthForm
        headerText="Sign Up"
        errorMessage={state.errorMessage}
        submitButtonText="Sign Up"
        onSubmit={signup}
      />
      <NavLink
        routeName="Signin"
        text="Already have an account? Sign in instead!"
      />
      <Button
        title="test camera"
        onPress={() => {
          navigation.navigate('Camera')
        }}
      />
    </View>
  )
}

SignupScreen.navigationOptions = () => ({
  header: null
})

export default SignupScreen

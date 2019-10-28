import { Context as AuthContext } from '../context/AuthContext'
import AuthForm from '../components/AuthForm'
import NavLink from '../components/NavLink'

import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { NavigationEvents } from 'react-navigation'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 250
  }
})

const SignupScreen = () => {
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
    </View>
  )
}

SignupScreen.navigationOptions = () => ({
  header: null
})

export default SignupScreen

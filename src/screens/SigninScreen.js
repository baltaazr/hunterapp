import AuthForm from '../components/AuthForm'
import NavLink from '../components/NavLink'
import { Context } from '../context/AuthContext'

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

const SigninScreen = () => {
  const { state, signin, clearErrorMessage } = useContext(Context)

  return (
    <View style={styles.container}>
      <NavigationEvents onWillBlur={clearErrorMessage} />
      <AuthForm
        headerText="Sign In"
        errorMessage={state.errorMessage}
        onSubmit={signin}
        submitButtonText="Sign In"
      />
      <NavLink
        text="Dont have an account? Sign up instead"
        routeName="Signup"
      />
    </View>
  )
}

SigninScreen.navigationOptions = {
  header: null
}

export default SigninScreen

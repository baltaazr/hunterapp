import { SigninForm, SigninTitle, NavLink } from '../components'
import { Context } from '../context/AuthContext'

import React, { useContext } from 'react'
import { SafeAreaView, StyleSheet, ImageBackground } from 'react-native'
import { NavigationEvents } from 'react-navigation'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
    // marginBottom: 250
  },
  background: {
    width: '100%',
    height: '100%'
  }
})

const SigninScreen = () => {
  const { state, signin, clearErrorMessage } = useContext(Context)

  return (
    <SafeAreaView forceInset={{ top: 'always' }} style={styles.container}>
      <ImageBackground
        // eslint-disable-next-line global-require
        source={require('../../assets/signin_background.png')}
        style={styles.background}
      >
        <NavigationEvents onWillBlur={clearErrorMessage} />
        <SigninTitle title="獵訊" subtitle="HuntData" />
        <SigninForm
          errorMessage={state.errorMessage}
          onSubmit={signin}
          submitButtonText="Sign In"
        />
        <NavLink
          text="Dont have an account? Sign up instead"
          routeName="Signup"
        />
      </ImageBackground>
    </SafeAreaView>
  )
}

SigninScreen.navigationOptions = {
  header: null
}

export default SigninScreen

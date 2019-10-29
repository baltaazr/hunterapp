import { AuthContext } from '../context'
import { SignupForm, GoToOther, PageTitle } from '../components'

import React, { useContext } from 'react'
import { SafeAreaView, ImageBackground, StyleSheet } from 'react-native'
import { NavigationEvents } from 'react-navigation'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  background: {
    width: '100%',
    height: '102%'
  }
})

const SignupScreen = () => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext)

  return (
    <ImageBackground
      // eslint-disable-next-line global-require
      source={require('../../assets/signup_background.png')}
      style={styles.background}
    >
      <SafeAreaView forceInset={{ top: 'always' }} style={styles.container}>
        <NavigationEvents onWillBlur={clearErrorMessage} />
        <PageTitle
          title="註冊"
          subtitle="Create Account"
          color="white"
          subtitleMarginRight="28%"
        />
        <SignupForm
          errorMessage={state.errorMessage}
          onSubmit={signup}
          submitButtonText="註冊 Sign Up"
        />
        <GoToOther
          text="已有帳號？ Already Have an Account?"
          routeName="Signin"
        />
      </SafeAreaView>
    </ImageBackground>
  )
}

SignupScreen.navigationOptions = () => ({
  header: null
})

export default SignupScreen

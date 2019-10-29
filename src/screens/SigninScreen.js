import { SigninForm, PageTitle, GoToOther } from '../components'
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
    <ImageBackground
      // eslint-disable-next-line global-require
      source={require('../../assets/signin_background.png')}
      style={styles.background}
    >
      <SafeAreaView forceInset={{ top: 'always' }} style={styles.container}>
        <NavigationEvents onWillBlur={clearErrorMessage} />
        <PageTitle title="獵訊" subtitle="HuntData" color="#FFA967" />
        <SigninForm
          errorMessage={state.errorMessage}
          onSubmit={signin}
          submitButtonText="登入 Sign In"
        />
        <GoToOther text="註冊 Create Account" routeName="Signup" />
      </SafeAreaView>
    </ImageBackground>
  )
}

SigninScreen.navigationOptions = {
  header: null
}

export default SigninScreen

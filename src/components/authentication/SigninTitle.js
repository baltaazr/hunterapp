import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flexDirection: 'column',
    marginTop: 23,
    flex: 3
  },
  title: {
    fontSize: 80,
    color: '#FFA967',
    marginTop: '10%',
    marginLeft: '20%'
  },
  subtitle: {
    fontSize: 30,
    color: '#FFA967',
    alignSelf: 'flex-end',
    marginRight: '25%'
  }
})

const PageTitle = ({ title, subtitle }) => (
  <View style={styles.wrapper}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>{subtitle}</Text>
  </View>
)

export default PageTitle

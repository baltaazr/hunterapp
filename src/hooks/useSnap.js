import { PictureContext } from '../context'
import { weatherApi } from '../api'

import * as Location from 'expo-location'
import { weatherApiKey } from 'config'
import { useContext } from 'react'

export default () => {
  const { setPictureData } = useContext(PictureContext)

  const snap = async camera => {
    const pic = await camera.takePictureAsync({ base64: true })
    const location = await Location.getCurrentPositionAsync()
    try {
      const { data } = await weatherApi.get(
        '/locations/v1/cities/geoposition/search',
        {
          params: {
            apikey: weatherApiKey,
            q: `${location.coords.latitude},${location.coords.longitude}`
          }
        }
      )
      const weather = await weatherApi.get(
        `/currentconditions/v1/${data.Key}`,
        {
          params: {
            apikey: weatherApiKey,
            details: true
          }
        }
      )
      const weatherObj = weather.data[0]
      setPictureData({
        picture: pic,
        date: new Date(),
        location,
        weather: {
          temperature: weatherObj.Temperature.Metric.Value,
          text: weatherObj.WeatherText,
          humidity: weatherObj.RelativeHumidity
        }
      })
    } catch (e) {
      setPictureData({
        picture: pic,
        date: new Date(),
        location,
        weather: {
          temperature: -1,
          text: 'UNABLE TO GET WEATHER DATA',
          humidity: -1
        }
      })
    }
  }

  return [snap]
}

import { PictureContext } from '../context'
import { weatherApi } from '../api'

import * as Location from 'expo-location'
import { WEATHER_API_KEY } from 'config'
import { useContext } from 'react'

export default () => {
  const {
    state: { formInfo },
    setPictureData,
    setFormInfo
  } = useContext(PictureContext)

  const snap = async camera => {
    const { uri, base64 } = await camera.takePictureAsync({ base64: true })
    const location = await Location.getCurrentPositionAsync()
    try {
      const { data } = await weatherApi.get(
        '/locations/v1/cities/geoposition/search',
        {
          params: {
            apikey: WEATHER_API_KEY,
            q: `${location.coords.latitude},${location.coords.longitude}`
          }
        }
      )
      const weather = await weatherApi.get(
        `/currentconditions/v1/${data.Key}`,
        {
          params: {
            apikey: WEATHER_API_KEY,
            details: true,
            language: 'zh-hant-tw'
          }
        }
      )
      const weatherObj = weather.data[0]
      setPictureData({
        uri,
        picture: base64,
        date: new Date(),
        location,
        weather: {
          temperature: weatherObj.Temperature.Metric.Value,
          text: weatherObj.WeatherText,
          humidity: weatherObj.RelativeHumidity
        }
      })
      const newFormInfo = [...formInfo]
      const weatherNum = weatherObj.WeatherIcon
      // indices for sky condition and temperature is 6 and 7
      // http://apidev.accuweather.com/developers/weatherIcons
      if (weatherNum <= 3 || (weatherNum >= 33 && weatherNum <= 35)) {
        newFormInfo[6] = '明確'
      } else if (
        (weatherNum >= 4 && weatherNum <= 6) ||
        (weatherNum >= 36 && weatherNum <= 38)
      ) {
        newFormInfo[6] = '局部陰天'
      } else if (weatherNum >= 7 && weatherNum <= 11) {
        newFormInfo[6] = '多雲的'
      } else if (
        (weatherNum >= 12 && weatherNum <= 18) ||
        (weatherNum >= 39 && weatherNum <= 42)
      ) {
        newFormInfo[6] = '雨'
      } else if (
        (weatherNum >= 19 && weatherNum <= 29) ||
        (weatherNum >= 43 && weatherNum <= 44)
      ) {
        newFormInfo[6] = '雪'
      }
      newFormInfo[7] = weatherObj.Temperature.Metric.Value.toString()
      setFormInfo(newFormInfo)
    } catch (e) {
      setPictureData({
        picture: base64,
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

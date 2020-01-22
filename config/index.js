import MUNTJACDEER_PIC from '../assets/FormAnswerImages/muntjacdeer.jpg'
import SAMBARDEER_PIC from '../assets/FormAnswerImages/sambardeer.jpg'
import FLYINGSQUIRREL_PIC from '../assets/FormAnswerImages/flyingsquirrel.jpeg'
import BOAR_PIC from '../assets/FormAnswerImages/wildboar.jpg'
import CLEAR_PIC from '../assets/FormAnswerImages/WeatherIcons/clear.png'
import PARTLYCLOUDY_PIC from '../assets/FormAnswerImages/WeatherIcons/partlycloudy.png'
import CLOUDY_PIC from '../assets/FormAnswerImages/WeatherIcons/cloudy.png'
import RAIN_PIC from '../assets/FormAnswerImages/WeatherIcons/rain.png'
import SNOW_PIC from '../assets/FormAnswerImages/WeatherIcons/snow.png'

/* eslint-disable global-require */
export const NGROK_ADDRESS = 'http://6f954722.ngrok.io'

export const FORM_ITEMS = [
  {
    question: '動物',
    responses: [
      {
        value: 'muntjacdeer',
        label: '蒙塔克鹿',
        img: MUNTJACDEER_PIC
      },
      {
        value: 'sambardeer',
        label: '水鹿鹿',
        img: SAMBARDEER_PIC
      },
      {
        value: 'flyingsquirrel',
        label: '松鼠',
        img: FLYINGSQUIRREL_PIC
      },
      {
        value: 'boar',
        label: '山豬',
        img: BOAR_PIC
      }
    ]
  },
  {
    question: '性別',
    responses: [
      // male
      { value: 'male', label: '公' },
      // female
      { value: 'female', label: '母' }
    ]
  },
  {
    question: '年齡',
    responses: [
      { value: 'infant', label: '嬰兒' },
      { value: 'adult', label: '成人' }
    ]
  },
  {
    question: '孕',
    responses: [
      { value: 'pregnant', label: '孕' },
      { value: 'nursing', label: '護理' },
      { value: 'none', label: '沒有' }
    ]
  },
  {
    question: '動物狀況',
    responses: [
      { value: 'good', label: '好' },
      { value: 'thin', label: '瘦' },
      { value: 'overweight', label: '超重' },
      { value: 'injured', label: '受傷' },
      { value: 'diseased', label: '有病' }
    ]
  },
  {
    question: '地麵條件',
    responses: [
      { value: 'wet', label: '濕' },
      { value: 'dry', label: '幹' },
      { value: 'muddy', label: '渾' },
      { value: 'dusty', label: '塵土飛揚' },
      { value: 'damaged', label: '破損' },
      { value: 'plantsdamagedbyanimals', label: '被動物破壞的植物' },
      { value: 'overgrazing', label: '過度放牧' }
    ]
  },
  {
    question: '天空條件',
    responses: [
      { value: 'clear', label: '明確', img: CLEAR_PIC },
      { value: 'partlycloudy', label: '局部陰天', img: PARTLYCLOUDY_PIC },
      { value: 'cloudy', label: '多雲的', img: CLOUDY_PIC },
      { value: 'rain', label: '雨', img: RAIN_PIC },
      { value: 'snow', label: '雪', img: SNOW_PIC }
    ]
  },
  {
    question: '溫度',
    responses: 'numeric'
  },
  {
    question: '方法',
    responses: [
      { value: 'gun', label: '槍' },
      { value: 'bow', label: '弓箭' },
      { value: 'snare', label: '圈套' },
      { value: 'deadfall', label: '死角' },
      { value: 'cage', label: '籠' },
      { value: 'snapsnare', label: '捕捉軍鼓' }
    ]
  }
]

export const WEATHER_API_KEY = 'xYRO15hWiRFvncBTGXiCidA5M9M1rZng'

export const DRAWER_WIDTH = 150

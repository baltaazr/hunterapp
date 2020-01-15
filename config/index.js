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
export const NGROK_ADDRESS = 'https://fcb4c2df.ngrok.io'

export const FORM_ITEMS = [
  {
    question: '什麼動物？',
    responses: [
      {
        value: '蒙塔克鹿',
        label: '蒙塔克鹿',
        img: MUNTJACDEER_PIC
      },
      {
        value: '水鹿鹿',
        label: '水鹿鹿',
        img: SAMBARDEER_PIC
      },
      {
        value: '松鼠',
        label: '松鼠',
        img: FLYINGSQUIRREL_PIC
      },
      {
        value: '山豬',
        label: '山豬',
        img: BOAR_PIC
      }
    ]
  },
  {
    question: '動物公母?',
    responses: [
      // male
      { value: '公', label: '公' },
      // female
      { value: '母', label: '母' }
    ]
  },
  {
    question: '什麼年齡?',
    responses: [
      { value: 'infant', label: 'infant' },
      { value: 'adult', label: 'adult' }
    ]
  },
  {
    question: '孕',
    responses: [
      { value: 'pregant', label: 'pregant' },
      { value: 'nursing', label: 'nursing' },
      { value: '沒有', label: '沒有' }
    ]
  },
  {
    question: '動物狀況',
    responses: [
      { value: '好', label: '好' },
      { value: '瘦', label: '瘦' },
      { value: '超重', label: '超重' },
      { value: '受傷', label: '受傷' },
      { value: '有病', label: '有病' }
    ]
  },
  {
    question: '地麵條件',
    responses: [
      { value: '濕', label: '濕' },
      { value: '幹', label: '幹' },
      { value: '渾', label: '渾' },
      { value: '塵土飛揚', label: '塵土飛揚' },
      { value: '破損', label: '破損' },
      { value: '被動物破壞的植物', label: '被動物破壞的植物' },
      { value: '過度放牧', label: '過度放牧' }
    ]
  },
  {
    question: '天空條件',
    responses: [
      { value: '明確', label: '明確', img: CLEAR_PIC },
      { value: '局部陰天', label: '局部陰天', img: PARTLYCLOUDY_PIC },
      { value: '多雲的', label: '多雲的', img: CLOUDY_PIC },
      { value: '雨', label: '雨', img: RAIN_PIC },
      { value: '雪', label: '雪', img: SNOW_PIC }
    ]
  },
  {
    question: '溫度',
    responses: 'numeric'
  },
  {
    question: '方法',
    responses: [
      { value: '槍', label: '槍' },
      { value: '弓箭', label: '弓箭' },
      { value: '圈套', label: '圈套' },
      { value: '死角', label: '死角' },
      { value: '籠', label: '籠' },
      { value: '捕捉軍鼓', label: '捕捉軍鼓' }
    ]
  }
]

export const WEATHER_API_KEY = 'xYRO15hWiRFvncBTGXiCidA5M9M1rZng'

export const DRAWER_WIDTH = 150

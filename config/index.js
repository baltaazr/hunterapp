import DEER_PIC from '../assets/FormAnswerImages/deer.jpg'
import BOAR_PIC from '../assets/FormAnswerImages/wildboar.jpg'

/* eslint-disable global-require */
export const NGROK_ADDRESS = 'http://23dea0fe.ngrok.io'

export const FORM_ITEMS = [
  {
    question: '什麼動物？',
    responses: [
      {
        value: '鹿',
        label: '鹿',
        img: DEER_PIC
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
  }
]

export const weatherApiKey = 'xYRO15hWiRFvncBTGXiCidA5M9M1rZng'

export const DRAWER_WIDTH = 150

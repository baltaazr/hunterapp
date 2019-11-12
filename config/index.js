/* eslint-disable global-require */
export const NGROK_ADDRESS = 'http://5a89552f.ngrok.io'

export const FORM_ITEMS = [
  {
    question: 'What animal is it?',
    responses: [
      {
        value: 'deer',
        label: 'Deer',
        img: require('../assets/FormAnswerImages/deer.jpg')
      },
      {
        value: 'wildboar',
        label: 'Wild Boar',
        img: require('../assets/FormAnswerImages/wildboar.jpg')
      }
    ]
  },
  {
    question: 'What gender is it?',
    responses: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' }
    ]
  }
]

export const weatherApiKey = 'xYRO15hWiRFvncBTGXiCidA5M9M1rZng'

export const DRAWER_WIDTH = 150

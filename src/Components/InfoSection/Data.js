// import car from '../../images/logo.jpg'
import performance from '../../images/logo.jpg'
import data from '../../images/logo.jpg'

export const homeObjOne = {
  id: 'about',
  lightBg: false,
  lightText: true,
  lightTextDesc: true,
  topLine: 'Premium Bank',
  headline: 'Unlimited Transactions with zero fess',
  description: `Get access to our exclusive app that allows you to send \
  unlimited transactions without extra charges`,
  buttonLabel: 'Get started',
  imgStart: false,
  img: './svg/arrived.svg',
  alt: 'car',
  dark: true,
  primary: true,
  darkText: false,
}

export const homeObjTwo = {
  id: 'discover',
  lightBg: true,
  lightText: false,
  lightTextDesc: false,
  topLine: 'Unlimited Access',
  headline: 'Login to your account at any time',
  description: `We have you covered no matter where you are located. All you
  need is an internet connection and a phone or computer.`,
  buttonLabel: 'Learn More',
  imgStart: true,
  img: performance,
  alt: 'performance',
  dark: false,
  primary: false,
  darkText: true,
}

export const homeObjThree = {
  id: 'signup',
  lightBg: true,
  lightText: false,
  lightTextDesc: false,
  topLine: 'Join Our Team',
  headline: 'Creating an account is extremely easy',
  description: `Get everything set up and ready in under 10 minutes. All
  you need to do is add your information and you're ready to go.`,
  buttonLabel: 'Start Now',
  imgStart: false,
  img: data,
  alt: 'data',
  dark: false,
  primary: false,
  darkText: true,
}
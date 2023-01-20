import { Module } from '../core/module'

export class ClicksModule extends Module {
  trigger() {
    let time = 2
    let singleClicks = 0
    let doubleClicks = 0

    setTimeout(() => {
      document.addEventListener('click', () => {
        singleClicks++
      })
      document.addEventListener('dblclick', () => {
        doubleClicks++
      })
    }, 0)

    const timer = setInterval(() => {
      if (time === 0) {
        let singleString = ''
        let doubleString = ''

        singleClicks === 1
          ? (singleString = 'одинарный клик')
          : (singleString = 'одинарных кликов')

        doubleClicks === 1
          ? (doubleString = 'двойной клик')
          : (doubleString = 'двойных кликов')

        alert(
          `За 3 секунды было совершено:
${singleClicks} ${singleString},
${doubleClicks} ${doubleString}.`
        )
        clearInterval(timer)
      } else {
        --time
      }
    }, 1000)
  }
}

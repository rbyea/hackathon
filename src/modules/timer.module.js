import { Module } from '../core/module'
import '../clicks.css'

export class TimerModule extends Module {
  trigger() {
    let time = 0
    let timerId = null

    showTimerWindow()

    function showTimerWindow() {
      const timerWrapperExists = document.querySelector('.timer-wrapper')
      if (timerWrapperExists) {
        timerWrapperExists.remove()
      }

      const timerWrapper = document.createElement('div')
      timerWrapper.className = 'timer-wrapper'
      document.body.insertAdjacentElement('beforeend', timerWrapper)

      const timerWindow = document.createElement('div')
      timerWindow.className = 'timer-window'
      timerWrapper.insertAdjacentElement('beforeend', timerWindow)

      const closeButton = document.createElement('button')
      closeButton.className = 'close-btn'
      closeButton.innerHTML = '&#10006;'
      timerWindow.append(closeButton)
      document.querySelector('.close-btn').addEventListener('click', () => {
        timerWrapper.remove()
      })

      const h1Timer = document.createElement('h1')
      h1Timer.className = 'h1-timer'
      h1Timer.textContent = 'Введите время.'
      timerWindow.append(h1Timer)

      const timeInput = `<input id="time" type="time" name="time" step="1">`
      timerWindow.insertAdjacentHTML('beforeend', timeInput)

      const timerStartBtn = document.createElement('button')
      timerStartBtn.classList.add('click-btn', 'timer-start-btn')
      timerStartBtn.textContent = 'Старт'
      timerWindow.append(timerStartBtn)

      const timeInputHTML = document.querySelector('#time')
      timerStartBtn.addEventListener('click', () => {
        time = timeInputHTML.value.split(':')
        if (time.length !== 3 || timeInputHTML.value === '00:00:00') {
          error()
        } else {
          showCounterScreen()
        }
      })

      document.addEventListener('contextmenu', () => {
        clearInterval(timerId)
        timerWrapper.remove()
      })
    }

    function showCounterScreen() {
      const h1Timer = document.querySelector('.h1-timer')
      const timerStartBtn = document.querySelector('.timer-start-btn')
      const timeInputHTML = document.querySelector('#time')
      timeInputHTML.remove()

      h1Timer.innerHTML = `
          <div class="timer__items">
            <div class="timer__item timer__hours">${time[0]}</div>
            <div class="timer__item timer__minutes">${time[1]}</div>
            <div class="timer__item timer__seconds">${time[2]}</div>
          </div>`

      timerStartBtn.remove()

      time = time.map(el => parseInt(el))
      const [hr, min, sec] = time
      let timeInSec = hr * 3600 + min * 60 + sec

      timer(timeInSec)
    }

    function timer(timeInSec) {
      timerId = setInterval(() => {
        if (timeInSec === 1) {
          finish()
          clearInterval(timerId)
        } else {
          --timeInSec
          let hours = parseInt((timeInSec / 3600) % 24, 10)
          let minutes = parseInt((timeInSec / 60) % 60, 10)
          let seconds = parseInt(timeInSec % 60, 10)

          hours = hours < 10 ? '0' + hours : hours
          minutes = minutes < 10 ? '0' + minutes : minutes
          seconds = seconds < 10 ? '0' + seconds : seconds

          const hoursHTML = document.querySelector('.timer__hours')
          const minutesHTML = document.querySelector('.timer__minutes')
          const secondsHTML = document.querySelector('.timer__seconds')

          if (hoursHTML && minutesHTML && secondsHTML) {
            hoursHTML.innerHTML = hours
            minutesHTML.innerHTML = minutes
            secondsHTML.innerHTML = seconds
          }
        }
      }, 1000)
    }

    function finish() {
      const timerWindow = document.querySelector('.timer-window')
      const h1Timer = document.querySelector('.h1-timer')

      h1Timer.innerHTML = `Время вышло.`

      const restartButton = document.createElement('button')
      restartButton.classList.add('click-btn', 'restart-btn')
      restartButton.textContent = 'Заново'
      timerWindow.append(restartButton)
      document.querySelector('.restart-btn').addEventListener('click', () => {
        showTimerWindow()
      })
    }

    function error() {
      const timerWindow = document.querySelector('.timer-window')

      timerWindow.innerHTML = `<h1 class="h1-timer">Введите время.</h1>`

      const restartButton = document.createElement('button')
      restartButton.classList.add('click-btn', 'restart-btn')
      restartButton.textContent = 'Ок'
      timerWindow.append(restartButton)
      document.querySelector('.restart-btn').addEventListener('click', () => {
        showTimerWindow()
      })
    }
  }
}

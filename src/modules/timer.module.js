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
        time = timeInputHTML.value

        console.log(time)
        time = time.split(':').map(el => Number(el))
        console.log(time)

        showCounterScreen()
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

      const hr = time[0]
      const min = time[1]
      const sec = time[2]

      const timeInSec = hr * 3600 + min * 60 + sec
      console.log(timeInSec)

      timer(timeInSec)

      // timerId = setInterval(timer, 1000)
    }

    function timer(timeInSec) {
      let temp = timeInSec
      timeInSec--
      let h = Math.floor(temp / 3600)
      let m = Math.floor((temp % 3600) / 60)
      let s = Math.floor(temp - h * 3600 - m * 60)

      // console.log(h)
      // console.log(m)
      // console.log(s)

      h = checkTime(h)
      m = checkTime(m)
      s = checkTime(s)

      console.log(h)
      console.log(m)
      console.log(s)

      const hoursHTML = document.querySelector('.timer__hours')
      const minutesHTML = document.querySelector('.timer__minutes')
      const secondsHTML = document.querySelector('.timer__seconds')

      hoursHTML.innerHTML = h
      minutesHTML.innerHTML = m
      secondsHTML.innerHTML = s

      timerId = setTimeout(timer, 1000)
    }

    function checkTime(i) {
      if (i < 10) {
        i = '0' + i
      }
      return i
    }

    function finish() {
      const h1Timer = document.querySelector('.h1-timer')
      const timerWindow = document.querySelector('.timer-window')

      h1Timer.innerHTML = `Время вышло.`

      const restartButton = document.createElement('button')
      restartButton.classList.add('click-btn', 'restart-btn')
      restartButton.textContent = 'Заново'
      timerWindow.append(restartButton)
      document.querySelector('.restart-btn').addEventListener('click', () => {
        showTimerWindow()
      })
    }
  }
}

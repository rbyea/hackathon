import { Module } from '../core/module'
import '../clicks.css'

export class ClicksModule extends Module {
  trigger() {
    // Очистка всех таймеров в случае повторного вызова модуля
    const intervalId = window.setInterval(() => {}, 10)
    for (let i = 1; i < intervalId; i++) {
      window.clearInterval(i)
    }

    let time = 0
    let singleClicks = 0
    let doubleClicks = 0

    showClicksWindow()

    function showClicksWindow() {
      const clicksWrapperExists = document.querySelector('.clicks-wrapper')
      if (clicksWrapperExists) {
        clicksWrapperExists.remove()
      }

      const clicksWrapper = document.createElement('div')
      clicksWrapper.className = 'clicks-wrapper'
      document.body.insertAdjacentElement('beforeend', clicksWrapper)

      const clicksWindow = document.createElement('div')
      clicksWindow.className = 'clicks-window'
      clicksWrapper.insertAdjacentElement('beforeend', clicksWindow)

      const closeButton = document.createElement('button')
      closeButton.className = 'close-btn'
      closeButton.innerHTML = '&#10006;'
      clicksWindow.append(closeButton)
      document.querySelector('.close-btn').addEventListener('click', () => {
        clicksWrapper.remove()
      })

      const h1Clicks = document.createElement('h1')
      h1Clicks.className = 'h1-clicks'
      h1Clicks.textContent =
        'Выберите время, за которое необходимо посчитать клики.'
      clicksWindow.append(h1Clicks)

      const timeList = `<ul class="time-list">
        <li>
          <button class="click-btn time-btn" data-time="3">3 сек</button>
        </li>
        <li>
          <button class="click-btn time-btn" data-time="5">5 сек</button>
        </li>
        <li>
          <button class="click-btn time-btn" data-time="10">10 сек</button>
        </li>`

      clicksWindow.insertAdjacentHTML('beforeend', timeList)

      const timeListHtml = document.querySelector('.time-list')
      timeListHtml.addEventListener('click', event => {
        if (event.target.classList.contains('time-btn')) {
          time = parseInt(event.target.getAttribute('data-time'))
        }
        showStartScreen()
      })

      document.addEventListener('contextmenu', () => {
        clicksWrapper.remove()
      })
    }

    function showStartScreen() {
      const h1Clicks = document.querySelector('.h1-clicks')
      const timeList = document.querySelector('.time-list')

      h1Clicks.textContent = 'Нажмите кнопку "Старт" для начала отсчёта.'

      const startBtn = document.createElement('button')
      startBtn.classList.add('click-btn', 'start-btn')
      startBtn.textContent = 'Старт'

      timeList.replaceWith(startBtn)

      startBtn.addEventListener('click', () => {
        showCounterScreen()
      })
    }

    function singleClicksCounter(event) {
      const t = event.target
      if (!t.classList.contains('start-btn')) {
        singleClicks++
        const singleClicksSpan = document.querySelector('#single-clicks')
        if (singleClicksSpan) {
          singleClicksSpan.innerHTML = singleClicks
        }
      }
    }

    function doubleClicksCounter(event) {
      const t = event.target
      if (!t.classList.contains('start-btn')) {
        doubleClicks++
        const doubleClicksSpan = document.querySelector('#double-clicks')
        if (doubleClicksSpan) {
          doubleClicksSpan.innerHTML = doubleClicks
        }
      }
    }

    function setTime(value) {
      const timeEl = document.querySelector('#time')
      if (timeEl) {
        timeEl.innerHTML = `00:${value}`
      }
    }

    function showCounterScreen() {
      const h1Clicks = document.querySelector('.h1-clicks')
      const startBtn = document.querySelector('.start-btn')

      let current = time
      if (current < 10) {
        current = `0${current}`
      }
      h1Clicks.innerHTML = `Кликайте. <p id="time">00:${current}</p>`

      const counters = document.createElement('h1')
      counters.classList.add('h1-clicks', 'counters')
      counters.innerHTML = `<p>Одинарных кликов: 
        <span id="single-clicks">0</span>.</p>
        <p>Двойных кликов: 
        <span id="double-clicks">0</span>.</p>`

      startBtn.replaceWith(counters)

      document.addEventListener('click', singleClicksCounter)
      document.addEventListener('dblclick', doubleClicksCounter)

      timer()
    }

    function timer() {
      const timer = setInterval(() => {
        if (time === 1) {
          const clicksWrapperExists = document.querySelector('.clicks-wrapper')
          if (clicksWrapperExists) {
            finish()
            clearInterval(timer)
          }
        } else {
          let current = --time
          if (current < 10) {
            current = `0${current}`
          }
          setTime(current)
        }
      }, 1000)
    }

    function finish() {
      document.removeEventListener('click', singleClicksCounter)
      document.removeEventListener('dblclick', doubleClicksCounter)

      const h1Clicks = document.querySelector('.h1-clicks')
      const counters = document.querySelector('.counters')

      h1Clicks.innerHTML = `<p>Итого:</p><p>Одинарных кликов: 
        ${singleClicks}.</p>
        <p>Двойных кликов: 
        ${doubleClicks}.</p>`

      const restartButton = document.createElement('button')
      restartButton.classList.add('click-btn', 'restart-btn')
      restartButton.textContent = 'Заново'
      counters.replaceWith(restartButton)
      document.querySelector('.restart-btn').addEventListener('click', () => {
        singleClicks = 0
        doubleClicks = 0
        showClicksWindow()
      })
    }
  }
}

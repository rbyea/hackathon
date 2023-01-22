import {Module} from '../core/module'
import {random} from '../utils.js'

export class CustomMsg extends Module {

    trigger() {

        async function randomMessages() {

            const url = 'https://62c1d18c2af60be89ece4372.mockapi.io/test'
            try {
                const response = await fetch(url)
                const request = await response.json()

                request.forEach((msg) => {
                    const arrayRandomMessages = msg.comments
                    const randomMsg = arrayRandomMessages[random(0, arrayRandomMessages.length - 1)]
                    renderHTML(randomMsg)
                })
            } catch {
                document.body.innerText =
                    "Произошла ошибка в получении данных о сообщениях..."
            }
        }

        randomMessages()

        function renderHTML(el) {
            const blockMsg = document.createElement('div')
            blockMsg.className = 'block_random-messages'
            blockMsg.textContent = el
            blockMsg.style.background = '#FFF3E9'
            blockMsg.style.display = 'flex'
            blockMsg.style.maxWidth = '30%'
            blockMsg.style.maxHeight = '100%'
            blockMsg.style.fontSize = '25px'
            blockMsg.style.borderRadius = '14px'
            blockMsg.style.padding = '5px'
            blockMsg.style.border = '1px solid #C3A2C4'
            blockMsg.style.boxShadow = '0px 10px 20px 2px rgba(0, 0, 0, 0.25)'


            document.body.append(blockMsg)

            document.body.addEventListener("contextmenu", (event) => {
                blockMsg.remove()
            })
            setTimeout(() => {
                blockMsg.remove()
            }, 5000)
        }

    }


}
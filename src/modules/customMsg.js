import { Module } from '../core/module'
import { random} from '../utils.js'

export class CustomMsg extends Module {

    trigger() {

        const arrayRandomMessages = ['Привет', 'Это рандом чувак', 'Я тут, гнянь!', 'эй, пссс...', "как делишки?", "Хорошего настроения вам!"
        , "Классная погода за окном", "Чем бы заняться, может поесть? хммм", "Кхм кхм грхх....", "У меня заканчивается фантазия...",
            "Миша, всё фигня давай по новой", "Сегодня в завтрашнем дне..", "Продолжи слова из песни No-no-no fear, no lie Listen my rhythm, hands up, I talk about a legalize...",
            "И что дальше?", "из какого фильма фраза : Мы вкалываем на фабриках , и в ресторанах, гнём спину в офисах. Нас дразнять рекламируя одежду, мы не востребовательны, мы пассынки истории ребят.... ",
            "Мы встретились в очень странный период моей жизни"]

        const randomMsg = arrayRandomMessages[random(0, arrayRandomMessages.length - 1)]


        function renderHTML () {
            const blockMsg = document.createElement('div')
            blockMsg.className = 'block_random-messages'
            blockMsg.textContent = randomMsg
            document.body.append(blockMsg)

            document.body.addEventListener("contextmenu", (event) => {
                blockMsg.remove()
            })
            setTimeout(() => {
                blockMsg.remove()
            },3000)
        }

        renderHTML()
    }


}
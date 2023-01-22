import { Module } from '../core/module'
import '../touch.css'
export class Touch extends Module {

    trigger() {
        //получаю звуки и отправляю response в рендер
        async function getSounds (){

            try{
                const URL_SOUNDS = 'https://63cba3655c6f2e1d84b91d4f.mockapi.io/muz'
                const requests = await fetch(URL_SOUNDS)
                const response = await requests.json()
                const resSounds = await response[0].sound
                renderHTML(resSounds)
            }catch {
                document.body.innerText =
                    "Произошла ошибка в получении данных о сообщениях..."
            }
        }
        getSounds()

        function renderHTML (el){
            //добавляю кнопку в ДОМ
            const container = document.createElement('div')
            container.classList = 'touch'
            const button = document.createElement('button')
            button.className = 'touchbtn'
            const i = document.createElement('i')
            i.ariaHidden = 'true'
            button.append(i)
            container.append(button)
            document.body.append(container)

            let debounce = false

            //вешаю слушатели на кнопку и звуки при клике
            button.addEventListener("click", (event) => {
                const classAudio = document.querySelector(".audio")

                if (debounce){
                    return;
                } else {
                    debounce = true;
                    buttonAnimate();
                    createWave();
                    container.classList.add('flashit')
                    button.remove()
                    if(event.target){
                        container.insertAdjacentHTML('beforeend',`<audio class="audio" src="${el[0]}" autoplay></audio>`)
                        if(classAudio){
                            classAudio.remove()
                            container.classList.remove('.flashit')
                        }

                    }
                }
            })

            document.body.addEventListener("contextmenu", (event) => {
                container.remove()
            })

            const buttonAnimate = () => {
                button.classList.add("clicked")
                setTimeout(() => {
                    button.classList.remove("clicked")
                    debounce = false
                }, 700)
            }

            const createWave = () => {
                const wave = document.createElement("div")
                wave.classList.add("wave")
                document.body.appendChild(wave)
                setTimeout(() => wave.remove(), 7000)
            }
        }
    }
}
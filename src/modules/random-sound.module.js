import { Module } from '../core/module'
import { getRandomArrayElement } from '../utils'

export class RandomSoundModule extends Module{
  trigger(){
    fetch("https://62c1d18c2af60be89ece4372.mockapi.io/test")
    .then(res => res.json())
    .then(res => {
      res.forEach((arr) => {
        const arrayRandomSounds = arr.sounds
        const classAudio = document.querySelector(".audio")
        document.body.insertAdjacentHTML('beforeend',`<audio class="audio" src="${getRandomArrayElement(arrayRandomSounds)}" autoplay></audio>`)
        if(classAudio){
          classAudio.remove()
        }      
      }) 
    })
    .catch(error => alert('Произошла ошибка в получении данных о звуках...'))
  }
}
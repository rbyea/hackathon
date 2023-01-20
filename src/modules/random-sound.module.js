import { Module } from '../core/module'
import { getRandomArrayElement } from '../utils'
import { sound } from '../settings'

export class RandomSoundModule extends Module{
  trigger(){
const classAudio = document.querySelector(".audio")
document.body.insertAdjacentHTML('beforeend',`<audio class="audio" src="${getRandomArrayElement(sound)}" autoplay></audio>`)
classAudio.remove()
  }
}
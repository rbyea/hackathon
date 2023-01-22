import { Module } from "../core/module"
import '../photos.css'
import '../loader.css'

export class PhotosUnsplash extends Module {
  trigger() {
    const PHOTOS_URL = 'https://api.unsplash.com/search/photos?page=1&query='
    const KEY_URL = '&client_id=rWujnf1z02k4UKQzYZqxLD-lBpn5MHof6X8td3U2O-w'

    const loader = document.createElement('div')
    loader.className = "lds-spinner"
    loader.innerHTML = `<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>`

    const container = document.createElement('div')
    container.className = 'container'
    document.querySelector('body').append(container)

    const input = document.createElement('input')
    input.placeholder = 'Введите любое нвазание картинки. Например: котик'

    const button2 = document.createElement('button')
    button2.className = 'delete btn-photo'
    button2.innerHTML = '<span>Удалить</span>'
    button2.type = 'submit'

    const button = document.createElement('button')
    button.className = 'button btn-photo'
    button.innerHTML = '<span>Вывести</span>'

    const form = document.createElement('form')
    const containerButtons = document.createElement('div')
    containerButtons.className = 'btn-wrapper'

    container.append(form)
    form.append(input)
    form.append(containerButtons)
    containerButtons.append(button)
    containerButtons.append(button2)
    const containerImg = document.createElement('div')
    containerImg.className = 'container-img'

    const imgLength = document.createElement('div')
    imgLength.className = 'img-length-error'
    imgLength.innerHTML = 'Ничего не найдено!'
    let arrPhoto = []

    const getPhotos = async (search) => {
        arrPhoto = []
        try {

            if(imgLength) {
              imgLength.remove()
            }

            document.querySelector('body').append(loader)
            const photos = await fetch(`${PHOTOS_URL}${search}${KEY_URL}`)
            const photosResp = await photos.json()
            const photoResult = photosResp.results
            const img = document.createElement('img')

            if(photos.ok) {
                container.append(containerImg)
            }

            if(photoResult.length === 0) {
              container.append(imgLength)
            } else {
              photoResult.forEach(el => {
                for (const elKey in el.urls) {
                    if(elKey === 'regular') {
                        arrPhoto.push(el.urls[elKey])
                    }
                }
              })
            }

            const renderPhoto = arrPhoto.map(el => {
                return (
                    `<div class="img-width"><img src="${el}" alt=""/></div>`
                )
            })

            containerImg.innerHTML = renderPhoto.join('')
        } catch (e) {
            console.error(e)
        } finally {
          loader.remove()
        }
    }

    form.addEventListener('click', (e) => {
        e.preventDefault()
        const { target } = e

        if(target.className.includes('button')) {
            getPhotos(input.value)
        }
        if(target.className.includes('delete')) {
            if(document.querySelector('.container-img')) {
                document.querySelector('.container-img').remove()
            }
        }
    })

    document.querySelector('body').addEventListener("contextmenu", () => {
      container.remove()
    })

  }
}
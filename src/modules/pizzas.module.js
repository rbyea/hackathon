import { Module } from "../core/module"
import '../pizzas.css'
import '../loader.css'

export class PizzasModule extends Module {
  trigger() {
    const body = document.querySelector('body')
    const containerPizzas = document.createElement('div')
    const btnFilterDesc = document.createElement('button')
    const btnFilterAsc = document.createElement('button')
    const loader = document.createElement('div')

    loader.className = "lds-spinner"
    loader.innerHTML = `<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>`
    btnFilterAsc.className = "pizzas-filter"
    btnFilterDesc.className = "pizzas-filter"
    btnFilterDesc.innerHTML = '<span>Сортировка пицц по цене -</span>'
    btnFilterAsc.innerHTML = '<span>Сортировка пицц по цене +</span>'
    containerPizzas.className = "pizzas-container"
    btnFilterDesc.append(btnSpanDesc)
    btnFilterAsc.append(btnSpanAsc)

    body.append(btnFilterDesc)
    body.append(btnFilterAsc)

    body.append(containerPizzas)

    const PIZZAS_URL = 'https://62c1d18c2af60be89ece4372.mockapi.io/items'
    let btnInit = 0

    btnSpanDesc.addEventListener('click', () => {
      btnInit = 1
      getItems()
    }) 

    btnFilterAsc.addEventListener('click', () => {
      btnInit = 2
      getItems()
    }) 

    const getItems = async () => {
      try {
        containerPizzas.innerHTML = ''
        body.append(loader)
        const pizzas = await fetch(`${PIZZAS_URL}${btnInit === 1 ? '?&sortBy=price&order=desc' : btnInit === 2 ? '?&sortBy=price&order=asc' : ''}`)
        const pizzasRespons = await pizzas.json()
        containerPizzas.innerHTML = pizzasRespons.map(el => {
          return(`
            <div class="pizza-width">
              <div class="pizza-block">
                <div>
                  <img class="pizza-block__image" src="${el.imageUrl}" alt="Pizza">
                </div>
                <h4 class="pizza-block__title">${el.title}</h4>
                <div class="pizza-block__bottom">
                  <div class="pizza-block__price">от ${el.price} ₽</div>
                </div>
              </div>
            </div>
          `)
        }).join('')

        body.addEventListener("contextmenu", () => {
          containerPizzas.remove()
          btnFilterAsc.remove()
          btnFilterDesc.remove()
        })
      } catch (error) {
        console.error('Запрос не удался');
      } finally {
        loader.remove()
      }
    } 

    getItems()

  }
}
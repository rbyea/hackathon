import { Menu } from './core/menu'

export class ContextMenu extends Menu {
  open(event) {
    this.el.style.top = `${event.clientY}px`
    this.el.style.left = `${event.clientX}px`
    this.el.classList.add('open')
  }

  close() {
    this.el.classList.remove('open')
  }

  add(module) {
    this.el.insertAdjacentHTML('beforeend', module.toHTML())
  }
}

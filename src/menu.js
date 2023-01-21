import {Menu} from './core/menu'

export class ContextMenu extends Menu {
    open(event) {
        this.el.classList.add('open');

        //Проверки, чтобы контектное меню не вылазило за правый и нижний край
        this.el.style.top = `${event.clientY + this.el.offsetHeight > window.innerHeight
            ? window.innerHeight - this.el.offsetHeight
            : event.clientY}px`;
        this.el.style.left = `${event.clientX + this.el.offsetWidth > window.innerWidth
            ? window.innerWidth - this.el.offsetWidth
            : event.clientX}px`;
    }

    close() {
        this.el.classList.remove('open')
    }

    add(module) {
        this.el.insertAdjacentHTML('beforeend', module.toHTML())
    }
}

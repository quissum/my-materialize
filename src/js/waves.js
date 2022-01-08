import { css } from './utils'

const effect = `<div class="effect"></div>`

export class Waves {
  static init(root) {
    this.trigger = Array.from(document.querySelectorAll(root))

    document.addEventListener('mousedown', this.mousedown.bind(this))
  }

  static mousedown(e) {
    if (e.target.classList.contains('wave')) {
      e.target.insertAdjacentHTML('beforeend', effect)
      const waveEffect = e.target.querySelector('.effect')

      css(waveEffect, {
        width: `${e.target.offsetWidth * 2}px`,
        height: `${e.target.offsetWidth * 2}px`,
        left: `${e.offsetX}px`,
        top: `${e.offsetY}px`,
      })

      setTimeout(() => {
        waveEffect.remove()
      }, 400)
    }
  }
}

import { css } from './utils'

export class Paralax {
  static init(root) {
    this.paralax = Array.from(document.querySelectorAll(root))
    this.window = window.innerHeight

    document.addEventListener('scroll', this.scroll.bind(this))
  }

  // static click(e) {
  //   e.preventDefault()
  //   const target = document.querySelector(e.target.getAttribute('href'))

  //   target.scrollIntoView({ behavior: 'smooth', block: 'center' })
  // }

  static scroll() {
    this.paralax.forEach(paralax => {
      const { y, height } = paralax.getBoundingClientRect()

      if (y < this.window && y + height > 0) {
        const PERCENTAGE = 50 / (height + this.window)
        const translate = (y + height) * PERCENTAGE

        css(paralax.children[0], { transform: `translateY(-${translate}%)` })
      }
    })
  }
}

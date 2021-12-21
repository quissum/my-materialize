import { css } from './utils'

function dataset(header, i) {
  header.dataset.num = i
}

export class Collapsible {
  static defaultOptions = () => ({
    preselected: null,
    accordion: true,
  })

  static init(root, options) {
    this.options = Object.assign(this.defaultOptions(), options)
    this.root = document.querySelector(root)
    this.headers = Array.from(
      this.root.querySelectorAll('.collapsible__header')
    )
    this.bodies = Array.from(this.root.querySelectorAll('.collapsible__body'))

    this.headers.map(dataset)
    this.root.addEventListener('click', this.click.bind(this))

    if (parseInt(this.options.preselected) >= 0) {
      this.preselected()
    }
  }

  static preselected() {
    this.num = this.options.preselected
    this.changeCollaps()
  }

  static click(e) {
    if (e.target.dataset.num) {
      this.num = +e.target.dataset.num
      this.changeCollaps()
    }
  }

  static findHeight(body) {
    const content = body.lastElementChild
    this.height = content.getBoundingClientRect().height
  }

  static changeCollaps() {
    const body = this.bodies[this.num]
    this.findHeight(body)

    this.bodies.forEach((body, i) => {
      if (i === this.num && !body.classList.contains('active')) {
        this.open(body)
      } else if (i === this.num) {
        this.close(body)
      } else if (this.options.accordion) {
        this.close(body)
      }
    })
  }

  static open(body) {
    body.classList.add('active')
    css(body, {
      height: this.height + 'px',
    })
  }

  static close(body) {
    body.classList.remove('active')
    css(body, {
      height: 0,
    })
  }
}

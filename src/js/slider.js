import { css } from './utils'

const indicatorItem = (_, i) =>
  `<div class="slider__indicator" data-indicator="${i}"></div>`

export class Slider {
  static defaultOptions = () => ({
    active: 0,
    arrows: true,
    indicators: true,
    duration: 500,
  })

  static init(root, options) {
    this.options = Object.assign(this.defaultOptions(), options)
    this.root = document.querySelector(root)
    this.content = this.root.querySelector('.slider__content')
    this.items = Array.from(this.root.querySelectorAll('.slider__item'))
    this.widthItem = this.items[0].getBoundingClientRect().width

    this.activeElement = this.options.active

    css(this.content, {
      transition: ` all ease ${this.options.duration}ms`,
    })

    if (this.options.arrows) this.showArrows()
    if (this.options.indicators) this.showIndicators()
    this.changeSlide()
    this.root.addEventListener('click', this.click.bind(this))
    if (!!window.navigator.maxTouchPoints) {
      this.root.addEventListener('touchstart', this.touchstart.bind(this))
      this.root.addEventListener('touchmove', this.touchmove.bind(this))
      this.root.addEventListener('touchend', this.touchend.bind(this))
    }
  }

  static showArrows() {
    const elements = `<div class="slider__arrow slider__arrow--left" data-arrow="left"></div>
  <div class="slider__arrow slider__arrow--right" data-arrow="right"></div>`

    this.root.insertAdjacentHTML('afterbegin', elements)
  }

  static showIndicators() {
    const container = `<div class="slider__indicators">
    ${this.items.map(indicatorItem).join('\n')}
    </div>`

    this.root.insertAdjacentHTML('beforeend', container)
    this.indicators = Array.from(
      this.root.querySelectorAll('.slider__indicator')
    )
  }

  static click(e) {
    const data = e.target.dataset
    if (data.arrow) {
      if (data.arrow === 'left') this.previous()
      else this.next()
    } else if (data.indicator) {
      this.activeElement = +data.indicator
      this.changeSlide()
    }
  }

  static touchstart(e) {
    this.x = e.touches[0].clientX
    this.y = e.touches[0].clientY
  }

  static touchmove(e) {
    e.preventDefault()
    this.xEnd = e.touches[0].clientX
    this.yEnd = e.touches[0].clientY
  }

  static touchend() {
    if (Math.abs(this.xEnd - this.x) > Math.abs(this.yEnd - this.y)) {
      if (this.xEnd - this.x > 0) this.previous()
      else this.next()
    }
    delete this.x
    delete this.y
    delete this.xEnd
    delete this.yEnd
  }

  static next() {
    this.activeElement++
    if (this.activeElement === this.items.length) this.activeElement = 0
    this.changeSlide()
  }

  static previous() {
    this.activeElement--
    if (this.activeElement === -1) this.activeElement = this.items.length - 1
    this.changeSlide()
  }

  static changeSlide() {
    css(this.content, {
      transform: `translateX(${-this.widthItem * this.activeElement}px)`,
    })

    if (this.options.indicators)
      this.indicators.map((item, i) => {
        item.classList.remove('active')
        if (i === this.activeElement) item.classList.add('active')
      })
  }
}

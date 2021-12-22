export class TapTarget {
  static init(root) {
    this.root = document.querySelector(root)
    this.btn = this.root.querySelector('.tap__btn')

    document.addEventListener('click', this.click.bind(this))
  }

  static click(e) {
    const active = this.root.classList.contains('active')
    if (e.target.classList.contains('tap__btn')) {
      if (active) this.close()
      else this.open()
    } else if (!e.target.closest('.tap') && active) this.close()
  }

  static open() {
    this.root.classList.add('active')
  }

  static close() {
    this.root.classList.remove('active')
  }
}

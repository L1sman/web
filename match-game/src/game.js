
export default class Card {
    _chosed = false
    _matched = false

    constructor(container, number, match){
      this.card = document.createElement('div')
      this.card.classList.add('card')
      this.card.textContent = number
      this.number = number

      this.card.addEventListener('click', () => {
        if (this.chosed == false && this.matched == false) {
          this.chosed = true
          match(this)
        }
      })
      container.append(this.card)
    }

    set chosed(value) {
      this._chosed = value
      if (value) {
        this.card.classList.add('chosed')
      } else {
        this.card.classList.remove('chosed')
      }
    }
    get chosed() {
      return this._chosed
    }
    set matched(value) {
      this._chosed = value
      if (value) {
        this.card.classList.add('matched')
      } else {
        this.card.classList.remove('matched')
      }
    }
    get matched() {
      return this._matched
    }
  }







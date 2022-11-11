import Card from './game.js'


(() => {
const reBtn = document.getElementById('re-btn')
const button = document.getElementById('btn');

const try1 = () => {
  reBtn.classList.add('hide')
  document.getElementById('field').innerHTML = ''
  let cardsRange = document.getElementById('inp').value;
  let cardsCount = Math.pow(cardsRange, 2)

  if (cardsRange <= 2) {
    document.getElementById('field').className = 'field-width-2'
  } else if (cardsRange <= 4) {
    document.getElementById('field').className = 'field-width-default'
  } else if (cardsRange <= 6) {
    document.getElementById('field').className = 'field-width-6'
  }  else if (cardsRange <= 8) {
    document.getElementById('field').className = 'field-width-8'
  } else if (cardsRange <= 10) {
    document.getElementById('field').className = 'field-width-10'
  }


    if (cardsRange % 2 !== 0) {
      alert('Вы ввели нечетное количество кард')
      document.getElementById('field').className = 'field-width-default'
      cardsCount = 16
    }

  function newGame(container,cardsCount) {
    let cardsNumberArr = [],
    cardArray = [],
    firstCard = null,
    secondCard = null
    for (let i = 1; i <= cardsCount / 2; i++) {
      cardsNumberArr.push(i)
      cardsNumberArr.push(i)
    }


    for (let i = cardsNumberArr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [cardsNumberArr[i], cardsNumberArr[j]] = [cardsNumberArr[j], cardsNumberArr[i]];
    }


    for (const cardNumber of cardsNumberArr) {
      cardArray.push(new Card(container, cardNumber, flip))
    }
    function flip(card) {
      if (firstCard !== null && secondCard !== null) {
        if (firstCard.number != secondCard.number) {
          firstCard.chosed = false
          secondCard.chosed = false
          firstCard = null
          secondCard = null
        }
      }
      if(firstCard === null) {
        firstCard = card
      } else {
        secondCard = card
      }

      if (firstCard !== null && secondCard !== null) {
        if (firstCard.number === secondCard.number) {
          firstCard.matched = true
          secondCard.matched = true
          firstCard = null
          secondCard = null
        }
      }


      if (document.querySelectorAll('.card.matched').length === cardsNumberArr.length) {
        alert('Вы победили!')
        reBtn.classList.remove('hide');
      }

      reBtn.addEventListener('click', ()=> {
        container.innerHTML = '';
        cardsNumberArr = []
        cardArray = []
        firstCard = null
        secondCard = null
        newGame(container,cardsCount)
        reBtn.classList.add('hide')
      })
    }
  }
  newGame(document.getElementById('field'),cardsCount)
}
button.addEventListener('click',try1)
})();




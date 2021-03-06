document.addEventListener('DOMContentLoaded', () => {
    //card options
    const cardArray = [
        {
            name:'moon',
            img: 'images/Moon_Bust.png'
        },
        {
            name:'moon',
            img: 'images/Moon_Power.png'
        },
        {
            name:'mercury',
            img: 'images/Mercury_Bust.png'
        },
        {
            name:'mercury',
            img: 'images/Mercury_Power.png'
        },
        {
            name:'venus',
            img: 'images/Venus_Bust.png'
        },
        {
            name:'venus',
            img: 'images/Venus_Power.png'
        },
        {
            name:'mars',
            img: 'images/Mars_Bust.png'
        },
        {
            name:'mars',
            img: 'images/Mars_Power.png'
        },
        {
            name:'jupiter',
            img: 'images/Jupiter_Bust.png'
        },
        {
            name:'jupiter',
            img: 'images/Jupiter_Power.png'
        },
        {
            name:'chibi',
            img: 'images/Chibi_Bust.png'
        },
        {
            name:'chibi',
            img: 'images/Chibi_Power.png'
        }
    ]

    cardArray.sort(() => 0.5 - Math.random())

    const grid = document.querySelector('.grid')
    const resultDisplay = document.querySelector('#result')
    const cheerLeader = document.querySelector('#cheerleader')
    var cardsChosen = []
    var cardsChosenId = []
    var cardsWon = []

    //create board
    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            var card = document.createElement('img')
            card.setAttribute('src', 'images/blank.png')
            card.setAttribute('data-id', i)
            card.style.border = '5px solid hsl(300, 80%, 75%)'
            card.style.borderRadius = '5px'
            card.style.margin = '5px'
            card.addEventListener('click', flipCard)
            grid.appendChild(card)
        }
    }


//check for matches
function checkForMatch() {
    const cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]
    
    if(optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute('src', 'images/blank.png')
      cards[optionTwoId].setAttribute('src', 'images/blank.png')
      cheerLeader.textContent = 'Oops, try clicking somewhere else!'
    }
    else if (cardsChosen[0] === cardsChosen[1]) {
      cheerLeader.textContent = 'Like, oh my god! You got one!'
      cards[optionOneId].setAttribute('src', 'images/empty.png')
      cards[optionTwoId].setAttribute('src', 'images/empty.png')
      cards[optionOneId].removeEventListener('click', flipCard)
      cards[optionTwoId].removeEventListener('click', flipCard)
      cardsWon.push(cardsChosen)
    } else {
      cards[optionOneId].setAttribute('src', 'images/blank.png')
      cards[optionTwoId].setAttribute('src', 'images/blank.png')
      cheerLeader.textContent = 'Keep trying! You got this!'
    }
    cardsChosen = []
    cardsChosenId = []
    resultDisplay.textContent = cardsWon.length
    if  (cardsWon.length === cardArray.length/2) {
      resultDisplay.textContent = 'Congratulations! You found them all!'
      cheerLeader.textContent = 'Reload the page to play again!'
    }
  }


    //flip your card
    function flipCard() {
        var cardId = this.getAttribute('data-id')
        cardsChosen.push(cardArray[cardId].name)
        cardsChosenId.push(cardId)
        this.setAttribute('src', cardArray[cardId].img)
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500)
        }

    }

    createBoard();

})
const optionElements = [
    { id: '01', name: 'rock', iconClass: 'fa-hand-back-fist', imgSrc: './images/rock.png' },
    { id: '02', name: 'paper', iconClass: 'fa-hand', imgSrc: './images/paper.png' },
    { id: '03', name: 'scissors', iconClass: 'fa-hand-scissors', imgSrc: './images/scissors.png' },
]

document.body.addEventListener('click', showDropdown)
btnConfirm.addEventListener('click', confirmFunction)

listItems.forEach((el, index) => {
    el.innerHTML = `<span>${optionElements[index]['name']}</span> <i class="fa-regular ${optionElements[index]['iconClass']}"></i>`
    el.addEventListener('click', () => {
        textBox.setAttribute('data-id', optionElements[index]['id'])
        textBox.value = el.textContent
    })
})

function randomizer() { return Math.floor(Math.random() * 3) }

function showDropdown(el) {
    (el.target.tagName !== 'INPUT')
        ? dropdown.classList.remove('active')
        : dropdown.classList.toggle('active')
}

function confirmFunction() {
    let player = (textBox.dataset.id) ? optionElements.filter(el => textBox.dataset.id === el.id) : null
    if (player) {
        let randomValue = randomizer()
        let random = optionElements[randomValue]
        playerСhoiceImg.src = player[0]['imgSrc']
        randomSelectionImg.src = random['imgSrc']
        totalAmount(player[0], random)
        round()
    }
}

let plrCount = 0
let rdmCount = 0
function totalAmount(player, random) {
    const plrRock = player['name'] === 'rock'
    const plrPaper = player['name'] === 'paper'
    const plrScissors = player['name'] === 'scissors'
    const rdmRock = random['name'] === 'rock'
    const rdmPaper = random['name'] === 'paper'
    const rdmScissors = random['name'] === 'scissors'
    if (plrRock && rdmScissors || plrPaper && rdmRock || plrScissors && rdmPaper) {
        playerСount.textContent = ++plrCount
        if (plrCount >= 3) overplayFunc('Win', `${plrCount}:${rdmCount}`)
    } else if (rdmRock && plrScissors || rdmPaper && plrRock || rdmScissors && plrPaper) {
        randomCount.textContent = ++rdmCount
        if (rdmCount >= 3) overplayFunc('Loss', `${plrCount}:${rdmCount}`)
    }
}

function round() {
    btnConfirm.toggleAttribute('disabled')
    setTimeout(() => {
        btnConfirm.toggleAttribute('disabled')
        playerСhoiceImg.src = randomSelectionImg.src = './images/mystery-box.png'
    }, 2000)
}

function overplayFunc(result, total) {
    setTimeout(() => {
        overPlay.classList.toggle('showResult')
        overPlay.innerHTML = `<h2>${result}</h2><h3>${total}</h3><button>Overplay</button>`
        document.querySelector('.overplay>button').addEventListener('click', () => {
            textBox.value = null
            textBox.toggleAttribute('data-id')
            playerСount.textContent = plrCount = 0
            randomCount.textContent = rdmCount = 0
            playerСhoiceImg.src = randomSelectionImg.src = './images/mystery-box.png'
            overPlay.classList.toggle('showResult')
        })
    }, 1800)
}

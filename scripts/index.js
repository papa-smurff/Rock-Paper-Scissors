const optionElements = [
    { id: '01', name: 'rock', iconClass: 'fa-hand-back-fist', imgSrc: './images/rock.png' },
    { id: '02', name: 'paper', iconClass: 'fa-hand', imgSrc: './images/paper.png' },
    { id: '03', name: 'scissors', iconClass: 'fa-hand-scissors', imgSrc: './images/scissors.png' },
]

document.body.addEventListener('click', showDropdown)
btnConfirm.addEventListener('click', confirmFunction)
btnConfirm.addEventListener('click', round)

listItems.forEach((el, index) => {
    el.innerHTML = `<span>${optionElements[index]['name']}</span> <i class="fa-regular ${optionElements[index]['iconClass']}"></i>`
    el.addEventListener('click', () => {
        textBox.setAttribute('data-id', optionElements[index]['id'])
        textBox.value = el.textContent
    })
})

function showDropdown(el) {
    if(el.target.tagName !== 'INPUT') {
        dropdown.classList.remove('active')
    } else {
        dropdown.classList.toggle('active')
    }
}

function confirmFunction() {
    let randomValue = randomizer()
    let player = optionElements.filter(el => textBox.dataset.id === el.id)
    let random = optionElements[randomValue]
    playerСhoiceImg.src = player[0]['imgSrc']
    randomSelectionImg.src = random['imgSrc']
    totalAmount(player[0], random)
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
        if (plrCount >= 3) resetValues('Win', `${plrCount}:${rdmCount}`)
    } else if (rdmRock && plrScissors || rdmPaper && plrRock || rdmScissors && plrPaper) {
        randomCount.textContent = ++rdmCount
        if (rdmCount >= 3) resetValues('Loss', `${plrCount}:${rdmCount}`)
    } else {
        return null
    }
}

function round() {
    btnConfirm.toggleAttribute('disabled')
    setTimeout(() => {
        btnConfirm.toggleAttribute('disabled')
        playerСhoiceImg.src = randomSelectionImg.src = './images/mystery-box.png'
    }, 2000)
}

function resetValues(result, total) {
    reGame.classList.toggle('showResult')
    reGame.innerHTML = `<h2>${result}</h2><h3>${total}</h3><button class="reset">ReGame</button>`
    document.querySelector('.regame>.reset').addEventListener('click', () => {
        textBox.value = null
        playerСount.textContent = plrCount = 0
        randomCount.textContent = rdmCount =0
        playerСhoiceImg.src = randomSelectionImg.src = './images/mystery-box.png'
        reGame.classList.toggle('showResult')
    })
}

function randomizer() { return Math.floor(Math.random() * 3) }

const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timingDisplay')
quoteInputElement.addEventListener('input', () => {
    const arrQuote = quoteDisplayElement.querySelectorAll('span')
    const arrValue = quoteInputElement.value.split('')
    let correct = true
    arrQuote.forEach((characterSpan,index) => {
        const character = arrValue[index]
        if(character == null){
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false
        }else if(character === characterSpan.innerText){
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
            
        }else{
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            correct = false
        }

    })
    if(correct /*&& renderNewQoute()*/){
        let timerValue = timerElement.innerText
        console.log(timerValue)
        let TypeSpeed = Math.floor(((arrValue.length)/5)/(timerValue/60))
        console.log(Math.floor(TypeSpeed))
        const createDiv = document.createElement('div')
        createDiv.innerText = TypeSpeed
        document.body.appendChild(createDiv)
        createDiv.classList.add('speed-out')
        //document.write(TypeSpeed)
        let contiFlag = true
        //create a continue button
        const  createButton = document.createElement('button')
        createButton.innerText = "continue"
        createButton.addEventListener('click',()=>{
            location.reload()
            renderNewQoute()
        })
        document.body.appendChild(createButton)
        createButton.classList.add('continueBtn')
    }
    //if(correct) renderNewQoute()s
})
function getRandomeQoute(){
    return fetch(RANDOM_QUOTE_API_URL)
           .then(response => response.json())
           .then(data => data.content)
}

async function renderNewQoute(){
    const quote = await getRandomeQoute()
    quoteDisplayElement.innerText = ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        quoteDisplayElement.appendChild(characterSpan)       
    });
    quoteInputElement.value = null
    startTimer()
    
}

let startTime
function startTimer(){
    timerElement.innerText = 0
    startTime = new Date()
    setInterval(()=>{
        timerElement.innerText = getTimerTime()
    },1000)
}

function getTimerTime(){
    return Math.floor((new Date()-startTime)/1000)
}


renderNewQoute()

let errorCount
let messages
let correctAnswer
let jsonData
let verbChip
let tenseChip
let personText
let controleerButton
let helpButton
let input
let verbs
let tenses

async function readJsonFile(filePath) {
    try {
        const response = await fetch(filePath)

        if (!response.ok) {
            throw new Error(`Failed to load file: ${response.status}`)
        }

        const jsonData = await response.json()
        return jsonData
    } catch (error) {
        console.error('Error reading JSON file:', error)
        throw error
    }
}

function createMessage(text, subtext, level) {
    const messageContainer = document.createElement("div")
    
    const messageTitle = document.createElement("p")
    const messageDesc = document.createElement("p")

    
    messageTitle.classList.add("messageTitle")
    messageDesc.classList.add("messageDesc")
    messageContainer.classList.add("message")
    messageTitle.innerText = text
    messageDesc.innerText = subtext
    if (level == 1) {
        messageContainer.classList.add("messageRed")
    } else if (level == 2) {
        messageContainer.classList.add("messageYellow")
    } else if (level == 3) {
        messageContainer.classList.add("messageGreen")
    }
    
    messageContainer.appendChild(messageTitle)
    messageContainer.appendChild(messageDesc)

    messages.appendChild(messageContainer)
    
    setTimeout(() => {
        messageContainer.classList.add('removing');
        messageContainer.addEventListener('animationend', () => {
            messageContainer.remove()
        }, {once: true})
    }, 10000)
    return;
}

function generateNewQuestion() {
    // Get random verb
    const randomVerb = verbs[Math.floor(Math.random() * verbs.length)]
    
    // Get random tense
    const randomTense = tenses[Math.floor(Math.random() * tenses.length)]
    
    // Get random person and conjugation
    const persons = Object.keys(randomVerb.conjugations[randomTense])
    const randomPerson = persons[Math.floor(Math.random() * persons.length)]
    const conjugation = randomVerb.conjugations[randomTense][randomPerson]
    
    // Log verb, tense, person and conjugation
    console.log(`Verb: ${randomVerb.infinitive}, Tense: ${randomTense}, Person: ${randomPerson}, Conjugation: ${conjugation}`)

    verbChip.innerText = randomVerb.infinitive
    tenseChip.innerText = randomTense
    personText.innerText = randomPerson
    input.value = ""
    
    return conjugation
}


function checkAnswer() {
    if (input.value == correctAnswer) {
        input.classList.remove("wrong")
        input.classList.add("correct")
        setTimeout(() => {
            input.classList.remove("correct")
        }, 500)
        correctAnswer = generateNewQuestion()
    } else {
        input.classList.remove("correct")
        input.classList.add("wrong")
    }
}

function help() {
    input.value = correctAnswer
}


async function main() {
    verbChip = document.getElementById("verbChip")
    tenseChip = document.getElementById("tenseChip")
    personText = document.getElementById("personText")
    controleerButton = document.getElementById("controleer")
    helpButton = document.getElementById("help")
    input = document.getElementById("input")

    jsonData = await readJsonFile("./verbs.json")

    
    params = new URLSearchParams(window.location.search)
    const verbNames = params.get("verbs")?.split(",") || []
    tenses = params.get("tenses")?.split(",") || []
    
    // Filter jsonData.verbs to only include selected verbs
    verbs = jsonData.verbs.filter(verb => verbNames.includes(verb.infinitive))

    correctAnswer = generateNewQuestion()

    controleerButton.addEventListener("click", checkAnswer)    
    input.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            checkAnswer()
        }
    })
    helpButton.addEventListener("click", help)
}

document.addEventListener('DOMContentLoaded', main)
document.addEventListener('page:loaded', main)
let errorCount;
let messages;

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





async function main() {
    const verbChip = document.getElementById("verbChip")
    const tenseChip = document.getElementById("tenseChip")
    const personText = document.getElementById("personText")
    const controleerButton = document.getElementById("controleer")
    const helpButton = document.getElementById("help")
    const input = document.getElementById("input")
    messages = document.getElementById("messages")

    const jsonData = await readJsonFile("./verbs.json")
    
    function generateNewQuestion() {
        // Get random verb
        const verbs = jsonData.verbs
        const randomVerb = verbs[Math.floor(Math.random() * verbs.length)]
        
        // Get random tense
        const tenses = Object.keys(randomVerb.conjugations)
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
    
    let correctAnswer = generateNewQuestion()

    function checkAnswer() {
        if (input.value == correctAnswer) {
            console.log("correct!!!")
            input.classList.remove("wrong")
            input.classList.add("correct")
            setTimeout(() => {
                input.classList.remove("correct")
            }, 500)
            correctAnswer = generateNewQuestion()
        } else {
            console.log("FALSEEEEE!!!!!!!!!!!!!!!!!!")
            input.classList.remove("correct")
            input.classList.add("wrong")
        }
    }

    function help() {
        input.value = correctAnswer
    }

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
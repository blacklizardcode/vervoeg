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




addEventListener("DOMContentLoaded", async (event) => { 
    var verbChip = document.getElementById("verbChip")
    var tenseChip = document.getElementById("tenseChip")
    var personText = document.getElementById("personText")
    var controleerButton = document.getElementById("controleer")
    var input = document.getElementById("input")
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
            correctAnswer = generateNewQuestion()
        }
    }

    controleerButton.addEventListener("click", checkAnswer)
    
    input.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            checkAnswer()
        }
    })
})
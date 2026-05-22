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
    const verbChip = document.getElementById("verbChip")
    const tenseChip = document.getElementById("tenseChip")
    const personText = document.getElementById("personText")
    const controleerButton = document.getElementById("controleer")
    const helpButton = document.getElementById("help")
    const input = document.getElementById("input")
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
})
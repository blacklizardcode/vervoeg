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

function addTenses(verbData, tensesBox) {
    for (const i in verbData.metadata.tenses) {
        const tenseHtml = `<label class="checkbox"><input type="checkbox" name="${verbData.metadata.tenses[i]}"><span class="checkmark"></span>${verbData.metadata.tenses[i]}</label>`
        tensesBox.insertAdjacentHTML("beforeend", tenseHtml)
    }
}

function addVerbs(verbData, irrVerbsBox, regVerbsBox) {
    for (const i in verbData.verbs) {
        let verbsBox
        if (verbData.verbs[i].group == "irregular") {
            verbsBox = irrVerbsBox
        } else if (verbData.verbs[i].group == "regular") {
            verbsBox = regVerbsBox
        }
        const verbHtml = `<label class="checkbox"><input type="checkbox" name="${verbData.verbs[i].infinitive}"><span class="checkmark"></span>${verbData.verbs[i].infinitive}</label>`
        verbsBox.insertAdjacentHTML("beforeend", verbHtml)
    }
}

async function main() {
    const verbData = await readJsonFile("./verbs.json")
    const tensesBox = document.getElementById("tenses")
    const irrVerbsBox = document.getElementById("irrVerbs")
    const regVerbsBox = document.getElementById("regVerbs")

    addTenses(verbData, tensesBox)
    addVerbs(verbData, irrVerbsBox, regVerbsBox)

    doneButton = document.getElementById("doneButton")
    doneButton.addEventListener("click", () => {
        let tenses = []
        let verbs = []
        const tenseCheckboxes = tensesBox.querySelectorAll('input[type="checkbox"]')
        tenseCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                tenses.push(checkbox.name)
            }
        })

        const irrVerbsCheckboxes = irrVerbsBox.querySelectorAll('input[type="checkbox"]')
        irrVerbsCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                verbs.push(checkbox.name)
            }
        })

        const regVerbCheckboxes = regVerbsBox.querySelectorAll('input[type="checkbox"]')
        regVerbCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                verbs.push(checkbox.name)
            }
        })


        
        console.log(tenses)
        console.log(verbs)

        const params = new URLSearchParams()

        params.set("verbs", verbs.join(","))
        params.set("tenses", tenses.join(","))

        window.location.href = "trainer.html?" + params.toString()
    })
}

document.addEventListener("DOMContentLoaded", main)

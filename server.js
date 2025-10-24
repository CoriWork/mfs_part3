const express = require('express')
const app = express()

const PORT = 3001

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    return res.json(persons)
})

app.get('/info', (req, res) => {
    const receivedTime = new Date()
    const peopleCount = persons.length
    res.send(`
        <div>
            <p>Phonebook has info for ${peopleCount} people</p>
            <p>${receivedTime.toString()}</p>
        </div>
    `)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const selectedPerson = persons.find(person => person.id === id)
    if (selectedPerson) {
        return res.json(selectedPerson)
    }
    else {
        return res.status(400).end()
    }
    
})

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
})
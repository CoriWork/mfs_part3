const express = require('express')
const app = express()

app.use(express.json())

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

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    console.log(id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    console.log('body',body)
   const range = 1000000
    const newPerson = {
        id : Math.floor(Math.random() * range),
        name : body.name,
        number : body.number
    }

    if (!body.name || !body.number) {
        return res.status(400).json({
            error : 'content missing'
        })
    }
    persons = persons.concat(newPerson)
    res.json(persons)
})

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
})
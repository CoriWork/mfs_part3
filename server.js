const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')
const person = require('./models/person')
const app = express()

app.use(express.json())

morgan.token('body', (req) => req.method === 'POST' ? JSON.stringify(req.body) : '')
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const PORT = process.env.PORT || 3001

app.get('/api/persons', (req, res) => {
    Person.find({})
        .then(persons => {
            console.log(typeof persons)
            res.json(persons)
        })
})

app.get('/info', (req, res) => {
    Person.find({})
        .then(persons => {
            const receivedTime = new Date()
            const peopleCount = persons.length
            res.send(`
        <div>
            <p>Phonebook has info for ${peopleCount} people</p>
            <p>${receivedTime.toString()}</p>
        </div>
    `)
        })
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    Person.find({id})
    .then(selectedPerson => {
        if(selectedPerson) {
            res.json(selectedPerson)
        }
        else {
            res.status(400).end()
        }
    })
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    Person.delete(id)
    .then(result => {
        console.log(`deleted ${id}`)
        res.status(204).end()
    })
})

// app.post('/api/persons', (req, res) => {
//     const body = req.body
//     const range = 1000000

//     if (!body.name){
//         res.status(400).json({
//             error: 'name missing'
//         })
//         return
//     }

//     if (!body.number){
//         res.status(400).json({
//             error: 'number missing'
//         })
//         return
//     }

//     Person.findOne({name: body.name})
//     .then(existingPerson => {
//         if(existingPerson) {
//             res.status(400).json({
//                 error: 'name already exists'
//             })
//             return
//         }
//         const newPerson = new Person({
//             id: Math.floor(Math.random() * range),
//             name: body.name,
//             number: body.number
//         })
    
//         newPerson.save()
//         .then(savedPerson => {
//             console.log(`saved ${body.name}`)
//             res.json(savedPerson)
//         })
//     })
// })

app.post('/api/persons', async (req, res) => {
    const body = req.body
    const range = 1000000

    if (!body.name){
        res.status(400).json({
            error: 'name missing'
        })
        return
    }

    if (!body.number){
        res.status(400).json({
            error: 'number missing'
        })
        return
    }

    const existingPerson = await Person.findOne({name: body.name})
    console.log(typeof existingPerson)
    if (existingPerson) {
        res.status(400).json({
            error: 'name already exists'
        })
        return
    }
    
    const newPerson = new Person({
        id: Math.floor(Math.random() * range),
        name: body.name,
        number: body.number
    })
    const savedPerson = await newPerson.save()
    res.json(savedPerson)
    return
})

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
})
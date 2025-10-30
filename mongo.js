const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URI

console.log('connecting to' , url)
mongoose.connect(url)
.then((result) => {
    console.log('connected to MongoDB')
}).catch((err) => {
    console.log('fail to connect to MongoDB: ', err.message)
})

const personSchema = mongoose.Schema({
    id: Number,
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    console.log('Usage:')
    console.log('  node mongo.js                # 查看通讯录')
    console.log('  node mongo.js <name> <number>  # 添加联系人')
    process.exit(1)
}

if (process.argv.length === 2) {
    console.log('phone book')
    Person.find({})
    .then(persons => {
        persons.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        });
        mongoose.connection.close()
    })
    return
}

const name = process.argv[2]
const number = process.argv[3]

const generateId = () => {
    return Math.floor(Math.random() * 10000000)
}
const person = new Person({
    id: generateId(),
    name: name,
    number: number
})

person.save()
.then(result => {
    console.log(`added ${name} ${number} to phonebook`)
    mongoose.connection.close()
})

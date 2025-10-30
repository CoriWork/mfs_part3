const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to' , url)
mongoose.connect(url)
.then((result) => {
    console.log('connected to MongoDB')
}).catch((err) => {
    console.log('fail to connect to MongoDB: ', err.message)
});

const personSchema = mongoose.Schema({
    id: Number,
    name: String,
    number: String
})

module.exports = mongoose.model('Person', personSchema)

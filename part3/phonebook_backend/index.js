const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

const Person = require('./models/person')

morgan.token('content', function getContent(request) {
    return request.content
})

const assignContent = (request, response, next) => {
    request.content = JSON.stringify(request.body)
    next()
} 

const requestLogger = (request, response, next) => {
    console.log('Method: ', request.method)
    console.log('Path: ', request.path)
    console.log('Body: ', request.body)
    console.log('---')
    next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(express.json())
app.use(express.static('build'))
app.use(cors())
app.use(requestLogger)
app.use(assignContent)
app.use(morgan(
    ':method :url :status :res[content-length] - :response-time ms :content'
    ))

// let persons = [
//     {
//       name: "Arto Hellas",
//       number: "040-123456",
//       id: 1
//     },
//     {
//       "name": "Ada Lovelace",
//       "number": "39-44-5323523",
//       "id": 2
//     },
//     {
//       "name": "Dan Abramov",
//       "number": "12-43-234345",
//       "id": 3
//     },
//     {
//       "name": "Mary Poppendieck",
//       "number": "39-23-6423122",
//       "id": 4
//     }
//   ]

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.get('/info', (request, response) => {
  Person.countDocuments({}, (err, count) => {
    const header = `<p>
                  Phonebook has info for ${count} people
                  </p>`
    const timestamp = `<p>${new Date()}</p>`
    response.send(header + timestamp)
  })
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  if (body.name === undefined) {
      return response.status(400).json({
          error: 'name missing'
      })
  }
  if (body.number === undefined) {
      return response.status(400).json({
          error: 'number missing'
      })
  }
  // if (persons.some(person => person.name === body.name)) {
  //     return response.status(400).json({
  //         error: 'name must be unique'
  //     })
  // }

  const person = new Person ({
      name: body.name,
      number: body.number,
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
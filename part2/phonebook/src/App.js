import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import './index.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  const messageColor = {
    color: message.includes('removed') ? 'red' : 'green'
  }
  return (
    <div style={messageColor} className="message">
      {message}
    </div>
  )
}

const Person = ({ person, removePerson }) => {
  return(
    <div>
      {person.name} {person.number}
      <button onClick={() => removePerson(person.id)}>delete</button>
    </div>
  )
}

const Persons = ({ filteredPersons, removePerson }) => {
  return (
    <div>{filteredPersons.map(person => 
        <Person key={person.name} person={person} removePerson={removePerson}/>
        )}
    </div>
  )
}

const Filter = ({ filteredName, handleFilteredNameChange }) => {
  return (
    <div>
      filter shown with
      <input 
        value={filteredName} 
        onChange={handleFilteredNameChange}
      />
    </div>
  )
}

const PersonForm = (props) => {
  const addPerson = (event) => {
    event.preventDefault()
    if (props.persons.some(person => person.name === props.newName)) {
      if(window.confirm(`${props.newName} is already added to the phonebook, 
        replace the old number with a new one?`)) {
          const person = props.persons.find(p => p.name === props.newName)
          const changedPerson = { ...person, number: props.newNumber }
          personService
            .update(person.id, changedPerson)
            .then(returnedPerson => {
              props.setPersons(props.persons
                .map(person => person.id !== returnedPerson.id ? person : returnedPerson)
              )
            })
            .catch(error => {
              props.setMessage(
                `${changedPerson.name} was already removed from server`   
              )
              setTimeout(() => {
                props.setMessage(null)
              }, 5000)
            })
            props.setNewName('')
            props.setNewNumber('')
            props.setMessage(
              `Updated number for ${changedPerson.name}`
            )
            setTimeout(() => {
              props.setMessage(null)
            }, 5000) 
            return                   
      } 
      return
    }
    const personObject = {
      name: props.newName,
      number: props.newNumber,
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        props.setPersons(props.persons.concat(returnedPerson))
        props.setNewName('')
        props.setNewNumber('')
      })
    props.setMessage(
      `Added ${personObject.name}`
    )
    setTimeout(() => {
      props.setMessage(null)
    }, 5000)

  }

  return (
    <form onSubmit={addPerson}>
      <div>
        name: 
        <input
          value={props.newName}
          onChange={props.handleNameChange}
        />
        <br/>
        number: 
        <input
          value={props.newNumber}
          onChange={props.handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filteredName, setFilteredName ] = useState('')
  const [ message, setMessage ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const removePerson = id => {
    personService
      .remove(id)
    const reducedPersons = persons.filter(person => person.id !== id)
    setPersons(reducedPersons)
  }

  const filteredPersons = persons.filter(person => (
    person.name
      .toLowerCase()
      .includes(filteredName.toLowerCase())
    )
  )


  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilteredNameChange = (event) => setFilteredName(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter 
        filteredName={filteredName} 
        handleFilteredNameChange={handleFilteredNameChange}
      />
      <h2>add a new</h2>
      <PersonForm
        persons={persons}
        newName={newName}
        newNumber={newNumber}
        setPersons={setPersons}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        setMessage={setMessage}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons 
        filteredPersons={filteredPersons} 
        removePerson={removePerson}
      />
    </div>
  )
}

export default App
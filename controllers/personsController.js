const data = {
  persons: require('../models/persons.json'),
  setPerson: function (data) { this.persons = data }
}

const getAllPersons = (req, res) => {
  res.json(data.persons)
}

const createNewPerson = (req, res) => {
  const newPerson = {
      id: data.persons?.length ? data.persons[data.persons.length - 1].id + 1 : 1,
      firstname: req.body.firstname,
      lastname: req.body.lastname
  }

  if (!newPerson.firstname || !newPerson.lastname) {
      return res.status(400).json({ 'message': 'First and last names are required.' });
  }

  data.setPerson([...data.persons, newPerson]);
  res.status(201).json(data.persons);
}

const updatePerson = (req, res) => {
  const person = data.persons.find(person => person.id === parseInt(req.body.id))
  if (!person) {
    return res.status(400).json({ "message": `person with id ${req.body.id} not found` })
  }
  if (req.body.firstname) {
    person.firstname = req.body.firstname
  }
  if (req.body.lastname) {
    person.lastname = req.body.lastname
  }
  const filteredArr = data.persons.filter(person => person.id !== parseInt(req.body.id))
  const unsortedArr = [...filteredArr, person]
  data.setPerson(unsortedArr.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  res.json(data.persons)
}

const deletePerson = (req, res) => {
  const person = data.persons.find(person => person.id === parseInt(req.body.id))
  if (!person) {
    return res.status(400).json({ "message": `person with id ${req.body.id} not found` })
  }
  const filteredArr = data.persons.filter(person => person.id !== parseInt(req.body.id))
  data.setPerson([...filteredArr])
  res.json(data.persons)
}

const getPersonById = (req, res) => {
  const person = data.persons.find(person => person.id === parseInt(req.params.id))
  if (!person) {
    return res.status(400).json({ "message": `person with id ${req.params.id} not found` })
  }
  res.json(person)
}

module.exports = {
  getAllPersons, 
  createNewPerson, 
  updatePerson, 
  deletePerson, 
  getPersonById
}
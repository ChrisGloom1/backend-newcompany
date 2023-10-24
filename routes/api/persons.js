const express = require('express')
const router = express.Router()
const { 
  getAllPersons, 
  createNewPerson, 
  updatePerson, 
  deletePerson, 
  getPersonById 
} = require('../../controllers/personsController')

router.route("/")
  .get(getAllPersons)
  .post(createNewPerson)
  .put(updatePerson)
  .delete(deletePerson)

router.route("/:id")
  .get(getPersonById)

module.exports = router
const express = require('express')
const router = express.Router()
const path = require('path')

// ^ = begin with a slash, $ = end with a slash, | = or, ()? = optional inside the parenthesis
router.get("^/$|/index(.html)?", (req, res) => {
  // res.sendFile("./views/index.html", { root: __dirname }) - express way
  res.sendFile(path.join(__dirname, "..", 'views', 'index.html')) // node way
})

module.exports = router
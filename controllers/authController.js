const usersDB = {
  users: require('../models/users.json'),
  setUsers: function (data) { this.users = data }
}
const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
  const { user, password } = req.body
  if (!user || !password) return res.status(400).json({ 'message': 'Username and password are required.' })
  const foundUser = usersDB.users.find(person => person.username === user)
  if (!foundUser) return res.sendStatus(401) // 401 = Unauthorized
  // evaluate the password
  const match = await bcrypt.compare(password, foundUser.password)
  if (match) {
    // create JWT's
    res.json({"success": `user ${user} is logged in.`})
  } else {
    res.sendStatus(401)
  }
}

module.exports = { handleLogin }
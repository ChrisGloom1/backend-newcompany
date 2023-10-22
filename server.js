const express = require('express');
const app = express()
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const PORT = process.env.PORT || 3500;

// custom middleware logger
app.use(logger)

// cross origin resource shareing
const whitelist = ["https://www.example.com", "http://127.0.0.1: 5500", "http://localhost:3500"]
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

// built in middlewareto handle url-encoded data
// in other words, form data:
// "content-type: application/x-www-form-urlencoded"
app.use(express.urlencoded({ extended: false }))

// built in middleware for json
app.use(express.json())

// serve static files
app.use(express.static(path.join(__dirname, '/public')))

// ^ = begin with a slash, $ = end with a slash, | = or, ()? = optional inside the parenthesis
app.get("^/$|/index(.html)?", (req, res) => {
    // res.sendFile("./views/index.html", { root: __dirname }) - express way
    res.sendFile(path.join(__dirname, 'views', 'index.html')) // node way
})

app.get("/new-page(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
})

app.get("/old-page(.html)?", (req, res) => {
    res.redirect(301, '/new-page.html') // 302 response code ny default
})

// Route handlers
app.get("/hello(.html)?", (req, res, next) => {
    console.log("Attempted to load hello.html")
    next()
}, (req, res) => {
    res.send("Hello World!")
})

// Chain route handlers
const one = (req, res, next) => {
    console.log("one")
    next()
}

const two = (req, res, next) => {
    console.log("two")
    next()
}

const three = (req, res) => {
    console.log("three")
    res.send("Finished!")
}

app.get("/chain(.html)?", [one, two, three])

// app.use doesn't accept regex as use is used for middleware. app.all is used for routing and will accept regex.
app.all("*", (req, res) => {
    res.status(404)
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts("json")) {
        res.json({ error: "404 - Not found" })
    } else {
        res.type("txt").send("404 - Not found")
    }
})

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
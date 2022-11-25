const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/api/contacts')
const userRouter = require('./routes/api/users')
const avatarsRouter = require('./routes/api/avatars')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use('/public',express.static('public'))

app.use('/api/contacts', contactsRouter)
app.use('/api/users', userRouter)
app.use('/api/avatars', avatarsRouter)

app.use((req, res) => { 
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
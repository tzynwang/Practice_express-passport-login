const express = require('express')
const router = express.Router()

const home = require('./modules/home')
router.use('/', home)

const users = require('./modules/users')
router.use('/users', users)

const auth = require('./modules/auth')
router.use('/auth', auth)

const todos = require('./modules/todos')
router.use('/todos', todos)

module.exports = router

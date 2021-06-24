const express = require('express')
const router = express.Router()

const home = require('./modules/home')
router.use('/', home)

const user = require('./modules/user')
router.use('/user', user)

module.exports = router

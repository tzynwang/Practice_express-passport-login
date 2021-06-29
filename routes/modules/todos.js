const express = require('express')
const router = express.Router()

// DB
const Todo = require('../../models/todo')

// check if user has logged in
const { isLoggedIn } = require('../../config/auth')
router.use(isLoggedIn)

// duration calculation
const { spendTime } = require('../../config/duration')

router.get('/', async (req, res) => {
  // { userId: req.user.id }
  const todos = await Todo.find({ userId: req.user.id }).lean()
  res.render('todos', { todos, user: req.user.username })
})

router.get('/add', (req, res) => {
  res.render('add')
})

router.post('/', async (req, res) => {
  const content = req.body.content
  const newTodo = new Todo({
    userId: req.user.id,
    content,
    createdDate: Date.now() // this get 1624878877383
    // new Date(dateNumber).toISOString() get dateString
  })
  await newTodo.save()
  res.redirect('/todos')
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  try {
    const todo = await Todo.findById(id).lean()
    const spend = spendTime(todo.duration)
    res.render('show', { todo, spend })
  } catch (error) {
    console.error(error)
  }
})

router.get('/:id/edit', async (req, res) => {
  const id = req.params.id
  try {
    const todo = await Todo.findById(id).lean()
    res.render('edit', { todo })
  } catch (error) {
    console.error(error)
  }
})

router.post('/:id/edit', async (req, res) => {
  const id = req.params.id
  const { content, isDone } = req.body

  const toUpdate = await Todo.findOne({ _id: id })
  // console.log(toUpdate)

  try {
    if (content.length) toUpdate.content = content
    if (isDone && !toUpdate.isDone) {
      toUpdate.isDone = true
      toUpdate.endDate = Date.now()
      toUpdate.duration = toUpdate.endDate - toUpdate.createdDate
    }
    if (!isDone && toUpdate.isDone) {
      toUpdate.isDone = false
      toUpdate.endDate = toUpdate.duration = ''
    }

    await toUpdate.save()

    res.redirect(`/todos/${id}`)
  } catch (error) {
    console.error(error)
  }
})

module.exports = router

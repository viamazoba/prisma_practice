const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()
const port = 8080

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

// CRUD
// Create - Read - Update - Delete
// POST   - GET  - PUT    - DELETE
app.get('/api/healthcheck', (_, res) => {
  res.status(200).json('Server OK')
})

app.get('/api/user', async (_, res) => {
  const user = await prisma.user.findMany()
  return res.status(200).json(user)
})

app.get('/api/user/:id', async (req, res) => {
  const {id} = req.params
  const user = await prisma.user.findMany(
    {
      where:{
        id
      }
    }
  )
  return res.status(200).json(user)
})

app.post('/api/user', async (req, res) => {
  const data = req.body
  const user = await prisma.user.create(
    {
      data:{
        ...data
      }
    }
  )
  return res.status(200).json(user)
})

app.put('/api/user/:id', async (req, res) => {
  const {id} = req.params
  const data = req.body
  const user = await prisma.user.update(
    {
      where:{
        id
      },
      data:{
        ...data
      }
    }
  )
  return res.status(200).json(user)
})


app.delete('/api/user/:id', async (req, res) => {
  const {id} = req.params
  const user = await prisma.user.delete(
    {
      where:{
        id
      }
    }
  )
  return res.status(200).json(user)
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
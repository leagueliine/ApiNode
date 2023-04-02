const router = require('express').Router()

const Person = require('../models/Person')


router.post('/', async (req, res) => {

  //desctructing javascript
  const { name, salary, approved } = req.body
  if (!name) {
    res.status(422).json({ error: 'o nome é obrigatório' })
    return
  }

  const person = {
    name,
    salary,
    approved
  }

  try {

    await Person.create(person)

    res.status(201).json({ message: 'pessoa inserida com sucesso' })

  } catch (error) {
    res.status(500).json({ error: error })
  }
})

//read - leitura de dados
router.get('/', async (req, res) => {
  try {

    const peaple = await Person.find()
    res.status(200).json(peaple)

  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.get('/:id', async (req, res) => {
  //extrair o dado da requisição, pela url req.params
  const id = req.params.id

  try {

    const person = await Person.findOne({ _id: id })

    if (!person) {
      res.status(422).json({ message: "usuário não encontrado!" })
      return
    }

    res.status(200).json(person)

  } catch (error) {
    res.status(500).json({ error: error })

  }

})

//Update - atualização de dados(put / patch)
router.patch('/:id', async (req, res) => {

  const id = req.params.id

  const { name, salary, approved } = req.body

  const person = {
    name,
    salary,
    approved,
  }

  try {

    const updatedPerson = await Person.updateOne({ _id: id }, person)

    if (updatedPerson.matchedCount == 0) {
      res.status(422).json({ message: "usuário não encontrado!" })
      return
    }

    res.status(200).json(person)

  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.delete('/:id', async (req, res) => {

  const id = req.params.id

  const person = await Person.findOne({ _id: id })

  if (!person) {
    res.status(422).json({ message: "usuário não encontrado!" })
    return
  }

  try {

    await Person.deleteOne({ _id: id })
    res.status(200).json({ message: "Usuário removido com sucesso." })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

module.exports = router
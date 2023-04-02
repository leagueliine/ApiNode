const express = require('express');
const mongoose = require('mongoose');
const app = express();



//forma de ler JSON / MiddleWares
app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

//rotas da api 
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

// rota inical / endpoint
app.get('/', (req, res) => {

  //mostrar req
  res.json({ message: 'oi express!' })
})

const DB_USER = 'luiz'
const DB_PASSWORD = encodeURIComponent('4p3Z9djJWPAEzSTn')

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ndplc9j.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => {
    console.log('conectamos ao mongodb')
    app.listen(3003)
  })
  .catch((err) => console.log(err))


//4p3Z9djJWPAEzSTn - senha cluster
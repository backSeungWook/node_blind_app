const express = require('express')
const cors = require('cors')
const { article,user,company,board, comment,reply } = require('./router')
const app = express()
const PORT = 4000

app.use(cors())
app.use(express.json()) //req.body
app.use(express.urlencoded({extended:true}))

// 기능별 라우터 추가
app.use(article)
app.use(board)
app.use(company)
app.use(comment)
app.use(user)
app.use(reply)

app.get('/',(req,res) =>{
  res.send('Server is running!')
})



app.listen(PORT,'localhost',() =>{
  console.log(`App listen at http://localhost:${PORT}`)
})


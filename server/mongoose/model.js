require("dotenv").config();

const mongoose = require('mongoose')
const schema = require('./schema')


const db = mongoose.connection;
//즉시 함수로
const model = (() =>{
  db.on('error',console.error)
  db.on('open',() =>{
    console.log('Connectiong mongodb!~')
  })
  // 몽고디비 앱 엑세스 주소
  mongoose.connect(
    `mongodb+srv://test:${process.env.DB_PASSWORD}@cluster0.zakxp.mongodb.net/blind?retryWrites=true&w=majority`
  )

  // 스키마 연결
  const model = {}
  for (let key in schema){
    model[key] = mongoose.model(key,schema[key])
  }
  return model
  

})();

module.exports = model
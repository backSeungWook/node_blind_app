require("dotenv").config();

const mongoose = require('mongoose')
const schema = require('./schema')


const db = mongoose.connection;
//한번만 실행 한번만 샐행 되는 이유는 함수가 익명 함수이며,
//익명의 함수를 생성과 동시에 실행 하기 때문
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
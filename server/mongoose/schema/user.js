const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')// hashedPassword 암호화


const User = new Schema({
  email:{type:String,required:true,unique:true},
  hashedPassword:{type:String,required:true},
  salt:{type:String,required:true},
  createdAt:{type:Date,default:Date.now, required:true},
  nickname:{type:String,required:true,unique:true},
  company:{type:Schema.Types.ObjectId,ref:'Company'}

})

// password는 가상 선택자
User.virtual('password').set(function(password){
  this._password = password
  // 랜덤으로 생성되는 값 
  //(단뱡항 암호화시 전달 받은 패스워드와 
  // 규칙으로의해 생성된Salt값을 같이 단방향 암호화 해서 디비에 저장)
  this.salt = this.makeSalt()
  this.hashedPassword = this.encryptPassword(password)
})


// 살트 생성 함수
User.method('makeSalt', () => {
  return Math.round(new Date().valueOf() * Math.random()) + 'Hello Fastcampus'
})

// 해시된 비밀번호 생성 함수
User.method('encryptPassword', function(plainPassword) {
  return crypto.createHmac('sha256',this.salt).update(plainPassword).digest('hex')
})

// 사용자 인증 함수
User.method('authenticate',function (email,plainPassword) {
  const inputPassword =  this.encryptPassword(plainPassword)
  return inputPassword === this.hashedPassword
})

module.exports = User
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { user } = require('.')

const { User } = require('../mongoose/model')

// 로그인 요청
router.post('/user/login',async (req,res) =>{
  const {email,password} = req.body

  const loginUser = await User.findOne({email:email})
  
  if(!loginUser){
    return res.send({
      error:true,
      msg:'존재하지 않는 이메일'
    })
  }

  const correctPassword =  await loginUser.authenticate(password)
  
  if(!correctPassword){
    return res.send({
      error:true,
      msg:'패스워드 불일치'
    })
  }

  //리퀘스트로 받음.
  const secret = req.app.get('jwt-secret')
  // jwt.sign(payload,secret,{option})
  const token = jwt.sign({
    id:loginUser._id,
    email:loginUser.email,
    nickname:loginUser.nickname
  },secret,{
    expiresIn:'7d', //jwt가 언제 만료 되는지 7d = 7일
    issuer:'blind_cloen_coding', // 발행인
    subject:'auth'
  })

  res.send({
    email:loginUser.email,
    nickname:loginUser.nickname,
    token,
    error:false,
    msg:'로그인 성공'
  })
})

// 사용자 추가
router.post('/user/create',async (req,res) => {
  const {nickname,company,email,password} = req.body
  const newUser = await User({
    email,
    nickname,
    password,
    company,
  }).save()
 
  res.send(newUser._id ? true:false)
})


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvQGZhc3RjYW1wdXMuY29tIiwibmlja25hbWUiOiLtjKjsiqTtirjsuqDtjbzsiqQiLCJpYXQiOjE2Mzk1NzQwOTksImV4cCI6MTY0MDE3ODg5OSwiaXNzIjoiYmxpbmRfY2xvZW5fY29kaW5nIiwic3ViIjoiYXV0aCJ9.hY4RMGdH2_QwnbQTjnGLTO4rOPryxmTiXGp8kb24rgc

// 사용자 토큰 체크
router.get('/user/token', (req,res)=>{
  const { authorization } = req.headers
  if(!authorization){
    return res.send(false)    
  }

  const token = authorization.split(" ")[1]
  const secret = req.app.get('jwt-secret')
  // 복호화
  const verify = jwt.verify(token,secret,(err,data) =>{
    if(err){
      res.send(err)
    }
    res.send({
      email:data.email,
      nickname:data.nickname
    })
  })
})

// 사용자 정보 변경

// 사용자 삭제

// 프로필 이미지 추가


module.exports=router
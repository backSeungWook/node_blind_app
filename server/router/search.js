const express = require('express')
const router = express.Router()

const { Article  } = require('../mongoose/model')

// 게시글 검색 결과를 리턴하는 라우트
router.get('/search/:q',async (req,res) =>{
  const {q} = req.params
   //몽고스에서의 $regex는 Mysql의 Like 검색
  const article = await Article.find({title:{ $regex:q }}).populate({
    path:'author',
    populate:{
      path:'company'
    }
  })
  
  res.send({article , error:false, msg:'성공'})
})


module.exports=router
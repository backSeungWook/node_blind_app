const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { Comment,Article } = require('../mongoose/model')


// 댓글 생성
router.post('/comment/create',async (req,res) =>{
  const {  article, content} = req.body
  const { authorization } = req.headers
  
  if(!authorization){
    return res.send({
      error:true,
      msg:'토큰이 존재 하지 않음.',
    })    
  }
  
  const token = authorization.split(" ")[1]
  const secret = req.app.get('jwt-secret')
  
  jwt.verify(token,secret,async (err,data) =>{
    if(err){
      res.send(err)
    }
    
    // 댓글 등록
    const newComment = await Comment({
      author:data.id,
      article,
      content
    }).save()

    // article commentCount +1 증가
    await Article.findOneAndUpdate(
      {_id:article},
      {
        $inc: {commentCount: 1} //$inc => commentCount=commentCount+1
      }
    )

    res.send(newComment._id ? true:flase)

  })

})

// 댓글 수정
router.patch('/comment/update',async (req,res) =>{
  const { id, author, content} = req.body
  const updateComment = await Comment.findOneAndUpdate(
    {
      _id:id,
      author
    },
    {
      content
    },{new:true}) // new:ture 옵션은 업데이트 된 데이터를 리턴

  res.send(updateComment)
    
})

// 댓글 완전 삭제(HARD DELETE)
router.delete('/comment/hard',async (req,res) =>{
  const { id, author} = req.body
  const deletedComment = await Comment.deleteOne({
      _id:id,
      author
    })
    
  res.send(deletedComment)
    
})

// 댓글 소프트 삭제(SOFT DELETE)
router.delete('/comment/soft',async (req,res) =>{
  const { id, author} = req.body
  const deletedComment = await Comment.findOneAndUpdate({
      _id:id,
      author
    },{
      deleteTime: new Date().getTime() + (30 * 24 * 60 * 60 * 1000) // 30일 후의 시간이 저장
    })
    
  res.send(deletedComment)
    
})

module.exports=router
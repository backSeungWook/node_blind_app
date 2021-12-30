//대댓글
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { Comment, Reply } = require('../mongoose/model')


// 대댓글 생성
router.post('/reply/create',async (req,res) =>{
  const {  comment, content} = req.body
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
        
    const newReply = await Reply({author:data.id,comment,content}).save()

    const updateCount =  await Comment.findOneAndUpdate(
      {_id:comment},
      {
        $inc: {replyCount: 1} //$inc => commentCount=commentCount+1
      }
    )

    res.send(newReply._id ? true:flase)
  })  
})

// 대댓글 수정
router.patch('/reply/update',async (req,res) =>{
  const { id, author, content} = req.body
  const updateReply = await Reply.findOneAndUpdate(
    {
      _id:id,
      author
    },
    {
      content
    },{new:true}) // new:ture 옵션은 업데이트 된 데이터를 리턴

  res.send(updateReply)
    
})

// 대댓글 완전 삭제(HARD DELETE: DB에도 존재하지 않게 만드는 것)
router.delete('/reply/hard',async (req,res) =>{
  const { id, author} = req.body
  const deletedReply = await Reply.deleteOne({
      _id:id,
      author
    })
    
  res.send(deletedReply)
    
})

// 대댓글 소프트 삭제(SOFT  DELETE: 일반 사용자는 보지 못하는 상태, 일정 기간이 지나면 삭제될 상태)
router.delete('/reply/soft',async (req,res) =>{
  const { id, author} = req.body
  const deletedReply = await Reply.findOneAndUpdate({
      _id:id,
      author
    },{
      deleteTime: new Date().getTime() + (30 * 24 * 60 * 60 * 1000) // 30일 후의 시간이 저장
    })
    
  res.send(deletedReply)
    
})

module.exports=router
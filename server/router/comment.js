const express = require('express')
const router = express.Router()

const { Comment } = require('../mongoose/model')


// 댓글 생성
router.post('/comment/create',async (req,res) =>{
  const { author, article, content} = req.body
  const newComment = await Comment({author,article,content}).save()

  res.send(newComment._id ? true:flase)
    
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
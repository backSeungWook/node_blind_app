const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const { Article , Comment } = require('../mongoose/model')

// 개별 게시글 가져오는 라우트
router.get('/article/:key',async (req,res) =>{
  const {key} = req.params
  const article = await Article.findOne({key:key})
    .populate({
      path:'author',
      populate:{path:'company'}
    })
    .populate('board')
  const comment = await Comment.find({article:article._id})
  res.send({article:{
    ...article._doc,
    author:{
      ...article.author._doc,
      nickname: `${article.author._doc.nickname[0]}${"*".repeat(article.author._doc.nickname.length -1)}`
    }
  },comment})
})

// 게시글 추가
router.post('/article/create', async (req,res) =>{
  const { title, content, board } = req.body
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
    
    console.log(data)
    const payload = {author:data.id,title,content,board}
    const newArticle = await Article(payload).save()
    res.send(newArticle)

  })  
})

//게시글 수정
router.patch('/article/update',async (req,res) =>{
  const { id, author, content} = req.body
  const updateArticle = await Article.findOneAndUpdate(
    {
      _id:id,
      author
    },
    {
      content
    },{new:true}) // new:ture 옵션은 업데이트 된 데이터를 리턴

  res.send(updateArticle)
    
})

// 게시글 완전 삭제(HARD DELETE)
router.delete('/article/hard',async (req,res) =>{
  const { id, author} = req.body
  const deletedArticle = await Article.deleteOne({
      _id:id,
      author
    })
    
  res.send(deletedArticle)
    
})

// 게시글 소프트 삭제(SOFT DELETE)
router.delete('/article/soft',async (req,res) =>{
  const { id, author} = req.body
  const deletedArticle = await Article.findOneAndUpdate({
      _id:id,
      author
    },{
      deleteTime: new Date().getTime() + (30 * 24 * 60 * 60 * 1000) // 30일 후의 시간이 저장
    })
    
  res.send(deletedArticle)
    
})

module.exports=router
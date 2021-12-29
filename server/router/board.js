const express = require('express')
const router = express.Router()

const { Article ,  Board } = require('../mongoose/model')


// 메인에서 여러 게시판 글을 모아서 보여주는 라우트
router.get('/main',async (req,res) =>{
  
  const board = await Board.find()
  if(!Array.isArray(board)){
    res.send({
      error:true,
      msg:'게시판을 발견할 수 없음'
    })
  }

  let mainContent = []
  Promise.all(board.map(async b => {
    const recentArticles = await Article.find({board:b._id})
    if(!Array.isArray(recentArticles)){
      return false
    }
    mainContent.push({
      ...b._doc,
      content:recentArticles
    }) 
    return
  })
  ).then( () =>{
    
    res.send({
      content:mainContent,
      error:false,
      msg:'성공'
    })
  }).catch((error) =>{
    console.error(error)
    res.send({
      content:null,
      error:true,
      msg:'서버 에러'
    })
  })
})

// 게시판 목록을 불러오는 라우트
router.get('/board/list', async (req,res) =>{
  const board = await Board.find()
  console.log('board/list ',board)
  res.send(board)
})

// 게시판별 게시글을 가져오는 라우트
router.get('/board/:slug',async (req,res) =>{
  const {slug} = req.params
  const {lastIndex} = req.query // 무한 스크롤 구현시 사용

  const board = await Board.findOne({slug})
  if(!board._id){
    return res.send({
      article:[],
      error:true,
      msg:'존재하지 않는 게시판'
    })
  }
  const article = await Article.find( {board:board._id}).populate({
    path:'author',
    populate:{path:'company'}
  })  //.populate("author") => 외래키 참조(즉 조인) 

  // map 함수 시 ._doc
  const fromatedArtilce = article.map( v =>{
    return{
      ...v._doc,
      author:{
        ...v._doc.author._doc,
        nickname: `${v._doc.author.nickname[0]}${"*".repeat(v._doc.author._doc.nickname.length -1)}`
      }
    }
  })

  res.send({article:fromatedArtilce,error:false,msg:'성공'})
})

//관리자: 게시판 추가
router.post('/board/create', async (req,res) => {
  const {title,slug} = req.body
  const newBoard = await Board({
    title,
    slug,
  }).save()

  res.send(newBoard._id ? true : false)
})

module.exports=router


#  Server
.env 파일 생성 후 DB_PASSWORD 지정

# 라우터 설정
router/`기능별 라우터 설정`
```js
// 기능별 라우터 추가
app.use(article) // 사용자가 작성한 게시글
app.use(board) // 각각의 게시판
app.use(company) // 회사 정보
app.use(comment) // 게시글 안에 있는 댓글
app.use(user) // 사용자 정보
app.use(reply) // 게시글 안에 있는 댓글의 대댓글
```

# 21.12.15(수)
## index.js
```js
// JWT 시크릿 설정(리퀘스트로 보낼수 있음)
app.set('jwt-secret',SECRET)
```         

# 21.12.28(화)
## board.js
`populate` : mysql에서의 조인 기능
```js
...
  const article = await Article.find( {board:board._id}).populate({
    path:'author',
    populate:{path:'company'}
  })  //.populate("author") => 외래키 참조(즉 조인)
... 
```
## search.js
`$regex` : Mysql의 Like 검색  
```js
//몽고스에서의 $regex는 Mysql의 Like 검색
const article = await Article.find({title:{ $regex:q }}) 
```
## 몽고스 - auto_increment
```js
//예시는 article.js
const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
...
const Article = new Schema({
  ...
})
Article.plugin(AutoIncrement, {inc_field: 'key'})
module.exports = Article
```

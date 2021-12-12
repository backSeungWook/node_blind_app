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
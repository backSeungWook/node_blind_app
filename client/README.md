# client

# 21.12.15(수)
## layouts/default.vue

NUXT는 서버와 브라우저가 같이 실행 되기 때문에 프로세스가 서버 일 때 아래 로직이 실행되면 에러가 뜬다   
그래서 프로세스가 브라우저 일 때만 실행(process.browse)  
```js
async initLogin(){
   if(process.browser){
     ...
   }
   ...
}
```
## plugins/api.js
 nuxt.config.js 에 plugins에 추가 하면 this.$api.~~~ 로 사용 가능 즉. $로 직접 호출 가능.
```js
// plugins/api.js
export default function ({$axios}, inject){
  if(process.browser){
    const token = localStorage.getItem('token')
 
    //헤더로 통신하기 위한 API
    const api = $axios.create({
      headers:{
        Authorization:`Beare ${token}`
      }
    })

    api.setBaseURL('http://localhost:4000')
    inject('api',api) // => $api 로 $ 로 접근 할 수 있게 
  }
}

//nuxt.config.js
...
plugins: [
  "@plugins/api.js"
],
...
```

## icon
https://vue-feather-icons.egoist.sh/

## `무한 스크롤`
```
npm i vue-infinite-loading
```
plugins > infinite.js 파일 생성
```js
// infinite.js
import Vue from 'vue'
import InfiniteLoading from 'vue-infinite-loading'

Vue.use(InfiniteLoading)
```
infinite는 SSR에서 document를 찾을 수없으므로 SSR에서는 사용 안함 속성 추가
```js
// nuxt.config.js
 plugins: [
    ...
    {
      src:"@plugins/infinite.js",
      ssr:false //서버사이드랜더링에서는 사용 안함.
    }
  ],
```
```js
// topics > _id.vue
....
</section>   
  <infinite-loading @infinite="getBoardArticleList" ></infinite-loading>
</div>
...

methods:{
  ...
  ...
  //@infinite=함수는 인자값으로 state값을 받음
  getBoardArticleList($state){
    if(process.browser){
      // infinite 무제한으로 돌 수 있기 때문에 setTimeout 지정
      setTimeout( async () =>{

        if(this.articleList.length > 0){
          this.lastIndex = this.articleList[this.articleList.length -1]._id
        }
        const data = await this.$api.$get(`/board/${this.$route.params.id}?lastIndex=${this.lastIndex}`)
        
        //더 이상 로딩 할게 없으면
        if(data.article.length === 0){
          $state.complete()
        }else{
          //새로 들어온 데이터랑 기존 데이터 병합
          this.articleList = this.articleList.concat(data.article)
          $state.loaded()
        }
      },100)
    } 
  }
}
```
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

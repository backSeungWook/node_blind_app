// nuxt.config.js 에 plugins 쪽에 추가

export default function ({$axios}, inject){
  if(process.browser){
    const token = localStorage.getItem('token')
 

    const api = $axios.create({
      headers:{
        Authorization:`Beare ${token}`
      }
    })

    api.setBaseURL('http://localhost:4000')
    inject('api',api) // => $api 로 $ 로 접근 할 수 있게 
  }
}
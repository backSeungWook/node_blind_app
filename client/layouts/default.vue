<template>
  <div>
    <GNB />
    <Nuxt />
  </div>
</template>

<script>
export default {
  created(){
    this.initLogin()
    
  },
  methods:{
    async initLogin(){
      /* process.browse NUXT는 서버와 브라우저가 같이 실행 되기 때문에 프로세스가 서버 일 때 아래 로직이 실행되면 에러가 뜬다 
       그래서 프로세스가 브라우저 일 때만 실행 */
      if(process.browser){
        const token = localStorage.getItem('token')
        if (!token) return

        //$api => plugins/api.js
        const data = await this.$api.$get('/user/token')

        if(!data.email){
          return
        }

        this.$store.commit('user/SET_USER',{
          email:data.email,
          nickname:data.nickname,
          token
        })
      }
    }
  }
}
</script>

<style>

</style>
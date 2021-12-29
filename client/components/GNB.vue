<template>
  <div class="nav-container">
    <nav>
    <div class="side-block">
      <nuxt-link to='/' id="logo-btn">
        <img src="/logo/main.png" alt="mainLogo">
      </nuxt-link>
      <nuxt-link to='/' :class="['text-menu', $route.name === 'index' && 'active']">
        홈
      </nuxt-link>
      <nuxt-link to='/company' :class="['text-menu', $route.name === 'company' && 'active']">
        기업 리뷰
      </nuxt-link>
    </div>

    <div class="side-block">
      <small-searchbar />

      <!-- prevent는 a 태드나 submit태그를 누르게 되면 창이 새로고침 되는데
           preventDefault()는 이런 동작을 막아준다.-->           
      <a @click.prevent='clickWritingButton' id="write-btn">글쓰기</a>
      <a @click.prevent='clickLoginButton' id="login-btn">
        {{this.user.email ? '로그아웃' : '로그인'}}
      </a>
    </div>

    <login-modal />
    <writing-modal />
  </nav>
  </div>
</template>

<script>
import LoginModal from '@/components/Modal/Login'
import WritingModal from '@/components/Modal/Writing'
import SmallSearchbar from '@/components/GNB/SmallSearchbar'
import { mapState } from 'vuex'

export default {
  components:{
    LoginModal,
    WritingModal,
    SmallSearchbar
  },
  computed:{
    ...mapState(['user'])
  },
  methods:{
    clickWritingButton(){
      if(!this.user.email){
        this.$store.commit('modal/SET_LOGIN_MODAL_OPEN')
      }
      this.$store.commit('modal/SET_WRITING_MODAL_STATE',true)
    },
    clickLoginButton(){
      if(!this.user.email){
        this.$store.commit('modal/SET_LOGIN_MODAL_OPEN')
        return
      }
      this.logout()
    },
    logout(){
      this.$store.commit('user/SET_USER',{
        email:null,
        nickname:null
      })
    },
  }
}
</script>

<style lang='scss' scoped>
.nav-container{
  border-bottom: 1px solid #d4d4d4;
}
nav{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  
  margin: auto;
  padding: 0 20px;
  max-width: 1100px;
  .side-block{
    display: flex;
    height: 100%;
    align-items: center;
    #logo-btn{
      margin-right: 50px;
    }
    .text-menu{
      font-size: 20px;  
      margin-right: 30px;
      color: #222;
      
    }
   
    #write-btn{
      background: rgb(218,50,56);
      color: white;
      font-size: 14px;  
      height: 40px;
      margin-left: 10px;
      width: 82px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
    }
    #login-btn{
      background: white;
      color: rgb(34,34,34);
      font-size: 14px;  
      border: solid 1px rgb(212,212,212);
      height: 40px;
      margin-left: 10px;
      width: 82px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
    }
  }
}


</style>
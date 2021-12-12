<template>
  <nav>
    
    <div class="left-side">
      <nuxt-link to='/'>
        <img src="/logo/main.png" alt="mainLogo">
      </nuxt-link>
      <nuxt-link to='/'>
        홈
      </nuxt-link>
      <nuxt-link to='/company'>
        기업 리뷰
      </nuxt-link>
    </div>

    <div class="right-side">
      <small-searchbar />

      <!-- prevent는 a 태드나 submit태그를 누르게 되면 창이 새로고침 되는데
           preventDefault()는 이런 동작을 막아준다.-->           
      <a @click.prevent='clickWritingButton'>글쓰기</a>
      <a @click.prevent='clickLoginButton'>로그인</a>
    </div>

    <login-modal />
    <writing-modal />
  </nav>
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
    },
    clickLoginButton(){
      if(!this.user.email){
        this.$store.commit('modal/SET_LOGIN_MODAL_OPEN')
      }
    }
  }
}
</script>

<style>

</style>
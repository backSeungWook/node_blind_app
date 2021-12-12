<template>
  <div v-if='modal.login.show' class='modal-outside'>
    <div id="login-modal">
      <div class="head">        
        <h5>블라인드 OTP 안전 인증</h5>
        <a @click.prevent="$store.commit('modal/SET_LOGIN_MODAL_CLOSE')" class='close-btn'>
          <img src alt>
        </a>
      </div>
      <div class="body">
        <p>블라인드 앱의 마이페이지 > 블라인드 웹 로그인 메뉴에서 아래 생성된 일회용 인증코드 8자리를 입력하시면 웹에서도 모든 기능을 이용할 수 있습니다.</p>
        <div class="info">블라인드 OTP</div>
        <button class="otp-btn">U - 460 - 6051</button>
        <div class="left-time">남은 시간: {{displayTime}}</div>
      </div>
      <div class="foot">
        <a @click.prevent=''>
          블라인드에 처음이신가요?
        </a>
      </div>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'
export default {
  data(){
    return{
      leftTime:180,
      displayTime:'3분'
    }
  },
  created(){
    setInterval(() =>{
      this.timeModifier()
    },1000)
  },
  methods:{
    timeModifier(){
      this.leftTime -= 1
      if(this.leftTime <= 0){
        this.leftTime =180
        this.displayTime= '3분'
      }else if(this.leftTime >= 120){
        this.displayTime=`2분 ${this.leftTime - 120}초`
      }else if(this.leftTime >= 60){
        this.displayTime=`1분 ${this.leftTime - 60}초`
      }else{
        this.displayTime=`${this.leftTime}초`
      }
    }
  },
  computed:{ ...mapState(['modal'])}
}
</script>

<style lang='scss' scoped>
#login-modal{
  background: white;
  width:520px;
  .head{
    color:rgb(34,34,34);
    font-size:18px;
    font-weight:700;
    padding:23px 30px;
    border-bottom: solid 1px rgb(223, 225, 228);
    h5{
      margin:0;
    }
  }
  .body{
    font-size:16px;
    padding:0 30px;
    line-height: 24px;
    p{
      padding: 20px 0;
      margin:0;
    }
    .info{
      color: rgb(148,150,155);
      font-size: 14px;
      letter-spacing:-0.1px;
      margin:20px 0 30px;
      line-height:21px;
    }
    .otp-btn{
      display:flex;
      justify-content: center;
      align-items: center;
      background: rgb(55, 172, 201);
      border:none;
      color:white;
      font-size: 40px;
      font-weight: 400;
      width: 100%;
      height: 82px ;
    }
    .left-time{
      text-align:center;
      color: rgb(55, 172, 201);
      font-size: 14px;
      font-weight: 700;
      margin-top:16px;

    }
  }
  .foot{
    color:rgb(160,160,174);
    font-size:14px;
    line-height:17.5px;
    text-align:center;
    text-decoration: underline;
    padding:30px;
  }
}
</style>


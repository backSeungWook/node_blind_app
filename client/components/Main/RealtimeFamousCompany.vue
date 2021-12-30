<template>
  <!--측변 네비게이션 aside를 많이 사용. -->
  <aside>
    <div class="blboard_banner">
      <p>
        <a href="https://teamblindhub.com/overview" target="_blank" rel="noreferrer">
          <span>블라인드 유저를 위한<br>
            <em class="h1">기업별 인기 채용 모음집</em> 
          </span>
        </a>
        
      </p>
    </div>
    <div class="lst-ranking">
      <div class="head">
        실시간 인기 회사
      </div>
      <ol>
        <li v-for="(c,i) in companyList" :key="c._id">
          <em>{{i+1}}</em>
          {{c.name}}
        </li>
      </ol>
      <p>
        <InfoIcon size="1x"/>
        <span style="margin-left:5px;">블라인드에서 실시간으로 많이 검색된 회사 순위</span>
      </p>
    </div>

  </aside>
</template>

<script>
import { InfoIcon } from 'vue-feather-icons'

export default {
  data(){
    return{
      companyList:[]
    }
  },
  created(){
    this.getRealtimeFamousCompany()
  },
  methods:{
    async getRealtimeFamousCompany(){
      if(process.browser){
        const data = await this.$api.$get('/company/list/famous')
        this.companyList = data
      }
    }
  },
  components:{
    InfoIcon
  }
}
</script>

<style lang="scss" scoped>
aside{
  width: 300px;
  margin-left: 64px;
  
  padding: 22px 0 14px;
  
  height: fit-content;
  display: block;
  .lst-ranking {
    margin-bottom: 24px;
    padding: 22px 21px 14px;
    background-color: #f8f8f8;
    
    .head{
      font-weight: 700;
      font-size: 18px;
      padding: 0 0 8px 10px;
      background: #f8f8f8;

    }
    ol{
      padding:0 0 0 5px; 
      margin: 0;
      li{
        padding: 5px, 3px;
        line-height:25px;
        vertical-align: middle;
        list-style: none;
        em{
          display: inline-block;
          width: 20px;
          margin-right: 5px;
          font-weight: 700;
          color: #94969b;
          text-align: center;
          line-height: 20px;  
          vertical-align: middle;
        }
      }
    }
    p{
      margin-top: 4px;
      padding: 9px 0 8px;
      color:#94969b;
      font-size:11px;
      letter-spacing: -0.5px;
      text-align: center;
    }
  }
  
  .blboard_banner{
    
    margin: 0 0 24px;
    overflow: hidden;
    display: block;
    p {
      background-color: #d5f3ff;
      background-image: url(https://d2u3dcdbebyaiu.cloudfront.net/img/www_kr/bg_blboard.png);
      background-repeat: no-repeat;
      background-position: 50% 100%;
      background-size: 300px 70px;
      font-size: 15px;
      font-weight: 700;
      line-height: 1.48em;
      text-align: center;
      a{
        display: block;
        padding: 16px 24px 14px;
        span{
          display: inline-block;
          width: 100%;
          max-width: 315px;
          text-align: left;
          .h1{
            color: #00b2ff;
            font-style: normal;
          }
        }
      }
    }
  }
}


</style>
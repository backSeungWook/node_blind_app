<template>
  <div class="board-container">
    <section v-if="boardList.length > 0" class="board">
      <nuxt-link 
        v-for="b in boardList" :key="b._id" 
        :class="['board-item', $route.params.id === b.slug && 'active']" 
        :to="{
          name:'topics-id',
          params:{  
            id:b.slug
          }
      }">
        {{b.title}}
      </nuxt-link>
    </section>
    
    <section class="article-list">
      <global-article-card v-for="a in articleList " :article="a" :key="a._id" />      
      
    </section>   
    <infinite-loading @infinite="getBoardArticleList" ></infinite-loading>
  </div>
</template>

<script>

export default {
  data(){
    return{
      boardList:[],
      articleList:[],
      //무한 스크롤 시 마지막 인덱스 확인
      lastIndex:0,
    }
  },
  created(){
    this.getBoardList()
    // this.getBoardArticleList()
  },
 
  methods:{
    async getBoardList(){
      if(process.browser){
        const data = await this.$api.$get('/board/list')
        
        if(!Array.isArray(data)){
          return 
        }

        this.boardList = data
      }
    },
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
  
}
</script>

<style lang="scss" scoped>


</style>
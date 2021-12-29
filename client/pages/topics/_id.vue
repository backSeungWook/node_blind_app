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
  </div>
</template>

<script>

export default {
  data(){
    return{
      boardList:[],
      articleList:[]
    }
  },
  created(){
    this.getBoardList(),
    this.getBoardArticleList()
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
    async getBoardArticleList(){
      if(process.browser){
        const data = await this.$api.$get(`/board/${this.$route.params.id}`)
        this.articleList = data.article
        console.log(this.articleList)
      }
    }
  }
}
</script>

<style lang="scss" scoped>


</style>
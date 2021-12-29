<template>
  <div class="board-container">
    <section>
      <strong>{{query}}</strong>검색결과
    </section>
    
    <section class="total">
      전체({{articleList.length}})
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
      query:null,
      articleList:[]
    }
  },
  created(){
    this.findSearchResult()
  },
  methods:{
    async findSearchResult(){
      if(process.browser){
        this.query = this.$route.params.query
        const data = await this.$api.$get(`/search/${this.query}`)
        this.articleList = data.article
      }
    }
  }
}
</script>

<style>

</style>
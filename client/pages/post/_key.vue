<template>
  <div v-if="article !== null" class="main-container">
    <main>
      <breadcrumb :title="article.board.title" :slug="article.board.slug" />
      <h1>{{article.title}}</h1>
      
      <div class="company">
        <span style="color:#37acc9" >{{article.author.company.name}}</span>
        <span>·</span>
        <span >{{article.author.nickname}}</span>
      </div>

      <div class="info">

      </div>

    </main>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Article/Breadcrumb'
import Comment from '@/components/Article/Comment'
import CommentList from '@/components/Article/CommentList'
import ContentCard from '@/components/Article/ContentCard'
import InputComment from '@/components/Article/InputComment'
import RecommendArticleList from '@/components/Article/RecommendArticleList'
import { EyeIcon,ThumbsUpIcon ,MessageCircleIcon, BookmarkIcon  } from 'vue-feather-icons'

export default {
  data(){
    return{
      key:null,
      article:null,
      comment:[],
    }
  },
  created(){
    this.getArtilce()
  },
  methods:{
    async getArtilce(){
      if(process.browser){
        this.key = this.$route.params.key
        const data = await this.$api.$get(`/article/${this.key}`)
        this.article = data.article
        this.comment = data.comment
      }
    }
  },
  components:{
    Breadcrumb,
    Comment,
    CommentList,
    ContentCard,
    InputComment,
    RecommendArticleList,
   
    EyeIcon,ThumbsUpIcon ,MessageCircleIcon, BookmarkIcon
  }

}
</script>

<style lang="scss" scoped>
h1{
  margin: 0;
  font-size: 24px;
  line-height: 32px;
}
.company{
  font-size: 14px;
  margin: 15px 0;
}

</style>
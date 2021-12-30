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
        <div class="left">
          <span>
            <WatchIcon class="icon" size="1x"/>
            {{$moment(article.createdAt).format("MM.DD")}}
          </span>
          <span>
            <EyeIcon class="icon" size="1x"/>
            {{article.viewCount}}
          </span>
          <span>
            <MessageCircleIcon class="icon" size="1x"/>
            {{article.commentCount}}
          </span>
        </div>

        <div class="right">
          <span>
            <BookmarkIcon class="icon" size="1x"/>
          </span>
          <span>
            <MoreHorizontalIcon class="icon" size="1x"/>
          </span>
        </div>
      </div>

      <div class="content">
        <p>{{article.content}}</p>
      </div>

      <div class="action op">
        <div class="left">
          <span>
            <ThumbsUpIcon class="icon" size="1x" @click="thumbup"/>
            {{article.thumbupCount}}
          </span>
          <span>
            <MessageCircleIcon class="icon" size="1x"/>
            {{article.commentCount}}
          </span>
        </div>
      </div>

      <!-- 댓글 세션  -->
      <section class="comment">
        <h5>댓글 {{article.commentCount}}</h5>
        <input-comment :articleId="article._id" />
        <!-- 댓글 리스트 -->
        <div class="comment-list">
          <comment-card v-for="c in comment" :key="c.id" :comment="c" />
        </div>
      </section>
    </main>
    <recommend-article-list/>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Article/Breadcrumb'
import CommentCard from '@/components/Article/CommentCard'
import CommentList from '@/components/Article/CommentList'
import ContentCard from '@/components/Article/ContentCard'
import InputComment from '@/components/Article/InputComment'
import RecommendArticleList from '@/components/Article/RecommendArticleList'
import { EyeIcon,ThumbsUpIcon ,MessageCircleIcon, BookmarkIcon ,WatchIcon, MoreHorizontalIcon   } from 'vue-feather-icons'



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
    },
    async thumbup(){
      if(process.browser){
        await this.$api.$post('/article/thumbup',{
          articleId:this.article._id
        })
      }
    }
  },
  components:{
    Breadcrumb,
    CommentCard,
    CommentList,
    ContentCard,
    InputComment,
    RecommendArticleList,
    // Icon
    EyeIcon,ThumbsUpIcon ,MessageCircleIcon, BookmarkIcon,WatchIcon,MoreHorizontalIcon       
  }

}
</script>

<style lang="scss" scoped>

h1{
  margin: 0;
  font-size: 24px;
  line-height: 32px;
}
h5{
  font-size: 16px;
}

.company{
  font-size: 14px;
  margin: 15px 0;
}

.info, .action{
  opacity: .4;
  color: #222;
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
  border-bottom: 2px solid #eee;
  &.op{
    opacity: 1;
    
  }
  .left, .right{
    display: flex;
    gap:20px;
    .icon{
      position: relative;
      top:1.5px;
    }
  }
}

.content{
  padding: 30px 0;
  // white-space:pre-line;
  line-height: 1.75em;
  p{
    white-space:pre-line;
    margin: 0;
  }
}

</style>
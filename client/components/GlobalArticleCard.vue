<template>
  <article>
    <div class="head">
      <nuxt-link
        :to="{
          name:'post-key',
          params:{
            key: article.key
          }
        }"
        class="title"
      >
        {{article.title}}
      </nuxt-link>
    </div>

    <div class="body">
      <nuxt-link
        :to="{
          name:'post-key',
          params:{
            key: article.key
          }
        }"
        class="content"
      >
        {{article.content}}
      </nuxt-link>
      <div class="info">
        <span class="company">{{article.author.company.name}}</span>
        <span>·</span>
        <span class="nickname">{{article.author.nickname}}</span>
      </div>
    </div>

    <div class="foot">
      <div class="left">
        <span class="count">
          <EyeIcon size="1x" class="icon" />
          {{article.viewCount}}
        </span>
        <span class="count">
          <ThumbsUpIcon size="1x" class="icon" />
          {{article.thumbupCount}}
        </span>
        <span class="count">
          <MessageCircleIcon size="1x" class="icon" />
          {{article.commentCount}}
        </span>
      </div>
      <div class="right">
        <span class="count">{{$time(article.createdAt)}}</span> 
        <BookmarkIcon size="1x" class="icon" />
      </div>
    </div>
  </article>
</template>

<script>
import { EyeIcon,ThumbsUpIcon ,MessageCircleIcon, BookmarkIcon  } from 'vue-feather-icons'
export default {
  props:{
    article:{
      type:Object,
    }
  },
  components:{
    EyeIcon,ThumbsUpIcon ,MessageCircleIcon, BookmarkIcon
  }
}
</script>

<style lang="scss">
article{
  padding: 20px;
  border-bottom:1px solid #eee;
  a{
    color:#222;
  }
  &:nth-child(2n - 1){
    border-right: 1px solid #eee;
  }
  .head{
    .title{
      display: block;
      font-weight: bold;
      font-size: 18px;
      line-height: 1.4em;
      margin-top: 1px;
      height: 52px;
      margin-bottom: 0;
    }
  }
  .body{
    .content{
      
      display: block;
      margin-top: 4px;
      color: #222;
      font-size: 14px;
      line-height: 1.25em;
    }
    .info{
      margin-top: 20px;
      display: block;
    }
  }
  .foot{
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    opacity: .4;
    .count{
      margin-right: 15px;
      .icon{
        position: relative;
        top:1px;
      }
    }
  }
}
</style>
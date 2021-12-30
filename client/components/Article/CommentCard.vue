<template>
  <div>
    <div class="cmt">
      <div class="head">
        <span style="color:#37acc9;" >{{comment.author.company.name}}</span>
        <span>·</span>
        <span >{{comment.author.nickname}}</span>
      </div>

      <div class="body">
        <div class="content">{{comment.content}}</div>
      </div>
      
      <div class="foot">
        <span>
          <WatchIcon size="1x" class="icon" />
          {{$time(comment.createdAt)}}
        </span>
        <span>
          <ThumbsUpIcon size="1x" class="icon" />
          {{comment.thumbupCount}}
        </span>
        <span>
          <MessageCircleIcon size="1x" class="icon" />
          {{comment.replyCount}}
        </span>
        <div class="icon" @click="showReplyInputField = true ">대댓글 입력 </div>
      </div>
      
    </div>
    <input-reply v-if="showReplyInputField" :commentId="comment._id" @close="showReplyInputField=false"/>
    <!-- <reply-card v-if="comment.replies.length > 0" :comment="comment" /> -->
    <reply-card v-for="r in comment.replies" :key="r._id" :comment="r" />  
  </div>
</template>

<script>
import InputReply from '@/components/Article/InputReply'

import { ThumbsUpIcon ,MessageCircleIcon ,WatchIcon  } from 'vue-feather-icons'
import ReplyCard from '@/components/Article/ReplyCard'

export default { 
  data() {
    return {
      showReplyInputField:false
    }
  }, 
  props: {
    comment:{
      type:Object,
    }
  },
  methods: {
    
  }, 
  components: { 
    InputReply,
    ReplyCard,
    //Icon
    ThumbsUpIcon ,MessageCircleIcon ,WatchIcon
    
        
  },
}
</script>

<style lang="scss">
.cmt{
  padding:12px 20px 19px;
  border-bottom: 1px solid #eee;
  .head{
    margin-top: 9px;
    color: #94969b;
    font-size: 12px;
    line-height: 1.33em;
  }
  .content{
    white-space:pre-line;
    padding: 10px 0;
  }
  .foot{
    margin-top: 10px;
    opacity: 0.4;
    display: flex;
    gap: 20px;  
    font-size: 14px;
    .icon{
      position: relative;
      top: 1.5px;
      margin-right: 5px;
    }
  }
}

</style>
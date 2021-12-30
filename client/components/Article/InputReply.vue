<template>
  <div id="input-comment" >
    <CameraIcon class="icon"/>

    <div  class="content-container">
      <textarea v-model="content" ref="commentText" placeholder="대댓글을 남겨주세요." ></textarea>
      <div class="foot">
        <a @click.prevent="$emit('close')">취소</a>
        <a @click.prevent="uploadComment" :class="[content !== null && content !== '' && 'active' ]">등록</a>
      </div>
    </div>

  </div>
</template>

<script>
import { CameraIcon } from 'vue-feather-icons'

export default {
  props:{
    commentId:{
      type:String,
      required:true
    }
  },
  data(){
    return{
      content:null,
      articleId:null,
    }
  },
  created(){
    this.setFocus()
  },
  methods:{
    async uploadComment(){
      if(process.browser){
        const data = await this.$api.$post('/reply/create',{
          comment:this.commentId,
          content:this.content,
        })

        if(!data){
          return
        }
        
        this.content = null
        this.$emit('close')
      }
    },
    setFocus(){
      this.$nextTick(() =>{
        this.$refs.commentText.focus()
      })
    },
  },
  components:{
    CameraIcon
  }
}
</script>

<style lang="scss" scoped>
#input-comment{
  display: flex;
  padding: 20px;
  border: 1px solid #d4d4d4;
  .empty{
    line-height: 28px;
    cursor: pointer;
    width: 100%;
  }
  .content-container{
    width: 100%;
  }
  textarea{
    resize: none;
    width: 100%;
    display: block;
    border: none;
    font-size: 16px;
    min-height: 100px;
    margin-bottom: 20px;
  }
  .icon{
    margin-right: 20px;
  }
  .foot{
    display: flex;
    justify-content: flex-end;
    gap: 20px;  
    a{
      color: #d4d4d4;
      &.active{
        color: #222;
      }
    }
  }
}

</style>
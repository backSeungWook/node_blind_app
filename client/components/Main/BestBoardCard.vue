<template>
  <div class="board-card">
    <div class="head">
      <div class="board-icon">
        <h2>토픽 베스트</h2>
        <nuxt-link 
          :to="{
            name:'topics',
            params:{
              id:'토픽-베스트'
            }
          }"
        >
        더보기 >
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
     articleList:{
      type:Array,
      default:[]
    }
  }
}
</script>

<style>

</style>
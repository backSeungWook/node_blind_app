<template>
  <div class="main-container">
    <main>
      <searchbar />
      <best-board-card></best-board-card>
       <board-card /> <!-- 21.12.15 수요일 작업 진행중 -->
    </main>
  </div>
</template>

<script>
import BoardCard from '../components/Main/BoardCard.vue'
import BestBoardCard from '@/components/Main/BestBoardCard'
import Searchbar from '../components/Searchbar.vue'


export default {
  components: { BoardCard, Searchbar ,BestBoardCard},


}
</script>

<style scoped>
.main-container{
  display: flex;
}
</style>

<template>
  <div class="wrap-search">
    <img class="search-icon"  src="/icon/search.png" alt="search">
    <input type="text" />
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.wrap-search{
  width: 260px;
  margin-right: 8px;


  input{
    width: 100%;
    height: 40px;
    padding: 0 10px 0 41px;
    border: 1px solid #d4d4d4;
    border-radius: 20px;
    font-size: 14px;
    box-sizing: border-box;
  }
  .search-icon{
    position: absolute;
    margin-top: 10px;
    margin-left: 17px;
    width: 20px;
    height: 20px;
    opacity: .4;
    text-indent: -9999px;
  }
}

</style>
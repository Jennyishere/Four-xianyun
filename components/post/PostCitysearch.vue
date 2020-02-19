<template>
  <div class="search-wrapper">
    <!-- 搜索框 -->
    <el-row type="flex" justify="space-between" class="search-bar">
      <input type="text" placeholder="请输入想去的地方,比如:'广州' " />
      <i class="el-icon-search"></i>
    </el-row>
    <!-- 推荐地方 -->
    <div class="search-recommend">
        推荐：<span>广州</span><span>上海</span><span>深圳</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.search-wrapper {
    margin-top: 20px;
    margin-left: 40px;
  .search-bar {
    width: 100%;
    box-sizing: border-box;
    height: 40px;
    line-height: 40px;
    border: 3px solid orange;
    input {
      flex: 1;
      padding: 0 20px;
      line-height: 40px;
      outline: none;
      border: none;
      background: none;
    }
    i{
        font-size: 24px;
        color: orange;
        font-weight: 700;
        margin-right: 10px;
        padding-top: 5px;
    }
  }
  .search-recommend{
      padding: 10px 0;
      font-size: 12px;
      color: #666;
      span{
          margin-right: 5px;
      }
  }
}
</style>
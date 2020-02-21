<template>
  <div class="search-wrapper">
    <!-- 搜索框 -->
    <el-row type="flex" justify="space-between" class="search-bar">
      <el-input v-model="city" type="text" placeholder="请输入想去的地方,比如:'广州' "></el-input>
      <i class="el-icon-search" @click="sendSearch"></i>
    </el-row>
    <!-- 推荐地方 -->
    <div class="search-recommend">
      <span>推荐:</span>
      <a
        href="javascript:undefined"
        v-for="(item,index) in recommend"
        :key="index"
        @click="tuijian(index)"
      >{{item}}</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      city: "",//因为业务需要定义city
      recommend: ["广州", "上海", "北京"] 
    };
  },
  mounted() {},
  methods: {
    sendSearch() {
      if (!this.city) {
        //定义初始值
        const data = {
          _start: 0,
          _limit: 3
        };
        //发起请求
        this.$store.dispatch("post/searchCity", data).then(res => {
          //成功存在vuex中
          this.$store.commit("post/setSendSearch", res.data.data);
        });
      }
    // 调用方法
      this.$store.commit("post/setSearch", this.city);
      console.log(111);
    },
    tuijian(index) {
      // 单机根据index搜索
      this.city = this.recommend[index];
      this.$store.commit("post/setSearch", this.city);
    }
  }
};
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
    /deep/.el-input__inner {
      flex: 1;
      padding: 0 20px;
      line-height: 40px;
      outline: none;
      border: none;
      background: none;
    }
    i {
      font-size: 24px;
      color: orange;
      font-weight: 700;
      margin-right: 10px;
      padding-top: 5px;
    }
  }
  .search-recommend {
    padding: 10px 0;
    font-size: 12px;
    color: #666;
    span {
      margin-right: 5px;
    }
    a {
      padding-left: 8px;
    }
    a:hover {
      text-decoration: underline;
      color: red;
    }
  }
}
</style>
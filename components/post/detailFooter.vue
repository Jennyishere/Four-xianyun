<template>
 <div>
   <div class="keeps">
      <h2>评论</h2>
      <div class="item">
        <div class="head">
          <img src="../../images/01.jpg" alt />
          <div>
            <p>火星网友</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">文章说得很有道理</div>
      </div>
      <div class="more">更多跟帖</div>
    </div>
    <!-- 分页 -->
    <div class="block">
    
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
 </div>
</template>

<script>
export default {
  data() {
    return {
      detailList: [],
              currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4
 
    };
  },
  //  mounted() {
  //     const { id } = this.$route.query;
  //     //console.log(id)

  //     //请求文章详情
  //     this.$axios({
  //       url: "/posts/comments",
  //       params: {
  //         post:id
  //       }
  //     }).then(res => {
  //       console.log(res)

  //       // console.log(this.detailList)
  //     });
  //   },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang='less' scoped>
.keeps {
  border-top: 5px solid #ddd;
  padding: 0 15px 50px;
  > h2 {
    line-height: 50px;
    text-align: center;
  }
  .item {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > img {
        width: 50/360 * 100vw;
        height: 50/360 * 100vw;
        display: block;
        border-radius: 50%;
      }
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        > span {
          font-size: 12px;
          color: #999;
          line-height: 25px;
        }
      }
      > span {
        color: #999;
        font-size: 13px;
      }
    }
    .text {
      font-size: 14px;
      color: #333;
      padding: 20px 0 10px 0;
    }
  }
  .more {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 20px auto;
    font-size: 13px;
  }
}
</style>
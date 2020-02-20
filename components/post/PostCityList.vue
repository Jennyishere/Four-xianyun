<template>
  <div class="post-list">
    <div v-for="(item,index) in cityList" :key="index">
      <!-- //上下图片 -->

      <div class="post-item" v-if="item.images.length>=3">
        <nuxt-link :to="`/post/Strategy?id=${item.id}`">
          <h4 title="塞班贵？一定是你的打开方式不对！6000块玩转塞班" class="post-title">
            <a href="#">{{item.title}}</a>
          </h4>
          <div class="post-desc" v-html="item.content"></div>
          <el-row type="flex" justify="space-between" class="card-images">
            
              <img v-for="(items,indexs) in item.images" :key="indexs" :src="items" alt />
        
          </el-row>
          <!-- 图标 -->
          <el-row type="flex" justify="space-between">
            <el-row type="flex" justify="space-between" class="post-info-left">
              <span class="post-info-left-icon">
                <i class="el-icon-coordinate"></i>
                {{item.cityName}}
              </span>
              <el-row type="flex" justify="space-between" class="post-user">
                by
                <a href="#">
                  <img :src="`${$axios.defaults.baseURL}${item.account.defaultAvatar}`" alt />
                </a>
                <a href="#">{{item.account.nickname}}</a>
              </el-row>
              <span>
                <i class="el-icon-view"></i>
                {{item.watch}}
              </span>
            </el-row>
            <span class="post-info-right">{{item.like}}赞</span>
          </el-row>
        </nuxt-link>
      </div>
      <!-- 左右 -->
      <div v-if="item.images.length<=2">
        <nuxt-link :to="`/post/Strategy?id=${item.id}`">
          <el-row type="flex" justify="space-between" class="post-item">
            <div>
              <div class="post-cover">
                
                  <img :src="item.images[0]" alt />
                
              </div>
            </div>
            <div class="post-content">
              <h4 class="post-title">
                <a href="#">{{item.title}}</a>
              </h4>
              <div class="text" v-html="item.content"></div>
              <el-row type="flex" justify="space-between">
                <el-row type="flex" justify="space-between" class="post-info-left">
                  <span class="post-info-left-icon">
                    <i class="el-icon-coordinate"></i>
                    {{item.cityName}}
                  </span>
                  <el-row type="flex" justify="space-between" class="post-user">
                    by
                    <a href="#">
                      <img :src="`${$axios.defaults.baseURL}${item.account.defaultAvatar}`" alt />
                    </a>
                    <a href="#">{{item.account.nickname}}</a>
                  </el-row>
                  <span>
                    <i class="el-icon-view"></i>
                    {{item.watch}}
                  </span>
                </el-row>
                <span class="post-info-right">{{item.like}}赞</span>
              </el-row>
            </div>
          </el-row>
        </nuxt-link>
      </div>
    </div>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageindex"
        :page-sizes="[3, 10, 15, 30]"
        :page-size="3"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
   
  data() {
    return {
      cityList: [], //文章列表
      total: 0, //页数
      pageindex: 1,
      currentPage: 0, //当前页数
      currentStrip: 3, //当前条数
      start:0,
      limit:3
    };
  },
  mounted() {
     
      this.init()
  },
  methods: {
handleSizeChange(val) {
    //   console.log(`每页 ${val} 条`);
      this.currentStrip = val;
       this.init()
},
handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`);
   
      this.currentPage = val;
        this.init()
},
init(city) {

    const data = {
        _start: this.currentPage,
          _limit: this.currentStrip,
    }
    this.$store.dispatch("post/searchCity",data).then(res=>{
        this.cityList = res.data.data;
        this.total = res.data.total;
    })
},

},
watch: {
    //监听属性 发生变化是跟新页面
    "$store.state.post.search"(){
        // 没有值就返回
        if(!this.$store.state.post.search) return
     this.$axios({
        url: "/posts",
        params: {
          _start: this.currentPage,
          _limit: this.currentStrip,
          city:this.$store.state.post.search
        }
      }).then(res => {
        console.log(res);
        this.cityList = res.data.data;
        this.total = res.data.total;
      });
    },
    "$store.state.post.SendSearch"(){
            this.init()
    }
}
};
</script>

<style scopde lang="less">
.post-list {
  margin-left: 40px;
  .post-item {
    padding: 20px 0;
    border-bottom: 1px solid #eee;
    .post-content {
      flex: 1;
      width: 470px;
      .text {
        margin-top: 10px;
        margin-bottom: 10px;
        font-size: 14px;
        height: 60px;
        color: #666;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }
    .post-title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 15px;
      font-weight: 400;
      font-size: 18px;
    }
    .post-desc {
      font-size: 14px;
      height: 57px;
      color: #666;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    .card-images {
      margin: 15px 0;
      img {
        width: 220px;
        height: 150px;
        object-fit: cover;
      }
    }
    .post-info-left {
      font-size: 12px;
      color: #999;
      padding-right: 10px;
      margin-right: 10px;
      .post-info-left-icon {
        margin-right: 10px;
      }
      .post-user {
        margin-right: 10px;
        a {
          color: orange;
          img {
            display: block;
            width: 16px;
            border-radius: 100px;
            margin: 2px;
            margin-left: 10px;
            padding-right: 10px;
          }
        }
      }
    }
    .post-info-right {
      color: orange;
    }
    .post-cover {
      width: 220px;
      height: 150px;
      overflow: hidden;
      flex-shrink: 0;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
      }
    }
  }
}
</style>
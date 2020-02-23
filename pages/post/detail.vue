<template>
  <div class="RaidersDetails">
    <el-container>
      <!-- 左边 -->
         <div>
        <el-aside width="450px">
        
      </el-aside>
      </div>
      <el-container>
        <!-- 头部 -->
        <el-header>
          <div>
            <!-- 面包屑 -->
          <div>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/post' }">旅游攻略</el-breadcrumb-item>
              <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <!-- 标题 渲染地方 -->
          <div v-html='detail[0].title' v-if='detail[0]'></div>
         
          </div>
        </el-header>
        <!-- Main -->
        <el-main>
          <DetailMain/>
          <DetailFooter/>
        </el-main>
        <!-- 评论区 -->
         <el-footer>
           
         </el-footer>
      </el-container>
      <!-- 相关攻略 -->
      <div>
        <el-aside width="500px">
        <DetailRecommend/>
      </el-aside>
      </div>
    </el-container>
  </div>
</template>

<script>

import DetailMain from "@/components/post/detailMain";
import DetailFooter from "@/components/post/detailFooter";
import DetailRecommend from "@/components/post/detailRecommend";


export default {
  components: {
    DetailMain,
    DetailFooter,
    DetailRecommend
  },
  data() {
    return {
      //存储数据
      detail:[
            
          ],
     
    };
  },
  mounted(){
    const {id} = this.$route.query;
    //console.log(id)
    
    //请求文章详情
    this.$axios({
      url:'/posts',
      params: {
                    id,
                    
                }
    }).then(res =>{
      //console.log(res)
      const {data} = res.data
      
      this.detail=data
     // console.log(this.detail)

    })
  },
  //监听url变化
    watch: {
        $route(){
             this.getData();
        }
    },
    methods:{
      getData(){
        //请求数据
        const {id} = this.$route.query;
    //console.log(id)
    
    //请求文章详情
    this.$axios({
      url:'/posts',
      params: {
                    id,
                    
                }
    }).then(res =>{
      //console.log(res)
      const {data} = res.data
      
      this.detail=data
     // console.log(this.detail)
    this.$router.go(0)
    })
      }
    }
  
};
</script>

<style scoped lang="less">
.RaidersDetails {
 margin: auto;
}


.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
// 布局
 .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #e5e9f2;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
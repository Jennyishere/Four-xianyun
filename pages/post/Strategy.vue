<template>
  <div class="RaidersDetails">
    <el-container>
      <!-- 左边 -->
         <div>
        <el-aside width="500px">
        
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
          <div>
            <h1>塞班贵？一定是你的打开方式不对！6000块玩转塞班</h1>
          </div>
          </div>
        </el-header>
        <!-- Main -->
        <el-main>
          <StrategyMain/>
        </el-main>
        <!-- 评论区 -->
         <el-footer>
           <StrategyFooter/>
         </el-footer>
      </el-container>
      <!-- 相关攻略 -->
      <div>
        <el-aside width="500px">
        <p>相关攻略</p>
        <!-- 循环 -->
    
   
    <el-row>
  <el-col :span="12"><div class="grid-content bg-purple"><img src="../../images/pic_sea.jpeg" alt /> </div></el-col>
  <el-col :span="12"><div class="grid-content bg-purple-light">
    <div>发布测试</div>
    <p>2020-02-20 7:50 阅读 4</p>
    </div></el-col>
</el-row>
        <nuxt-link to="/RaidersDetails">关于</nuxt-link>
      </el-aside>
      </div>
    </el-container>
  </div>
</template>

<script>
import StrategyMain from "@/components/post/StrategyMain";
import StrategyFooter from "@/components/post/StrategyFooter";

export default {
  components: {
    StrategyMain,
    StrategyFooter
  },
  data() {
    return {
      //存储数据
      StrategyList:[],
      data:[]
    };
  },
  
};
</script>

<style scoped lang="less">
.RaidersDetails {
  margin: 0 atuo;
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
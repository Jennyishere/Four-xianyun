<template>
  <div>
      <h2>相关攻略</h2>
      <div v-for="(item,index) in Recommend" :key='index'>
         
              <el-row :gutter="20">
              <!-- 图片 -->
              <nuxt-link :to="`/post/detail?id=${item.id}`">
              <el-col :span="10"><div class="grid-content bg-purple" v-html="Recommend[index +1].content" v-if="Recommend[index +1]"></div></el-col>
              
              
              <!-- 内容 -->
              
              <el-col :span="10"><div class="grid-content bg-purple"> {{Recommend.title}} <p>2020-02-21 6:57 阅读 {{Recommend.watch}}</p></div></el-col>
                    </nuxt-link>
                  
                     
                  
                  
                  
                  </el-row>
          
         
              
          </div>
      
          <!-- <div v-html="Recommend[0].content" v-if="Recommend[0]"></div> -->
  </div>
</template>

<script>
export default {
data(){
    return{
        Recommend:[]    
    }
},
mounted(){
    //解构id
    const {id} = this.$route.query
    // 获取相关推荐数据
    this.$axios({
        url:'/posts/recommend',
        params:{
            id
        }
    }).then(res =>{
        console.log(res)
        const {data} =res.data
        this.Recommend =data
        console.log(this.Recommend)
    })
}
}
</script>

<style scoped lang="less">
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
    background: #99a9bf;
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
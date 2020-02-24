<template>
  <div>
      <h2>相关攻略</h2>
      <div v-for="(item,index) in Recommend" :key='index' class="rec">
         
              <el-row :gutter="20" >
              <!-- 图片 -->
              <nuxt-link :to="`/post/detail?id=${item.id}`">
              <img class="tupian" :src="item.images[0]" alt="">
              <el-col :span="10"><div class="grid-content bg-purple"  v-if="Recommend[index ]">{{item.title}}</div></el-col>
              
                
              <!-- 内容 -->
              
              <el-col :span="10"><div class="grid-content bg-purple">  <p>2020-02-21 6:57 阅读 {{item.watch}}</p></div></el-col>
                    </nuxt-link>
                  
                     
                  
                  
                  
                  </el-row>


            
      
          <!-- <div v-html="Recommend[0].content" v-if="Recommend[0]"></div> -->
  </div>
  
  

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
       // console.log(res)
        const {data} =res.data
        this.Recommend =data
        console.log(this.Recommend)
    })
}
}
</script>

<style scoped lang="less">
.rec{
  // display: flex;
  // width: 280px;
  // height: 80px;
}
.tupian{
  width: 100px;
  height: 80px;
}
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
  // 
  .statement{
    border:1px #ddd solid;

    .statement-list{
        padding: 10px 0;
        > div{
            text-align: center;
            i{
                display: block;
                font-size: 40px;
            }
            span{
                font-size:12px;
            }
        }
    }
    .service-tel{
        height: 32px;
        line-height: 32px;
        padding:0 10px;
        background: #f6f6f6;
        font-size: 14px;
    }
}

.history{
    border:1px #ddd solid;
    padding:10px;
    margin-top:10px;

    h5{
        font-size: 16px;
        font-weight: normal;
        padding-bottom: 10px;
        border-bottom:1px #eee solid;
    }

    .history-item{
        padding:10px 0;
        font-size: 14px;
        border-bottom: 1px #eee solid;

        &:last-child{
            border:none;
        }

        .to-from{
            margin-bottom: 5px;
        }

        p{
            font-size: 12px;
            color:#666;
        }

        span{
            color:#fff;
            display: block;
            padding:2px 10px;
            background: orange;
            border-radius: 4px;
            font-size:12px;
            cursor: pointer;
        }
    }
}
// 
</style>
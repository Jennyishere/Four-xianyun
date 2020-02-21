<template>
    <div>
         
         攻略:<span v-html='detailList[0].city.created_at' v-if='detailList[0]'></span>
         阅读:<span v-html='detailList[0].watch' v-if='detailList[0]'></span>
                  <div class="content" v-html='detailList[0].content' v-if='detailList[0]'></div>

         
    </div>
</template>

<script>
export default {
   data(){
       return{
          detailList:[],
       }
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
      
      this.detailList=data
     // console.log(this.detailList)

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
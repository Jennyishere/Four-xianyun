<template>
  <div class="menus_box">
    <div class="menus_item">
      <el-row type="flex" justify="space-between" >
        <span>热门城市</span>
        <i class="el-icon-arrow-right righticon active"></i>
      </el-row>
    </div>
    <div class="menus_item">
      <el-row type="flex" justify="space-between">
        <span>推荐城市</span>
        <i class="el-icon-arrow-right righticon"></i>
      </el-row>
    </div>
    <div class="menus_item">
      <el-row type="flex" justify="space-between">
        <span>奔向海岛</span>
        <i class="el-icon-arrow-right righticon"></i>
      </el-row>
    </div>
    <div class="menus_item">
      <el-row type="flex" justify="space-between">
        <span>主题推荐</span>
        <i class="el-icon-arrow-right righticon"></i>
      </el-row>
    </div>
    <div class="sub_menus" v-if="false">
        <div class="main_menus">
          <span class="one_menus">1</span>
           <span class="tow_menus">北京</span>
            <span class="three_menus">世界著名古都和现代化国际城市</span>
        </div >
           <div class="main_menus">
          <span class="one_menus">2</span>
           <span class="tow_menus">北京</span>
            <span class="three_menus">世界著名古都和现代化国际城市</span>
        </div >
          <div class="main_menus">
          <span class="one_menus">3</span>
           <span class="tow_menus">北京</span>
            <span class="three_menus">世界著名古都和现代化国际城市</span>
        </div >
          <div class="main_menus">
          <span class="one_menus">4</span>
           <span class="tow_menus">北京</span>
            <span class="three_menus">世界著名古都和现代化国际城市</span>
        </div >
          <div class="main_menus">
          <span class="one_menus">5</span>
           <span class="tow_menus">北京</span>
            <span class="three_menus">世界著名古都和现代化国际城市</span>
        </div >
        
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  mounted(){
    // this.$axios({
    //   url:'/posts/cities'
    // }).then(res=>{
    //   console.log(res);
      
    // })
  },
  methods:{
    // cityHover(){
    //   console.log(123);
      
    // }
  }
};
</script>

<style scopde lang="less">
.menus_box {
  margin: 20px 0px;
  position: relative;
  div:nth-child(1) {
    border-top: 1px solid #ccc;
  }
  .menus_item {
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    font-size: 14px;
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    border-left: 1px solid #ccc;
    div:nth-child(1) {
      border-top: none;
    }
    .righticon {
      font-size: 20px;
      color: #ccc;
      padding: 10px;
    }
  }
  .sub_menus{
    width:320px;
    border: 1px solid #ccc;
    border-top: none;
    position: absolute;
    top: 0px;
    left: 260px;
    .main_menus{
      padding-bottom: 10px;
      .one_menus{
        color: #ffa500;
        font-style:italic;
        font-size: 25px;
        display:inline-block;
        padding-left: 15px;
        padding-right: 10px;
      }
      .tow_menus{
         color: #ffa500;
          padding-right: 10px;
      }
      .three_menus{
        color: #999999;
        font-size: 13px;
      }
    }
  }
}
.active {
  color: #ffa500;
}
</style>
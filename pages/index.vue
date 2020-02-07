<template>
    <div class="container">
        <!-- 幻灯片 -->
        <!-- interval: 图片切换的间隔时间 -->
        <!-- arrow: 一直显示箭头 -->
        <el-carousel 
        :interval="5000" 
        arrow="always">
            <el-carousel-item 
            v-for="(item, index) in banners" 
            :key="index">
              <!-- 图片在缩放窗口时候会有问题 -->
              <!-- <img :src="item.url" alt="" style="width:100%;"> -->
              <div class="banner-image" 
              :style="`
              background:url(${$axios.defaults.baseURL}${item.url}) center center no-repeat;
              background-size:contain contain;
              `">
              </div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
    data(){
        return {
          // 轮播图数据
          banners: []
        }
    },

    mounted(){
        // 请求轮播图数据
        this.$axios({
            url: "/scenics/banners"
        }).then(res => {
            // data轮播图的数据
            const {data} = res.data;
            this.banners = data;
        })
    }
}
</script>

<style scoped lang="less">
.container{
    min-width:1000px;
    margin:0 auto;
    position:relative;

    /deep/ .el-carousel__container{
        height:700px;
    }

    .banner-image{
        width:100%;
        height:100%;
    }
}
</style>
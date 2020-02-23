<template>
  <div class="container">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/hotel' }">{{
          hotelDetail.big_cate
        }}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/hotel' }"
          >{{ hotelDetail.real_city }}酒店</el-breadcrumb-item
        >
        <el-breadcrumb-item>{{ hotelDetail.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row class="name-info">
      <el-col :span="24">
        <h4 class="hotel-cn-name">{{ hotelDetail.name }}</h4>
      </el-col>
      <el-col :span="24">
        <span class="hotel-en-name">{{ hotelDetail.alias }}</span>
      </el-col>
      <el-col :span="24">
        <i class="iconfont iconlocation"></i>{{ hotelDetail.address }}
      </el-col>
    </el-row>
    <!-- 房间图片组件 -->
    <DetailPic></DetailPic>
    <!-- 其他网站的价格对比信息组件 -->
    <DetailPrice :data="hotelDetail"></DetailPrice>
    <!-- 小地图组件 -->
    <DetailMap :data="$store.state.hotel.hotelDetail"></DetailMap>
    <!-- 酒店的信息组件 -->
    <DetailInfo :data="$store.state.hotel.hotelDetail"></DetailInfo>
    <!-- 评价信息组件 -->
    <DetailGrade :data="$store.state.hotel.hotelDetail"></DetailGrade>
  </div>
</template>

<script>
import DetailMap from "@/components/hotel/detailMap";
import DetailPic from "@/components/hotel/detailPic";
import DetailPrice from "@/components/hotel/detailPrice";
import DetailInfo from "@/components/hotel/detailInfo";
import DetailGrade from "@/components/hotel/detailGrade";
export default {
  components: {
    DetailMap,
    DetailPic,
    DetailPrice,
    DetailInfo,
    DetailGrade
  },
  data() {
    return {
      hotelDetail: {}
    };
  },
  mounted() {
    this.$axios({
      url: `/hotels?id=` + this.$route.query.id
    }).then(res => {
      console.log(res.data);
      this.hotelDetail = res.data.data[0];
      this.$store.commit("hotel/setHotelInfo", res.data.data[0]);
    });
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  .breadcrumb {
    overflow: hidden;
    padding: 20px 0;
  }
  .name-info {
    margin-bottom: 20px;
    color: #666;
    font-size: 14px;
    .hotel-cn-name {
      font-size: 24px;
      font-weight: 400;
      color: #333;
      margin-bottom: 3px;
    }
    .hotel-en-name {
      display: inline-block;
      margin-bottom: 3px;
    }
  }
  .info-row {
    margin: 40px 0;
  }
}
</style>

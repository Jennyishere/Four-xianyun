<template>
  <div>
    <div class="main">
      <!-- 城市筛选框 -->
      <HotelCityFilter />
      <!-- 中间地图部分 -->
      <el-row type="flex">
        <el-col :span="12" class="zone">
          <HotelZone :data="cityPlaces" />
        </el-col>
        <!-- 地图 -->
        <el-col :span="12">
          <Map />
        </el-col>
      </el-row>
      <!-- 酒店筛选 -->
      <SearchHotel />
    </div>
  </div>
</template>

<script>
import SearchHotel from "@/components/hotel/searchHotel";
import Map from "@/components/hotel/map";
import HotelZone from "@/components/hotel/hotelZone";
import HotelCityFilter from "@/components/hotel/hotelCityFilter";
export default {
  components: {
    SearchHotel,
    Map,
    HotelCityFilter,
    HotelZone
  },
  data() {
    return {
      city:"南京",
      cityPlaces: [
        {
          scenics: {}
        }
      ]
    };
  },
  mounted() {
    this.$axios({
      url: "/cities",
      params: {
        name: this.city
      }
    }).then(res => {
      console.log(res);
      this.cityPlaces = res.data.data;
    });

    this.$axios({
      url: "hotels/options"
    }).then(res => {
      console.log(res);
    });
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.main {
  width: 1000px;
  margin: 20px auto;
}

.user {
  margin-left: 70px;
}
.el-tag {
  border: 0;
  background-color: #fff;
}
/deep/.wenhao {
  padding: 0px 3px;
  border-radius: 50%;
  background: #ccc;
  color: #fff;
}
.zone {
  color: #666;
  font-size: 14px;
}
</style>
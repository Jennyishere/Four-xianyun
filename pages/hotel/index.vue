<template>
  <div>
    <div class="main">
      <!-- 城市筛选框 -->
      <HotelCityFilter @sendCity="sendCity" @sendData="sendData" :data="city" />
      <!-- 中间地图部分 -->
      <el-row type="flex">
        <el-col :span="12" class="zone">
          <HotelZone :data="cityPlaces" />
        </el-col>
        <!-- 地图 -->
        <el-col :span="12">
          <Map :data="hotelData" @setLocation="setLocation" />
        </el-col>
      </el-row>
      <!-- 酒店搜索 -->
      <SearchHotel @searchData="searchData" />

      <HotelItem :data="hotelData" />
    </div>
  </div>
</template>

<script>
import SearchHotel from "@/components/hotel/searchHotel";
import Map from "@/components/hotel/map";
import HotelZone from "@/components/hotel/hotelZone";
import HotelCityFilter from "@/components/hotel/hotelCityFilter";
import HotelItem from "@/components/hotel/hotelItem";

export default {
  components: {
    SearchHotel,
    Map,
    HotelCityFilter,
    HotelZone,
    HotelItem
  },
  data() {
    return {
      city: "南京",
      filters: {
        city: 197
      },
      cityPlaces: {
        scenics: []
      },
      hotelData: []
    };
  },
  mounted() {
    this.getCityZone();
  },
  methods: {
    // 拿到定位的地址
    setLocation(data) {
      this.city = data;
    },
    // 搜索价格
    sendData(data) {
      console.log(data);
      this.getCityId(data.city);
      delete data.city;
      let copy = { ...data, ...this.filters };
      this.filters = copy;
      // console.log(this.filters);

      this.getHotel();
    },

    sendCity(val) {
      this.city = val;
      this.getCityZone();
    },
    getCityZone() {
      this.getCityId(this.city);
    },
    searchData(data) {
      this.filters = data;
      // console.log(this.filters);
      this.getHotel();
    },
    getCityId(city) {
      this.$axios({
        url: "/cities",
        params: {
          name: city
        }
      }).then(res => {
        // console.log(res);
        this.cityPlaces = res.data.data[0];
        this.filters.city = this.cityPlaces.id;
      });
    },
    getHotel() {
      // 最终的参数字符串
      let strArr = [];

      // 拼接参数
      Object.keys(this.filters).forEach(key => {
        var value = this.filters[key];
        // 如果值是数组
        if (Array.isArray(value)) {
          // item就是1或者2
          value.forEach(item => {
            strArr.push(`${key}=${item}`); // 目前的strArr = ["hotellevel_in=1","hotellevel_in=2"]
          });
        } else {
          strArr.push(`${key}=${value}`); // 目前的strArr = ["hotellevel_in=1","hotellevel_in=2", "city=197"]
        }
      });

      var queryStr = strArr.join("&"); // 输出 hotellevel_in=&hotellevel_in=2&city=197
      // = "/hotel?" + queryStr;
      // console.log(this.$router.path);
      this.$router.replace('/hotel?'+queryStr)

      this.$axios({
        url: "hotels?" + queryStr
      }).then(res => {
        // console.log(res);
        this.hotelData = res.data.data;
        console.log(this.hotelData);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  width: 1000px;
  margin: 20px auto;
}

.zone {
  color: #666;
  font-size: 14px;
}
</style>
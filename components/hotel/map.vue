<template>
  <div class="map">
    <div id="container"></div>
    <span>{{ filter }}</span>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array, // 声明data属性的类型
      default: []
    }
  },
  data() {
    return {
      locations: [],
      map: "",
      str: []
    };
  },
  computed: {
    filter() {
      this.data.forEach(v => {
        this.locations.push(v.location);
      });

      return "";
    }
  },
  mounted() {
    // 地图加载完毕之后会触发
    window.onLoad = () => {
      this.map = new AMap.Map("container", {
        zoom: 11 //级别
      });

      this.plugin();
    };

    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=39406c0b73d92c64b2365096ff6d0236&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  },
  methods: {
    open(data) {
      this.$alert(`当前定位城市是${data}`, "提示", {
        confirmButtonText: "确定",
        type: "success",
        callback: action => {
          this.$emit("setLocation", data);
        }
      });
    },
    plugin() {
      // 定位
      AMap.plugin("AMap.Geolocation", () => {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
          buttonOffset: new AMap.Pixel(10, 20),
          //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true,
          //  定位按钮的排放位置,  RB表示右下
          buttonPosition: "RB"
        });
        const onComplete = data => {
          this.map = new AMap.Map("container", {
            zoom: 11 //级别
          });
          // data是具体的定位信息
          // 弹窗告知用户的定位
          if (this.$route.path == "/hotel") {
            this.str.push(data.position);
            // console.log(this.str[0].lng);
            // console.log(this.str[0].lat);
            this.searchHotel(
              data.addressComponent.city,
              this.str[0].lng,
              this.str[0].lat
            );
            this.open(data.addressComponent.city);
          }
        };
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);

        function onError(data) {
          // 定位出错
        }
      });
    },
    searchHotel(city, lng, lat) {
      AMap.service(["AMap.PlaceSearch"], () => {
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({
          pageSize: 10, // 单页显示结果条数
          pageIndex: 1, // 页码
          city: city, // 兴趣点城市
          citylimit: true, //是否强制限制在设置的城市内搜索
          map: this.map, // 展现结果的地图实例
          autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
        //关键字查询
        placeSearch.searchNearBy("酒店", [lng, lat], function(
          status,
          result
        ) {});
      });
    }
  }
};
</script>

<style lang="less" scoped>
#container {
  width: 450px;
  height: 280px;
}
</style>

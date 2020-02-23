<template>
  <div class="map">
    <div id="container"></div>
    <span>{{filter}}</span>
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
      locations: []
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
      var map = new AMap.Map("container", {
        zoom: 11 //级别
      });
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
          var map = new AMap.Map("container", {
            zoom: 11 //级别
          });
          // data是具体的定位信息
          // 弹窗告知用户的定位
          if(this.$route.path=='/hotel'){ this.open(data.addressComponent.city);}
                
          // (点标记)创建一个 Marker 实例：
          var markerList = [];
          this.locations.forEach((v, i) => {
            var marker = new AMap.Marker({
              position: new AMap.LngLat(v.longitude, v.latitude), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
              // title: data.formattedAddress
              map: map,
              offset: new AMap.Pixel(-10, -10),
              icon: "//vdata.amap.com/icons/b18/1/2.png"
            });

            markerList.push(marker);
          });

          // 将创建的点标记添加到已有的地图实例：

          map.add(markerList);

          // map.add(marker);
          // 移除已创建的 marker
          // map.remove(marker);
        };
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);

        function onError(data) {
          // 定位出错
        }
      });
    };
    console.log(this.currentCity); //空

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


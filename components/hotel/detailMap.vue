<template>
  <div class="info-row">
    <div class="map-view">
      <div id="container" class="map-box"></div>
      <div class="poi-list">
        <el-tabs
          v-model="editableTabsValue"
          type="border-card"
          @tab-click="handleSearch"
        >
          <el-tab-pane label="风景" name="1">
            <div class="poi-list-ol" id="panel"></div>
          </el-tab-pane>
          <el-tab-pane label="交通" name="2">
            <div class="poi-list-ol" id="traffic"></div>
          </el-tab-pane>
          <el-tab-pane label="美食" name="3">
            <div class="poi-list-ol" id="food"></div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import svg from "@/images/hotel.svg";
export default {
  props: {
    data: {
      type: Object,
      default: {
        location: {}
      }
    }
  },
  data() {
    return {
      centerInfo: [],
      editableTabsValue: "1",
      map: ""
    };
  },
  mounted() {
    //组件加载完后执行的函数
    setTimeout(() => {
      this.centerInfo = [
        this.data.location.longitude,
        this.data.location.latitude
      ];
      console.log(this.centerInfo);
      setTimeout(() => {
        var url =
          "https://webapi.amap.com/maps?v=1.4.15&key=ccfe0710919fd363dbfb8d9b863a8519&callback=onLoad&plugin=AMap.PlaceSearch";
        var jsapi = document.createElement("script");
        jsapi.charset = "utf-8";
        jsapi.src = url;
        document.head.appendChild(jsapi);

        this.mapInit();
      }, 100);
    }, 100);
  },
  methods: {
    //地图初始化
    mapInit() {
      window.onLoad = () => {
        this.map = new AMap.Map("container", {
          center: this.centerInfo,
          zoom: 14, //初始地图级别
          resizeEnable: true
        });
        this.searchScenery();
      };
    },
    hotelPosition() {
      var icon = new AMap.Icon({
        size: new AMap.Size(19, 34), //图标尺寸
        image: svg,
        // "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png",
        imageSize: new AMap.Size(20, 34)
      });
      var marker = new AMap.Marker({
        icon: icon,
        position: new AMap.LngLat(this.centerInfo[0], this.centerInfo[1]),
        offset: new AMap.Pixel(-10, -10)
      });
      marker.setMap(this.map);
    },
    searchScenery() {
      AMap.service(["AMap.PlaceSearch"], () => {
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({
          pageSize: 10, // 单页显示结果条数
          pageIndex: 1, // 页码
          city: this.data.city.name, // 兴趣点城市
          citylimit: true, //是否强制限制在设置的城市内搜索
          map: this.map, // 展现结果的地图实例
          panel: "panel", // 结果列表将在此容器中进行展示。
          autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
        //关键字查询
        placeSearch.searchNearBy("风景名胜", this.centerInfo, 5000, function(
          status,
          result
        ) {});
      });
      this.hotelPosition();
    },
    searchTraffic() {
      AMap.service(["AMap.PlaceSearch"], () => {
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({
          pageSize: 10, // 单页显示结果条数
          pageIndex: 1, // 页码
          city: this.data.city.name, // 兴趣点城市
          citylimit: true, //是否强制限制在设置的城市内搜索
          map: this.map, // 展现结果的地图实例
          panel: "traffic", // 结果列表将在此容器中进行展示。
          autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
        //关键字查询
        placeSearch.searchNearBy("公交地铁", this.centerInfo, 5000, function(
          status,
          result
        ) {});
      });
      this.hotelPosition();
    },
    searchFood() {
      AMap.service(["AMap.PlaceSearch"], () => {
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({
          pageSize: 10, // 单页显示结果条数
          pageIndex: 1, // 页码
          city: this.data.city.name, // 兴趣点城市
          citylimit: true, //是否强制限制在设置的城市内搜索
          map: this.map, // 展现结果的地图实例
          panel: "food", // 结果列表将在此容器中进行展示。
          autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
        //关键字查询
        placeSearch.searchNearBy("美食", this.centerInfo, 5000, function(
          status,
          result
        ) {});
        this.hotelPosition();
      });
    },
    handleSearch(tab, event) {
      // 根据地图的容器生成地图
      this.map = new AMap.Map("container", {
        resizeEnable: true
      });
      if (tab.label == "风景") {
        this.searchScenery();
      }
      if (tab.label == "交通") {
        this.searchTraffic();
      }
      if (tab.label == "美食") {
        this.searchFood();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.info-row {
  margin: 40px 0;
}
.map-view {
  display: flex;
  flex: 1;
  height: 360px;
  .map-box {
    width: 65%;
    height: 100%;
  }
  .poi-list {
    padding-left: 20px;
    width: 35%;
    /deep/.el-tabs--border-card > .el-tabs__content {
      padding: 10px;
      padding-right: 0px;
    }
    .poi-list-ol {
      height: 300px;
      overflow: auto;
      font-size: 14px;
      color: #666;
      /deep/.amap_lib_placeSearch {
        border: 0;
        /deep/.amap_lib_placeSearch_page {
          background: #fff;
        }
        /deep/.pageLink {
          border-radius: 20%;
        }
      }
    }
  }
}
</style>

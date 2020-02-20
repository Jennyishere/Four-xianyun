<template>
  <div class="info-row">
    <div class="map-view">
      <div id="container" class="map-box"></div>
      <div class="poi-list">
        <el-tabs type="border-card">
          <el-tab-pane label="用户管理">
            <div class="poi-list-ol">
              <ol>
                <li class="poi-list-item">配置管理</li>
                <li class="poi-list-item">配置管理</li>
                <li class="poi-list-item">配置管理</li>
                <li class="poi-list-item">配置管理</li>
                <li class="poi-list-item">配置管理</li>
                <li class="poi-list-item">配置管理</li>
                <li class="poi-list-item">配置管理</li>
                <li class="poi-list-item">配置管理</li>
                <li class="poi-list-item">配置管理</li>
                <li class="poi-list-item">配置管理</li>
                <li class="poi-list-item">配置管理</li>
              </ol>
            </div>
          </el-tab-pane>
          <el-tab-pane label="配置管理">配置管理</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
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
      centerInfo: []
    };
  },
  mounted() {
    setTimeout(() => {
      this.centerInfo = [
        this.data.location.longitude,
        this.data.location.latitude
      ];

      console.log(this.centerInfo);
    }, 100);

    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=ccfe0710919fd363dbfb8d9b863a8519&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
    //组件加载完后执行的函数
    setTimeout(() => {
      this.mapInit();
    }, 200);
  },
  methods: {
    //地图初始化
    mapInit() {
      window.onLoad = function() {
        var map = new AMap.Map("container", {
          center: this.centerInfo,
          zoom: 13 //初始地图级别
        });
      };
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
    }
    .poi-list-ol {
      height: 300px;
      overflow: auto;
      font-size: 14px;
      color: #666;
      .poi-list-item {
        display: flex;
        margin: 0 20px 20px 10px;
        cursor: pointer;
      }
    }
  }
}
</style>

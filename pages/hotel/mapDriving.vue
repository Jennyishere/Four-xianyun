<template>
    <div style="padding: 100px;">
        <el-row type="flex" :gutter="100">
            <!-- 展示地图 -->
            <el-col :span="12">
                <!-- 地图容器 -->
                <div id="container"></div> 
            </el-col>

            <!-- 输入查找的信息 -->
            <el-col :span="12">
                <!-- 输入框 -->
                <div class="item">
                    <el-input v-model="start" placeholder="请输入起点位置"></el-input>
                </div>
                <div class="item">
                    <el-input v-model="end" placeholder="请输入终点位置"></el-input>
                </div>
                <!-- 搜索按钮 -->
                <div class="item">
                    <el-button @click="handleSearch" type="primary">搜索</el-button>
                </div>
                <!-- 展示路线详细信息 -->
                <div id="panel"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return {
            // 出发的地点
            start: "",
            // 目的地
            end: "",
            // 地图的实例
            map: ""
        }
    },
    mounted() {
        // 动态导入js到head头部中，导入该文件后会有全局的Amap对象
        var url ="https://webapi.amap.com/maps?v=1.4.15&key=0e50af054087c7bec2bd57e4356a4bd3&callback=onLoad";
        var jsapi = document.createElement("script");
        jsapi.charset = "utf-8";
        jsapi.src = url;
        document.head.appendChild(jsapi);

        // 如果文件加载后执行下面的函数
        this.mapInit();
    },
    methods: {
        // 地图初始化
        mapInit(){
            window.onLoad = function() {
                // 根据地图的容器生成地图
                this.map = new AMap.Map("container", {
                    resizeEnable: true
                });
            };  
        },
        // 点击搜索按钮时候触发的事件
        handleSearch(){
            // 根据地图的容器生成地图
            this.map = new AMap.Map("container", {
                resizeEnable: true
            });

            // 导入驾车插件
            AMap.plugin('AMap.Driving', () => {
                // 创建一个路线的实例
                var driving = new AMap.Driving({
                    // 路线要展示的地图容器
                    map: this.map,
                    // 展示详细信息
                    panel: "panel",
                    // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
                    policy: AMap.DrivingPolicy.LEAST_TIME
                })
                
                var points = [
                    { keyword: this.start, city:'广州' },
                    { keyword: this.end, city:'广州' }
                ]
                
                driving.search(points, function (status, result) {
                    // 未出错时，result即是对应的路线规划方案
                })
            })
        }
    }
};
</script>

<style scoped lang="less">
#container {width:500px; height: 500px; }  

.item{
    margin-bottom: 30px;

    button{
        width: 100%;
    }
}

 #panel {
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    width: 280px;
}
#panel .amap-call {
    background-color: #009cf9;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}
#panel .amap-lib-driving {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    overflow: hidden;
}

</style>
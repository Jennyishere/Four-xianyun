<template>
    <div>
        <!-- 地图的容器 -->
        <div id="container"></div>
    </div>
</template>

<script>
export default {
    mounted() {
        // 异步导入地图js （来自于官网）
        var url = 'https://webapi.amap.com/maps?v=1.4.15&key=0e50af054087c7bec2bd57e4356a4bd3&callback=onLoad';
        var jsapi = document.createElement('script');
        jsapi.charset = 'utf-8';
        jsapi.src = url;
        document.head.appendChild(jsapi);
        
        // 地图加载完毕之后会触发
        window.onLoad  = function(){
            // 加载地图容器
            var map = new AMap.Map('container', {
                zoom:11,//级别
            })

            // 调用地图的插件，获取城市名字
            AMap.plugin('AMap.Geolocation', function() {
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
                    buttonPosition: 'RB'
                })

                geolocation.getCurrentPosition()
                AMap.event.addListener(geolocation, 'complete', onComplete)
                AMap.event.addListener(geolocation, 'error', onError)

                function onComplete (data) {
                    // data是具体的定位信息

                    // (点标记)创建一个 Marker 实例：
                    var marker = new AMap.Marker({
                        position: new AMap.LngLat(data.position.lng, data.position.lat),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                        title: data.formattedAddress
                    });

                    console.log(marker)

                    // 将创建的点标记添加到已有的地图实例：
                    map.add(marker);

                    // 移除已创建的 marker
                    // map.remove(marker);
                }

                function onError (data) {
                    // 定位出错
                }
            })
        }
    }
};
</script>

<style scoped lang="less">
#container {
    width: 500px;
    height: 500px;
    margin: 100px auto;
}
</style>
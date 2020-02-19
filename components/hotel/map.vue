<template>
  <div class="map">
      <script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=39406c0b73d92c64b2365096ff6d0236"></script>
      <div id="container"></div> 
  </div>
</template>

<script>
export default {
mounted() {
     var map = new AMap.Map('container');
}
}
</script>

<style lang="less" scoped>
#container {width:500px; height: 280px; } 
</style>


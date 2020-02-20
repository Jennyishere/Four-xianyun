<template>
  <div>
    <el-row class="pic-row">
      <el-col :span="16">
        <img class="main-pic" :src="this.img[this.picture]" alt="" />
      </el-col>
      <el-col :span="8">
        <el-row class="pic-list">
          <el-col
            :span="12"
            class="pic-even"
            v-for="(item, index) in img"
            :key="index"
          >
            <img :src="item" alt="" @click="InFigure(index)" />
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img: [
        "http://157.122.54.189:9093/images/hotel-pics/1.jpeg",
        "http://157.122.54.189:9093/images/hotel-pics/2.jpeg",
        "http://157.122.54.189:9093/images/hotel-pics/3.jpeg",
        "http://157.122.54.189:9093/images/hotel-pics/4.jpeg",
        "http://157.122.54.189:9093/images/hotel-pics/5.jpeg",
        "http://157.122.54.189:9093/images/hotel-pics/6.jpeg"
      ],
      picture: 0
    };
  },
  methods: {
    InFigure(index) {
      this.picture = index;
    }
  }
};
</script>

<style lang="less" scoped>
.pic-row {
  margin: 40px 0;
  .main-pic {
    width: 640px;
    height: 360px;
  }
  .pic-list {
    margin-left: -10px;
    margin-right: -10px;
    .pic-even {
      padding-left: 10px;
      padding-right: 10px;
      img {
        width: 160px;
        margin-bottom: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>

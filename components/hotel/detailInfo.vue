<template>
  <div class="info-row">
    <el-row class="assets-info">
      <el-col :span="4" class="assets-info-hd">基本信息</el-col>
      <el-col :span="20" class="assets-info-bd base-info">
        <el-row type="flex">
          <el-col :span="24">入住时间: 14:00之后</el-col>
          <el-col :span="24">离店时间: 12:00之前</el-col>
          <el-col :span="24"
            >{{ data.creation_time }} / {{ data.renovat_time }}</el-col
          >
          <el-col :span="24">酒店规模: {{ data.roomCount }}间客房</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="assets-info">
      <el-col :span="4" class="assets-info-hd">主要设施</el-col>
      <el-col :span="20" class="assets-info-bd base-info"
        ><div
          v-for="(item, index) in data.hotelassets"
          :key="index"
          class="assets-info-item"
        >
          {{ item.name }}
        </div></el-col
      >
    </el-row>
    <el-row class="assets-info">
      <el-col :span="4" class="assets-info-hd">停车服务</el-col
      ><el-col
        :span="20"
        class="assets-info-bd base-info"
        v-if="data.parking === null"
      >
        -
      </el-col>
      <el-col
        :span="20"
        class="assets-info-bd base-info"
        v-if="data.parking !== null"
      >
        {{ data.parking }}
      </el-col>
    </el-row>
    <el-row class="assets-info">
      <el-col :span="4" class="assets-info-hd">品牌信息</el-col>
      <el-col
        :span="20"
        class="assets-info-bd base-info"
        v-if="data.hotelbrand !== null"
        >{{ data.hotelbrand.name }}
      </el-col>
      <el-col
        :span="20"
        class="assets-info-bd base-info"
        v-if="data.hotelbrand === null"
      >
        -
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {
        hotelbrand: {}
      }
    }
  }
};
</script>

<style lang="less" scoped>
.info-row {
  margin: 40px 0;
}
.assets-info {
  border-bottom: 1px solid #eee;
  .assets-info-hd {
    padding: 20px 10px;
    font-size: 14px;
  }
  .assets-info-bd {
    color: #666;
    font-size: 14px;
  }
  .assets-info-item {
    border: 1px solid #eee;
    padding: 4px 10px;
    margin-right: 10px;
    border-radius: 4px;
    background-color: #eee;
    color: #666;
    display: inline;
  }
  .base-info {
    padding: 20px 10px;
    font-size: 14px;
  }
}
</style>

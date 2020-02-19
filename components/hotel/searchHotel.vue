<template>
  <div class="seach">
    <el-row class="searchBar">
      <el-col :span="6">
        <el-row justify="space-between">
          <el-col :span="12">价格</el-col>
          <el-col :span="12">0-{{highPrice}}</el-col>
        </el-row>
        <el-row>
          <el-slider v-model="highPrice" :max="4000" :step="20"></el-slider>
        </el-row>
      </el-col>
      <el-col :span="5">
        <el-row>住宿等级</el-row>
        <el-row justify="space-between">
          <el-dropdown>
            <span class="el-dropdown-link">
              不限
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <i class="iconfont iconcircle"></i>1 星
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
      </el-col>
      <el-col :span="5"></el-col>
      <el-col :span="4"></el-col>
      <el-col :span="4"></el-col>
    </el-row>
    <HotelItem/>
  </div>
</template>

<script>
import HotelItem from "@/components/hotel/hotelItem";
export default {
  components: { HotelItem },
  data() {
    return {
      highPrice: 50
    };
  }
};
</script>

<style lang="less" scoped>
.seach {
  margin-top: 20px;
}
.searchBar {
  border: 1px solid #ccc;
  padding: 10px;
  font-size: 14px;
  color: #666;
  > .el-col {
    padding: 0 20px;
    height: 60px;
    border-right: 1px solid #ccc;
    &:last-of-type {
      border-right: 0;
    }
  }
}
.el-dropdown {
  width: 100%;
  margin-top: 10px;
}
.el-icon-arrow-down {
  margin-left: 70px;
}
</style>
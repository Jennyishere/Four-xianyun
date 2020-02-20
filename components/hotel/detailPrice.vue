<template>
  <div>
    <el-table :data="data.products" style="width: 100%" @row-click="handdle">
      <el-table-column
        prop="name"
        label="价格来源"
        width="420px"
      ></el-table-column>
      <el-table-column
        prop="bestType"
        label="低价房型"
        width="420px"
      ></el-table-column>
      <el-table-column prop="price" label="最低价格/每晚">
        <template slot-scope="scope">
          <div>
            <span class="price">￥{{ scope.row.price }}</span> 起
            <span
              ><i
                class="el-icon-arrow-right height-light"
                style="color: #f90;"
              ></i
            ></span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {
      }
    }
  },
  methods: {
    handdle(column) {
      window.location.href = "https://hotels.ctrip.com/hotel/694679.html";
    }
  }
};
</script>

<style lang="less" scoped>
.price {
  font-size: larger;
  color: #f90;
}
/deep/.el-table__row {
  cursor: pointer;
}
</style>

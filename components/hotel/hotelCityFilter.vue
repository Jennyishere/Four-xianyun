<template>
  <div class="hotelCityFilter">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>酒店</el-breadcrumb-item>
        <el-breadcrumb-item>{{city}}酒店预订</el-breadcrumb-item>
      </el-breadcrumb>
    <el-row type="flex" class="filter">
      <el-col :span="5">
        <el-autocomplete
          v-model="city"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入内容"
          @select="handleSelect"
        ></el-autocomplete>
      </el-col>
      <el-col :span="9">
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
      <el-col :span="5">
        <el-popover placement="bottom-start" :visible-arrow="false" width="300" v-model="visible">
          <el-row style="margin-bottom: 20px">
            <el-col :span="8">每间</el-col>
            <el-col :span="7">
              <el-select v-model="adults" size="small" @change="handleAdultsVal">
                <el-option v-for="(item,index) in 5" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </el-col>
            <el-col :span="7" style="margin-left: 20px">
              <el-select v-model="kids" placeholder="请选择" size="small" @change="handleKidsVal">
                <el-option v-for="(item,index) in 5" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <div style="text-align: right; margin: 0">
            <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
          </div>
          <el-button slot="reference">
            人数未定
            <i class="el-icon-user el-icon--right user"></i>
          </el-button>
        </el-popover>
      </el-col>
      <el-col :span="5">
        <el-button type="primary">查看价格</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      city: "南京",
      value1: "",
      visible: false,
      adults: 0,
      kids: 0
    };
  },
  methods: {
    querySearchAsync() {},
    handleSelect() {},
    handleKidsVal(val) {
      this.kids = val + " 儿童";
    },
    handleAdultsVal(val) {
      this.adults = val + " 成人";
    }
  }
};
</script>

<style lang="less" scoped>
.filter {
  margin: 20px 0;
}
</style>
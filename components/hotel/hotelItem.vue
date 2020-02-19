<template>
  <div>
    <el-row class="hotelItem">
      <el-col :span="8">图片</el-col>
      <el-col :span="10">
        <h2>好来阁商务宾馆</h2>
        <div class="hoteltype">
          <span>hao lai ge shang wu hotel</span>
          <i class="iconfont iconhuangguan"></i>
          <i class="iconfont iconhuangguan"></i>
          <i class="iconfont iconhuangguan"></i>
          经济型
        </div>
        <el-row class="rate" type="flex">
          <el-rate
            v-model="value"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}分"
          ></el-rate>
          <span>
            <i>51</i>条评价
          </span>
          <span>
            <i>7</i>篇游记
          </span>
        </el-row>
        <div class="location">
          <i class="el-icon-location"></i>位于: 高淳县淳溪镇镇兴路118号(高淳县委党校对面)
        </div>
      </el-col>
      <el-col :span="6">
        <el-row justify="space-between" class="buyWay">
          <span>携程</span>
          <span>
            <em>￥111</em>起
            <i class="el-icon-arrow-right"></i>
          </span>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 3.5
    };
  }
};
</script>

<style lang="less" scoped>
.hotelItem {
  padding: 25px 5px;
  border-bottom: 1px solid #eeeeee;
  color: #333;
  h2 {
    font-weight: normal;
  }
  .hoteltype {
    color: #999;
    font-size: 14px;
  }
  .iconhuangguan {
    color: #ff9900;
  }
}
.rate {
  margin: 10px 0;
  > span {
    margin-left: 20px;
    > i {
      color: #ff9900;
      padding-right: 10px;
    }
  }
}
.location {
  font-size: 13px;
  color: #999;
}
.buyWay {
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid #ebeef5;
    color: #666;
    em {
         color: #ff9900;
         margin-left: 50px;
    }
}
</style>
<template>
  <div class="comment-row">
    <h4>0条真实用户评论</h4>
    <el-row class="scores-row">
      <el-col :span="4">
        <p>总评数：{{ data.all_remarks }}</p>
        <p>好评数：{{ data.good_remarks }}</p>
        <p>差评数：{{ data.bad_remarks }}</p>
      </el-col>
      <el-col :span="5" class="recomment-score">
        <div class="comment-star">
          <el-rate
            v-model="data.stars"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          >
          </el-rate>
        </div>
        <div class="stamp">推荐</div>
      </el-col>
      <el-col :span="3">
        <div class="rate-box">
          <el-progress
            type="circle"
            v-if="data.scores.environment"
            :percentage="data.scores.environment * 10"
            :show-text="false"
          ></el-progress>
          <div class="comment-star-info">
            <span>环境</span><span>{{ data.scores.environment }}</span>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="rate-box">
          <el-progress
            v-if="data.scores.product"
            type="circle"
            :percentage="data.scores.product * 10"
            :show-text="false"
          ></el-progress>
          <div class="comment-star-info">
            <span>产品</span><span>{{ data.scores.product }}</span>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="rate-box">
          <el-progress
            v-if="data.scores.service"
            type="circle"
            :percentage="data.scores.service * 10"
            :show-text="false"
          ></el-progress>
          <div class="comment-star-info">
            <span>服务</span><span>{{ data.scores.service }}</span>
          </div>
        </div>
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
        scores: {}
      }
    }
  },
  data() {
    return {
      value: 5
    };
  }
};
</script>

<style lang="less" scoped>
.comment-row {
  h4 {
    color: #000;
    font-size: 16px;
    font-weight: 700;
  }
  .scores-row {
    color: #666;
    padding: 25px 0;
    font-size: 16px;
    line-height: 23px;
  }
  .recomment-score {
    position: relative;
    display: flex;
    align-content: center;
    .comment-star {
      margin-top: 20px;
    }
    .stamp {
      position: absolute;
      left: 20px;
      top: -3px;
      border: 2px solid #fa3;
      text-align: center;
      line-height: 70px;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      opacity: 0.25;
      transform: rotate(-30deg);
      font-size: x-large;
      color: #f90;
    }
  }

  .rate-box {
    width: 70px;
    height: 70px;
    position: relative;
    /deep/.el-progress-circle {
      width: 70px !important;
      height: 70px !important;
    }
    /deep/.el-progress-circle__path {
      stroke: rgb(255, 153, 0) !important;
      stroke-width: 3 !important;
    }
    .comment-star-info {
      position: absolute;
      top: 50%;
      left: 50%;
      text-align: center;
      transform: translate(-50%, -50%);
      span {
        color: rgb(255, 153, 0);
      }
    }
  }
}
</style>

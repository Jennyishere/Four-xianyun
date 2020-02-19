<template>
  <div class="hotelZone">
      <el-row>
            <el-col :span="3">区域：</el-col>
            <el-col :span="20">
              <el-row :class="{'clickDown-arrow':isShow}">
                <el-tag
                  type="info"
                  v-for="(item,index) in data[0].scenics"
                  :key="index"
                >{{item.name}}</el-tag>
              </el-row>
              <el-row>
                <div @click="isShow=!isShow">
                  <nuxt-link to="#">
                    <i :class="{'el-icon-d-arrow-right':true, 'upicon':!isShow}"></i>
                    等{{data[0].scenics.length}}个区域
                  </nuxt-link>
                </div>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="class">
            <el-col :span="3">
              均价
              <el-tooltip
                class="item"
                effect="dark"
                content="等级均价由平日价格计算得出，节假日价格会有上浮。"
                placement="top-end"
              >
                <sup>
                  <el-button class="wenhao">?</el-button>
                </sup>
              </el-tooltip>：
            </el-col>
            <el-col :span="20">
              <el-row type="flex">
                <el-col :span="8">
                  <el-tooltip
                    :visible-arrow="false"
                    class="item"
                    effect="dark"
                    content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
                    placement="bottom"
                  >
                    <span class="price-budget">
                      <i class="iconfont iconhuangguan"></i>
                      <i class="iconfont iconhuangguan"></i>
                      <i class="iconfont iconhuangguan"></i>
                      ¥332
                    </span>
                  </el-tooltip>
                </el-col>
                <el-col :span="8">
                  <el-tooltip
                    :visible-arrow="false"
                    class="item"
                    effect="dark"
                    content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
                    placement="bottom"
                  >
                    <span class="price-budget">
                      <i class="iconfont iconhuangguan"></i>
                      <i class="iconfont iconhuangguan"></i>
                      <i class="iconfont iconhuangguan"></i>
                      <i class="iconfont iconhuangguan"></i>
                      ¥568
                    </span>
                  </el-tooltip>
                </el-col>
                <el-col :span="8">
                  <el-tooltip
                    :visible-arrow="false"
                    class="item"
                    effect="dark"
                    content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
                    placement="bottom"
                  >
                    <span class="price-budget">
                      <i class="iconfont iconhuangguan"></i>
                      <i class="iconfont iconhuangguan"></i>
                      <i class="iconfont iconhuangguan"></i>
                      <i class="iconfont iconhuangguan"></i>
                      ¥768
                    </span>
                  </el-tooltip>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
  </div>
</template>

<script>
export default {
 props: {
        data: {
            type: Array, // 声明data属性的类型
            default: {},  // 如果组件调用时候不传data，采用默认值
        }
    },
data() {
    return {
        isShow: true,
    }
}
}
</script>

<style lang="less" scoped>
.el-icon-d-arrow-right {
  transform: rotate(90deg);
  color: #ff9900;
  margin-right: 5px;
}
.clickDown-arrow {
  height: 60px;
  overflow: hidden;
}
.upicon {
  transform: rotate(-90deg);
}
.iconhuangguan {
  color: #ff9900;
}
.class {
  margin-top: 20px;
}
</style>
<template>
  <div>
    <div>
      <el-row
        class="hotelItem"
        v-for="(item,index) in dataList"
        :key="index"
        @click.native="$router.push({path:'/hotel/detail',query:{id:item.id}})"
      >
        <el-col :span="8">
          <div class="pic">
            <img :src="item.photos" alt />
          </div>
        </el-col>
        <el-col :span="10">
          <h2>{{item.name}}</h2>
          <div class="hoteltype">
            <span>{{item.alias}}</span>
            <i class="iconfont iconhuangguan"></i>
            <i class="iconfont iconhuangguan"></i>
            <i class="iconfont iconhuangguan"></i>
            经济型
          </div>
          <el-row class="rate" type="flex">
            <el-rate disabled show-score text-color="#ff9900" :score-template="`${item.stars}分`"></el-rate>
            <span>
              <i>{{item.all_remarks}}</i>条评价
            </span>
            <span>
              <i>7</i>篇游记
            </span>
          </el-row>
          <div class="location">
            <i class="el-icon-location"></i>
            位于: {{item.address}}
          </div>
        </el-col>
        <el-col :span="6">
          <el-row justify="space-between" class="buyWay" v-for="(v,i) in item.products" :key="i">
            <span>{{v.name}}</span>
            <span>
              <em>￥{{v.price}}</em>起
              <i class="el-icon-arrow-right"></i>
            </span>
          </el-row>
        </el-col>
      </el-row>
      <el-pagination
        v-if="dataList.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="data.length"
      ></el-pagination>
      <div class="nodata" v-if="!dataList.length">暂无数据</div>
      {{filter}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array, // 声明data属性的类型
      default: []
    }
  },
  data() {
    return {
      pageSize: 5,
      currentPage: 1,
      dataList: []
    };
  },
  mounted() {
    this.sliceData();
  },
  computed: {
    filter() {
      this.currentPage = 1;
      this.sliceData();

      return "";
    }
  },
  methods: {
    // 切换条数时候触发的事件
    handleSizeChange(index) {
      this.pageSize = index;
      this.sliceData();
    },

    // 切换页数时候触发的事件
    handleCurrentChange(index) {
      this.currentPage = index;
      this.sliceData();
    },
    sliceData() {
      // 第一页是0-5，第二页是5-10，第三页是10-15
      this.dataList = this.data.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    }
  }
};
</script>

<style lang="less" scoped>
.hotelItem {
  padding: 25px 5px;
  border-bottom: 1px solid #eeeeee;
  color: #333;
  .pic {
    width: 300px;
    img {
      width: 100%;
      height: 160px;
    }
    &::after {
      position: absolute;
      // top: 100%;
      bottom: 0;
      left: 0;
      z-index: -1;
      display: block;
      content: "";
      height: 22px;
      width: 300px;
      // background-color: #000;
      background: url("https://css.mafengwo.net/images/hotel/hotel_index/floating-card-shadow.png?a=1")
        no-repeat;
      background-size: 100%;
    }
  }
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
.nodata {
  margin-top: 20px;
  text-align: center;
}
</style>
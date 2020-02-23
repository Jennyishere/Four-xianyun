<template>
  <div class="seach">
    <el-row class="searchBar">
      <el-col :span="6">
        <el-row justify="space-between">
          <el-col :span="12">价格</el-col>
          <el-col :span="12">0-4000</el-col>
        </el-row>
        <el-row>
          <el-slider v-model="filters.price_lt" :max="4000" :step="20"></el-slider>
        </el-row>
      </el-col>
      <el-col :span="4" v-for="(item, index) in hotelOptions" :key="index">
        <el-row>{{ item.name }}</el-row>
        <el-row justify="space-between">
          <el-dropdown>
            <span class="el-dropdown-link">
              <span>{{ item.show }}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <!-- :command="val" -->
              <el-dropdown-item
                v-for="(val, i) in item"
                :key="i"
                @click.native="handleSelect(val, i,index)"
                :command="val"
              >
                <i :class="{'iconfont':true, 'iconcircle':!val.select ,'iconright-1':val.select}"></i>
                {{ val.name }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
      </el-col>
    </el-row>
    <span>{{filter}}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      choices: ["住宿等级", "住宿类型", "酒店设施", "酒店品牌"],

      hotelOptions: {},
      filters: {
        price_lt: 4000,
        hotellevel_in: [], // 多选选中了1星和2星
        hoteltype_in: [],
        hotelasset_in: [],
        hotelbrand_in: []
      }
    };
  },
  computed: {
    filter() {
      // console.log(123);
      this.filters.price_lt += 0;
      console.log(
        this.filters.hotellevel_in,
        this.filters.hoteltype_in,
        this.filters.hotelasset_in,
        this.filters.hotelbrand_in
      );
      this.$emit("searchData", this.filters);
      return "";
    }
  },
  mounted() {
    this.$axios({
      url: "hotels/options"
    }).then(res => {
      console.log(res);
      this.hotelOptions = res.data.data;

      Object.keys(this.hotelOptions).map((v, i) => {
        this.hotelOptions[v].name = this.choices[i];
        this.hotelOptions[v].show = " 不限";

        this.hotelOptions[v].map((val, index) => {
          val.select = false;
        });
      });
      console.log(this.hotelOptions);
    });
  },
  methods: {
    handleSelect(val, i, index) {
      console.log(val, i, index);

      if (index == "levels") {
        this.saveData(val, this.filters.hotellevel_in, index);
      } else if (index == "types") {
        this.saveData(val, this.filters.hoteltype_in, index);
      } else if (index == "assets") {
        this.saveData(val, this.filters.hotelasset_in, index);
      } else if (index == "brands") {
        this.saveData(val, this.filters.hotelbrand_in, index);
      }
      // console.log(this.filters);
    },
    saveData(val, arr, index) {
      console.log(val, arr, index);
      if (val.select == false) {
        val.select = true;
        arr.push(val.id);
      } else {
        val.select = false;
        let index = arr.indexOf(val.id);
        if (index > -1) {
          arr.splice(index, 1);
        }
      }
      if (arr.length == 1) {
        this.hotelOptions[index].show = val.name;
      } else if (arr.length > 1) {
        this.hotelOptions[index].show = `已选择${arr.length}项`;
      } else {
        this.hotelOptions[index].show = "不限";
      }
    }
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
.el-dropdown-menu {
  max-height: 200px;
  overflow: auto;
}
</style>

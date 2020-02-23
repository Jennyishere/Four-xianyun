<template>
  <div class="hotelCityFilter">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>酒店</el-breadcrumb-item>
      <el-breadcrumb-item>{{city}}酒店预订</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row type="flex" class="filter">
      <el-col :span="5" style="margin-right:20px">
        <!-- 城市输入框 -->
        <el-autocomplete
          v-model="form.city"
          :fetch-suggestions="querySearch"
          placeholder="请输入城市"
          @select="handleSelect"
          @blur="handleBlur"
        ></el-autocomplete>
      </el-col>
      <el-col :span="9">
        <el-date-picker
          v-model="date"
          @blur="dateBlur"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-col>
      <el-col :span="5">
        <el-popover
          placement="bottom-start"
          :visible-arrow="false"
          width="300"
          v-model="visible"
          @hide="handleHide"
        >
          <el-row style="margin-bottom: 20px">
            <el-col :span="8">每间</el-col>
            <el-col :span="7">
              <el-select v-model="adults" size="small" @change="handleAdultsVal">
                <el-option v-for="(item,index) in 5" :key="index" :label="index" :value="index"></el-option>
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
            {{reference}}
            <i class="el-icon-user el-icon--right user"></i>
          </el-button>
        </el-popover>
      </el-col>
      <el-col :span="5" class="btn">
        <el-button type="primary" @click="handleCheckPrice">查看价格</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Momment from "moment";
export default {
  props:["data"],
  data() {
    return {
      city:'',
      date: "",
      visible: false,
      reference: "人数未定",
      adults: 0,
      kids: 0,
      person: 0,
      adultsNum: 0,
      kidsNum: 0,
      form: {
        city: "",
        enterTime: "",
        leftTime: ""
      }
    };
  },
  watch:{
    'data'() {
      this.form.city = this.data
  }
  },
  methods: {
    // 获取提示城市
    querySearch(val, callback) {
      if (!val) {
        // this.departData = [];
        callback([]);
        return;
      }
      // console.log(val);获取输入框的值 发送请求获取自动填充
      return this.$axios({
        url: "/airs/city",
        params: {
          name: val
        }
      }).then(res => {
        // console.log(res);
        const { data } = res.data;

        // 给data中没一项都添加一个value属性 (forEach,map)
        const newData = data.map(v => {
          v.value = v.name;
          // map返回的数组由return组成的
          return v;
        });
        callback(newData);
      });
    },
    // 选择时将city值传回父组件
    handleSelect(val) {
      console.log(val);
      this.$emit("sendCity", val.name);
    },
    // 失焦时将city值传回父组件
    handleBlur() {
      this.city = this.form.city
      this.$emit("sendCity", this.form.city);
    },
    // 日期选择的失焦
    dateBlur() {
      console.log(this.date);
      this.form.enterTime = this.date[0];
      this.form.leftTime = this.date[1];
    },
    handleKidsVal(val) {
      this.kidsNum = val;
      if (val) this.kids = val + " 儿童";
    },
    handleAdultsVal(val) {
      this.adultsNum = val;
      if (val) this.adults = val + " 成人";
    },
    handleHide() {
      this.person = this.kidsNum + this.adultsNum;
      if (this.adults == 0 && this.kids != 0) {
        this.reference = this.kids;
      } else if (this.adults != 0 && this.kids == 0) {
        this.reference = this.adults;
      } else if (this.adults && this.adults) {
        this.reference = this.adults + "  " + this.kids;
      } else {
        this.reference = "人数未定";
      }
    },
    handleCheckPrice() {
      this.$emit("sendData", this.form);
    }
  }
};
</script>

<style lang="less" scoped>
.filter {
  margin: 20px 0;
}
.user {
  margin-left: 70px;
}
.btn {
  margin-left: 20px;
}
</style>
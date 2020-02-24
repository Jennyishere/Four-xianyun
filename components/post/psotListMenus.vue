<template>
  <div style="margin: 20px 0px;" class="main" @mouseleave="handleLeave">
    <!-- 左边的城市列表 -->
    <div class="left" >
      <ul>
        <li
          v-for="(item, index) in cities"
          :key="index"
          @mouseenter="handleEnter(index)"
          :class="{active: current === index}"
          @mouseleave="handleIndex"
        >
          <el-row type="flex" justify="space-between" ref="li">
            <p>{{item.type}}</p>

            <i class="el-icon-arrow-right righticon"></i>
          </el-row>
        </li>
      </ul>
    </div>

    <!-- 右边当前的城市景区列表 -->
    <div class="sub_menus" v-if="current !== false">
      <div v-for="(item, index) in cities[current].children" :key="index" class="main_menus">
        <span class="one_menus">{{++index}}</span>
        <!-- {{item.desc}} -->
    <span class="three_menus"  @click='$store.commit("post/setSearch", item.city)'>{{item.desc}}</span>
    <span class="tow_menus" @click='$store.commit("post/setSearch", item.city)'> {{item.city}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 记录当前的索引
      current: false,

      // 数据
      cities: []
    };
  },
  methods: {
    // 左侧菜单鼠标移入的事件
    handleEnter(index) {
      
      // 记录当前的索引
      this.current = index;
       this.$refs.li[ this.current].$el.classList.add("yanse");//鼠标移入
    },
    // 鼠标离开时候触发的事件
    handleLeave() {
    
      this.current = false;
    },
    handleIndex(){
  this.$refs.li.forEach(v => {
        v.$el.classList.remove("yanse");
      });
    }
  },
  mounted() {
    //发起请求
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      this.cities = res.data.data;
     
    });
  }
};
</script>

<style lang="less" scoped>
.main {
  position: relative;
}
.left {
  width: 100%;
  font-size: 14px;
  border-bottom: 1px #ccc solid;
  position: relative;
  z-index: 10;
}
.left li {
  width: 100%;
  border: 1px #ccc solid;
  border-bottom: none;
  font-size: 14px;
  line-height: 40px;
  p {
    padding-left: 30px;
  }
  .righticon {
    font-size: 20px;
    padding: 10px;
  }
}
.left .active {
  border-right: 1px #fff solid;
}
.sub_menus {
  width: 320px; 
  border: 1px solid #ccc;
  padding: 20px;
  position: absolute;
  top: 0px;
  left: 261px;
  z-index: 2;
  background-color: #fff;

  .main_menus {
    padding-bottom: 10px;
    .one_menus {
      color: #ffa500;
      font-style: italic;
      font-size: 25px;
      display: inline-block;
      padding-left: 15px;
      padding-right: 10px;
    }
    .tow_menus {
      color: #ffa500;
      padding-right: 10px;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
    .three_menus {
      color: #999999;
      font-size: 13px;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
}
.yanse{
   color: #ffa500;
}
</style> 
<template>
    <div class="search-form">
        <!-- 头部tab切换 -->
        <el-row type="flex" class="search-tab">
            <span 
            v-for="(item, index) in tabs" :key="index"
            @click="handleSearchTab(item, index)"
            :class="{active: index === currentTab}">
                <i :class="item.icon"></i>{{item.name}}
            </span>
        </el-row>

        <el-form class="search-form-content" ref="form" label-width="80px">

            <el-form-item label="出发城市">
                <!-- fetch-suggestions: 监听输入框的输入，可以在这个事件中请求API数据,类似input事件 -->
                <!-- select: 点击展开列表选项时候触发 -->
                <el-autocomplete
                v-model="form.departCity"
                :fetch-suggestions="queryDepartSearch"
                placeholder="请搜索出发城市"
                @select="handleDepartSelect"
                class="el-autocomplete"
                ></el-autocomplete>
            </el-form-item>



            <el-form-item label="到达城市">
                <el-autocomplete
                :fetch-suggestions="queryDestSearch"
                placeholder="请搜索到达城市"
                @select="handleDestSelect"
                class="el-autocomplete"
                ></el-autocomplete>
            </el-form-item>

            <el-form-item label="出发时间">
                <!-- change 用户确认选择日期时触发 -->
                <el-date-picker type="date" 
                placeholder="请选择日期" 
                style="width: 100%;"
                @change="handleDate">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="">
                <el-button style="width:100%;" 
                type="primary" 
                icon="el-icon-search"
                @click="handleSubmit">
                    搜索
                </el-button>
            </el-form-item>
            <div class="reverse">
                <span @click="handleReverse">换</span>
            </div>
        </el-form>  
      </div>
</template>

<script>
export default {
    data(){
        return {
            tabs: [
                {icon: "iconfont icondancheng", name: "单程"},
                {icon: "iconfont iconshuangxiang", name: "往返"}
            ],
            currentTab: 0,

            // 表单的字段
            form: {
                departCity: "",
                departCode: "",
                destCity: "",
                destCode: "",
                departDate: ""
            }
        }
    },
    methods: {
        // tab切换时触发
        handleSearchTab(item, index){
            
        },
        
        // 监听出发城市输入框的事件
        // value是输入框的值
        // cb可以接收数组，把数组列表展示出来
        queryDepartSearch(value, cb){
            // 如果输入框没有值就直接返回
            if(!value){
                return;
            }
           
            // 根据value请求城市列表
            this.$axios({
                url: "/airs/city",
                // axios的get请求的参数使用params, 如果是post请求使用data
                params: {
                    name: value
                }
            }).then(res => {
                // data是数组，但是数组中的对象没有value值
                const {data} = res.data;

                // 给data中没一项都添加一个value属性 (forEach,map)
                const newData = data.map(v => {
                    v.value = v.name.replace("市", "");
                    // map返回的数组由return组成的
                    return v;
                })

                // cb把数组展示到列表中, 数组中每一项必须是对象，对象中必须有value属性
                cb(newData);
            })      
        },


        queryDestSearch(value, cb){

        },
       
        // 出发城市下拉选择时触发
        handleDepartSelect(item) {
            this.form.departCity = item.value;
            this.form.departCode = item.sort;
        },

        // 目标城市下拉选择时触发
        handleDestSelect(item) {
            
        },

        // 确认选择日期时触发
        handleDate(value){
           
        },

        // 触发和目标城市切换时触发
        handleReverse(){
            
        },

        // 提交表单是触发
        handleSubmit(){
           console.log(this.form)
        }
    },
    mounted() {
       
    }
}
</script>

<style scoped lang="less">
.search-form{
    border:1px #ddd solid;
    border-top:none;
    width:360px;
    height:350px;
    box-sizing: border-box;
}

.search-tab{
  span{
    display: block;
    flex:1;
    text-align: center;
    height:48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top:3px #eee solid;
    background:#eee;
  }

  .active{
    border-top-color: orange;
    background:#fff;
  }

  i{
    margin-right:5px;
    font-size: 18px;

    &:first-child{
      font-size:16px;
    }
  }
}

.search-form-content{
  padding:15px 50px 15px 15px;
  position: relative;

  .el-autocomplete{
    width: 100%;
  }
}

.reverse{
  position:absolute;
  top: 35px;
  right:15px;

  &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:-35px;
      width:25px;
      height:1px;
      background:#ccc;
  }

  &:after{
      top:0;
    }

    &:before{
      top:60px;
    }

  span{
    display: block;
    position:absolute;
    top: 20px;
    right:0;
    font-size:12px;
    background: #999;
    color:#fff;
    width:20px;
    height:20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:10px;
      width:1px;
      height:20px;
      background:#ccc;
    }

    &:after{
      top:-20px;
    }

    &:before{
      top:20px;
    }
  }
}
</style>

<template>
  <div>
    <!-- mian -->
    <div :v-model="form" ref="form">
      攻略:
      <span v-html="detailList[0].city.created_at" v-if="detailList[0]"></span>
      阅读:
      <span v-html="detailList[0].watch" v-if="detailList[0]"></span>
      <div class="content" v-html="detailList[0].content" v-if="detailList[0]"></div>
      <i class="el-icon-edit"></i>
      <i class="el-icon-share" @click="Tips"></i>
    </div>

    <!-- footer -->
    <div>
      <!-- 输入框 -->

      <div class="ip">
        <span class="right">评论</span>
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.content"></el-input>
      </div>
      <!-- 上传 按钮 -->
      <div>
        <el-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove"
  v-model="form.pics"
  >
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible" size="tiny">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
        <!-- 按钮 -->
        <el-button type="success" @click='submit'>提交</el-button>
      </div>
      <!-- 评论区 -->
    </div>
    <div>
   <div class="keeps" 
   
   >
      <h2>评论</h2>
      <div class="item" v-for="(item,index) in     dataList" :key='index'>
        <div class="head">
          <img :src="item.account.defaultAvatar" alt /> <p>{{item.account.nickname}}</p>
          <div>
           
            <img :src="item.pics.url" alt="">
           
          </div>
          
        </div>
        <div class="text">{{item.content}}</div>
      </div>
      <div class="more">更多跟帖</div>
    </div>
    <!-- 分页 -->
    <div class="block">
    
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
 </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detailList: [],
      //分页
      fenye:[],
           pageIndex: 1, // 当前页数
            pageSize: 5,  // 显示条数
            list:[],
            start:0,
            limit:5,
            total:0,
            //上传
          dialogImageUrl: '',
        dialogVisible: false,

      form: {
        content:'',
        pics:[],
        id:''
      },
      pinglun:[],
      //评论对象
      
    };
  },
  computed:{
    dataList(){
      const arr =this.pinglun.slice(
         (this.pageIndex - 1) * this.pageSize, 
          this.pageIndex * this.pageSize
      )
      return arr;
  },
  },
  mounted() {
    //分页
    this.getData();

    const { id } = this.$route.query;
    //console.log(id)
    this.form.id =id
    //请求文章详情
    this.$axios({
      url: "/posts",
      params: {
        id
      }
    }).then(res => {
      //console.log(res)
      const { data } = res.data;

      this.detailList = data;
      // console.log(this.detailList)
    });
    //
      //获取评论
      this.$axios({
        url: "/posts/comments",
        params: {
          post :id,
         _start: 0,
         _limit: 5,
         

        }
      }).then(res => {
       // console.log(res)
        const {data} =res.data
      this.pinglun =data
        console.log(data)
      this.fenye =data

      });
  },
  methods: {
    //分页
        handleSizeChange(index) {
       this.pageSize = index;
    },
    handleCurrentChange(index) {
      //this.start = (index - 1) * this.limit;
       this.pageIndex = index;
      //this.getData();

       
    },
  handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
    Tips() {
      this.$message({
        message: "暂时不支持分享",
        type: "warning"
      });
    },
    //提交
    submit(){
      this.$axios({
        url:'/comments',
        methods:'POST',
        data:this.form 
      }).then(res =>{
        console.log(res)
      })
    },
    //分页
    getData(){
    const { id } = this.$route.query;

this.$axios({
        url: "/posts/comments",
        params: {
          post :id,
         _start: this.start,
         _limit: this.limit,
         

        }
      }).then(res => {
       // console.log(res)
       const {data, total} = res.data;
      this.list = data;
      console.log(this.list)
      this.total = total;

      });
    }

  }
}
</script>

<style scoped lang="less">
i {
  cursor: pointer;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
// 上传
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
//评论区
.keeps {
  border-top: 5px solid #ddd;
  padding: 0 15px 50px;
  > h2 {
    line-height: 50px;
    text-align: center;
  }
  .item {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > img {
        width: 16px;
        height: 16px;
        display: block;
        border-radius: 50%;
      }
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        > span {
          font-size: 12px;
          color: #999;
          line-height: 25px;
        }
      }
      > span {
        color: #999;
        font-size: 13px;
      }
    }
    .text {
      font-size: 14px;
      color: #333;
      padding: 20px 0 10px 0;
    }
  }
  .more {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 20px auto;
    font-size: 13px;
  }
}

</style>
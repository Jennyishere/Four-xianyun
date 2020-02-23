<template>
  <div>
    <!-- mian -->
    <div>
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
      
      <div class="ip" >
        <span class="right">评论</span>
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
      </div>
      <!-- 上传 按钮 -->
  <div>

    <el-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible" size="tiny">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
<!-- 按钮 -->
<el-button type="success">提交</el-button>
  </div>
      <!-- 评论区 -->
      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detailList: [],
         imageUrl: '',
         textarea: '',
          dialogImageUrl: '',
        dialogVisible: false
    };
  },
  mounted() {
    const { id } = this.$route.query;
    //console.log(id)

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
  },
     methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      Tips(){
           this.$message({
          message: '暂时不支持分享',
          type: 'warning'
        });
      }
    }
  
};
</script>

<style scoped lang="less">
i{
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
    border-color: #409EFF;
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
</style>
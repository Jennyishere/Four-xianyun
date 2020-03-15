<template>
  <div class="post-detail">
    <el-row>
    <el-col :span="17">
      <div class="detail-content">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/post' }">旅游攻略</el-breadcrumb-item>
          <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 标题-->
        <h1>塞班贵？一定是你的打开方式不对！6000块玩转塞班</h1>
        <!-- 攻略&时间 -->
        <div class="post-info">
          <span>
            攻略:
            <i>2019-05-22 10:57</i>
          </span>
          <span>
            阅读:
            <i>14671</i>
          </span>
        </div>
        <!-- 正文 -->
        <div
          class="detail-text"
        >大家对塞班岛总存在着这样的误解，知道它是美属地盘，就理所当然地觉得这里的花费一定很高，花费高有高的玩法，那如果只有6000块的预算呢？要怎么玩？关于旅行这件事，我们要让钱花得更有道理，收下这份攻略，带你6000块花式玩转塞班。</div>

        <el-row class="post-ctrl">
          <!-- icon -->
          <el-col :span="12" class="post-crtl-item">
            <i class="iconfont iconpinglun"></i>
          </el-col>
          <el-col :span="12" class="post-crtl-item">
            <i class="iconfont iconfenxiang" @click="shareUser"></i>
          </el-col>
          <el-col :span="12" class="post-crtl-item">
            评论:(
            <strong>11</strong>
            )
          </el-col>
          <el-col :span="12" class="post-crtl-item">分享</el-col>
        </el-row>
        <!--  -->
        <div class="cmt-wrappr">
          <h4>评论</h4>

          <el-input
            type="textarea"
            ref="detailText"
            placeholder="说点什么吧..."
            v-model="textareaInput"
            resize="none"
          ></el-input>
          <el-row>
             <el-col :span="16">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </el-col>
          <el-col :span="8" style="text-align:right;">
              <el-button type="primary" size="mini" @click="submitComment">提交</el-button>
            </el-col>
          </el-row>
         <!-- 评论组件 -->
         <div>
           我是评论区
         </div>
        </div>
      </div>
    </el-col>
    <el-col :span="7">
      <div>相关推荐</div>
    </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data(){
    
  }
};
</script>

<style lang='less' scoped>
.post-detail {
  width: 1000px;
  min-width: 1000px;
  margin: 0 auto;
  padding-top: 20px;
}
.detail-content {
  h1 {
    padding: 20px 0 30px 0;
    border-bottom: 1px dashed #ddd;
  }
}
.post-info {
  text-align: right;
  color: #999;
  padding: 20px;
  span {
    margin-left: 20px;
  }
  i {
    color: orange;
  }
}
// 正文
.detail-text {
}
// icon
.post-ctrl {
  text-align: center;
  padding: 35px;
  color: #666;
  cursor: pointer;
  i {
    display: block;
    font-size: 29px;
    color: orange;
    padding-bottom: 10px;
  }
  strong {
    font-weight: 400;
    color: orange;
  }
}
</style>
<template>
<<<<<<< HEAD
    <div style="padding:100px;">
        <h2>写一个组件递归的例子</h2>

		<div class="navs">

			<!-- 循环渲染菜单的列表 -->
			<!-- <div 
			v-for="(item1, index1) in navs"
			:key="index1">
				第一级的菜单的名字
				<span>{{item1.text}}</span>

				<div 
				v-for="(item2, index2) in item1.children"
				:key="index2">
					 第二级菜单的名字
					<span>{{item2.text}}</span>

					<div 
					v-for="(item3, index3) in item2.children"
					:key="index3">
						第三级菜单的名字
						<span>{{item3.text}}</span>
					</div>
				</div>
			</div> -->

			<!-- 调用递归的组件 -->
			<Item :data="navs"/>
		</div>
    </div>
</template>

<script>

import Item from "@/components/post/item";

export default {
    data() {
        return {
			// 需要递归展示的菜单数据
            navs: [
                {
                    text: "服装",
                    children: [
                        {
                            text: "男装",
                            children: [
								{
									text: "上衣"
								},
								{
									text: "裤子"
								}
							]
						},
						{
							text: "女装",
							children: [
								{
									text: "裙子"
								}
							]
						}
                    ]
				},
				{
					text: "家电",
					children: [
						{
							text: "冰箱"
						},
						{
							text: "空调"
						}
					]
				}
            ]
        };
	},
	components: {
		Item
	}
};
</script>

<style scoped lang="less">
.navs{
	margin-top: 50px;
=======
  <section class="container">
    <el-row type="flex">
      <!-- 左边列表 -->
      <div>
        <!-- 菜单城市 -->
        <Citymenus />
        <!-- 推荐城市 -->
        <div class="aside-recommend">
          <h4 class="aside-title">推荐城市</h4>
          <nuxt-link to="#" class="aside-recommend-item">
            <img src="../../images/pic_sea.jpeg" alt />
          </nuxt-link>
        </div>
      </div>
      <!-- 右侧列表 -->
      <div class="post-wrapper">
        <!-- 搜索框 -->
        <Citysearch/>
        <!-- 推荐攻略 -->
        <el-row type="flex" justify="space-between" class="post-title">
          <h4>推荐攻略</h4>
          <el-button type="primary" icon="el-icon-edit">写游记</el-button>
        </el-row>
        <!-- 城市文章列表 -->
        <Citylist/>
      </div>
    </el-row>
  </section>
</template>

<script>
import Citymenus from "../../components/post/psotListMenus"; //菜单城市
import Citysearch from '../../components/post/PostCitysearch';//搜索框
import Citylist from '../../components/post/PostCityList';//城市列表
export default {
  data() {
    return {};
  },
  components: {
    //菜单城市
    Citymenus,
    //搜索框
    Citysearch,
    //城市列表
    Citylist
  }
};
</script>

<style scoped lang="less">
.container {
  width: 1000px;
  margin: 0 auto;
  .aside-recommend {
    width: 260px;
    .aside-title {
      font-weight: 400;
      padding-bottom: 10px;
      border-bottom: 1px solid #ddd;
      margin-bottom: 10px;
    }
    .aside-recommend-item {
      text-decoration: none;
      color: inherit;
      img {
        width: 100%;
        display: block;
      }
    }
  }
  .post-wrapper{
    width: 700px;
   
    .post-title{
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
       margin-left: 38px;
      h4{
        padding-top: 10px;
        margin-bottom:-12.8px;
        font-weight: 400;
        font-size: 18px;
        border-bottom: 2px solid orange;
        color: orange;
      }
    }
  }
>>>>>>> 5e91c2e07b21326164ae726436595aa5081fbf9c
}
</style>
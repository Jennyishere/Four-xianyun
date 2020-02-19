<template>
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
}
</style>
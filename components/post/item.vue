<template>
    <!-- 用来递归的组件 -->
    <div class="item">
        <div 
        v-for="(item, index) in data"
        :key="index">
            {{item.text}}

            <!-- 在模板中再次调用自己 -->
            <item :data="item.children"/>
        </div>
    </div>
</template>

<script>
export default {
    // 组件名称，可以用于在当前的组件自己调用自己
    name: "item",
    props: ['data']
};
</script>

<style scoped>
.item div{
	padding-left:50px;
}
</style>
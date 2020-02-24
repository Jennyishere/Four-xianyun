<template>
  
</template>

<script>
export default {
    // 调用这个组件时，评论数据的parent
    // name:'commentItem',
    // props:['parent']
}
</script>

<style lang='less' scoped>
    .commentItem{
        border: 1px solid #ccc;
        padding: 5px;
        margin-top: 10px;
        .top{
            font-size: 12px;
            color: #aaa;
            display: flex;
            justify-content: space-between;
        }
        .bottom{
            font-size: 13px;
            line-height: 40px;
        }
    }
</style>
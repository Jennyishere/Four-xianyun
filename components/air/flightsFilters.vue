<template>
    <div class="filters">
        <el-row type="flex" class="filters-top" justify="space-between" align="middle">
            <el-col :span="8">
                单程： 
                {{data.info.departCity}} - {{data.info.destCity}} 
                / 
                {{data.info.departDate}} 
            </el-col>
            <el-col :span="4">
                <!-- 机场列表 -->
                <!-- select中option的label是展示出来的文字，value是选择时候的值 -->
                <el-select size="mini" 
                v-model="airport" 
                placeholder="起飞机场" 
                @change="handleAirport">
                    <el-option
                    v-for="(item, index) in data.options.airport"
                    :key="index"
                    :label="item"
                    :value="item"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <!-- 起飞时间列表 -->
                <el-select 
                size="mini" 
                v-model="flightTimes"  
                placeholder="起飞时间" 
                @change="handleFlightTimes">
                    <el-option
                    v-for="(item, index) in data.options.flightTimes"
                    :key="index"
                    :label="`${item.from}:00 - ${item.to}:00`"
                    :value="`${item.from},${item.to}`"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <!-- 航空公司 -->
                <el-select 
                size="mini" 
                v-model="company"  
                placeholder="航空公司" 
                @change="handleCompany">
                    <el-option
                    v-for="(item, index) in data.options.company"
                    :key="index"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <!-- 机型列表 -->
                <el-select 
                size="mini" 
                v-model="airSize" 
                placeholder="机型" 
                @change="handleAirSize">
                    <el-option
                    v-for="(item, index) in airSizeList"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <div class="filter-cancel">
            筛选：
            <el-button 
                type="primary" 
                round 
                plain 
                size="mini" 
                @click="handleFiltersCancel">
                撤销
    		</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            airport: "",        // 机场
            flightTimes: "",    // 出发时间
            company: "",        // 航空公司
            airSize: "",        // 机型大小

            airSizeList: [      // 机型大小的列表
                { label: "大", value: "L" },
                { label: "中", value: "M" },
                { label: "小", value: "S" }
            ]
        }
    },
    props: {
        // 组件可以接收的属性
        data: {
            type: Object,
            default: {}
        }
    },
    methods: {
        // 选择机场时候触发
        handleAirport(value){
            // 从所有出发机场里面找到条件符合value的
            const newData = this.data.flights.filter(v => {
                // 如果return的值是true，说明是符合条件
                return v.org_airport_name === value;
            })

            this.$emit("getData", newData);
        },

        // 选择出发时间时候触发
        handleFlightTimes(value){
            const arr = value.split(","); // ["6","12"]
            
            const newData = this.data.flights.filter(v => {
                // 出发时间的小时
                const hours = Number(v.dep_time.split(":")[0]);
                // 判断出发的小时是否在选中的时间段内
                return Number(arr[0]) <= hours && hours < Number(arr[1]);
            })

            this.$emit("getData", newData);
        },

         // 选择航空公司时候触发
        handleCompany(value){
            // 从所有航班里面找到条件符合value的 （假设是东航）
            const newData = this.data.flights.filter(v => {
                // 如果return的值是true，说明是符合条件
                return v.airline_name === value;
            })

            this.$emit("getData", newData);
        },

         // 选择机型时候触发
        handleAirSize(value){
           // 从所有航班里面找到条件符合value的 （假设是东航）
            const newData = this.data.flights.filter(v => {
                // 如果return的值是true，说明是符合条件
                return v.plane_size === value;
            })

            this.$emit("getData", newData);
        },
        
        // 撤销条件时候触发
        handleFiltersCancel(){
            
        },
    }
}
</script>

<style scoped lang="less">
    .filters{
        margin-bottom:20px;
    }

    .filters-top{
        > div{
            /deep/ .el-select{
                margin-left:10px;
            }
        }
    }

    .filter-cancel{
        margin-top:10px;
    }
</style>
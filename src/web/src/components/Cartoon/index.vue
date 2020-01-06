<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="6" :offset="1">
          <el-input
            placeholder="番剧ID"
            v-model="carId"
            clearable>
          </el-input>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-input
            placeholder="番剧名"
            v-model="carName"
            clearable>
          </el-input>
        </el-col>
        <!--<el-col :span="5" :offset="1">-->
          <!--<el-select v-model="fanMountLevel" placeholder="默认全部" @change="goFans">-->
            <!--<el-option-->
              <!--v-for="item in options"-->
              <!--:key="item.value"-->
              <!--:label="item.label"-->
              <!--:value="item.value">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</el-col>-->
      </el-row>
    </el-header>
    <el-main>

    </el-main>
  </el-container>
</template>
<script>
  export default {
    name: "CARTOON",
    data() {
      return {
        carId: '',
        carName: ''
      }
    },
    methods: {

    }
  }
</script>

<template>
  <el-container>
    <el-header>
      <el-row class="search-item shadow">
        <el-col :span="4" :offset="1">
          <el-input
            size="small"
            placeholder="番剧ID"
            v-model="cId"
            clearable>
          </el-input>
        </el-col>
      </el-row>
    </el-header>



  </el-container>
</template>

<script>
  export default {
    data(){
      return {
        cId: ''
      }
    },
    created(){
      this.$store.dispatch("SearchCartoon/actionCartoonHistoryList")
    },
    methods: {

    }
  }
</script>

<style>
  .search-item {
    padding: 10px 10px;
  }
</style>

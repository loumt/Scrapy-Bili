<template>
  <el-menu default-active="1" class="el-menu-vertical-demo">
    <el-menu-item index="1" @click="toUperList">
      <icon name="bili-short"
            :scale="3"
            style="color: #51b7fe;"></icon>
      <span slot="title">关注的UP主啊</span>
    </el-menu-item>
    <el-menu-item index="2" @click="toCartoon">
      <icon name="bili-short"
            :scale="3"
            style="color: #51b7fe;"></icon>
      <span slot="title">关注的番剧啊</span>
    </el-menu-item>
    <el-menu-item index="3" @click="toFindUper">
      <icon name="bili-short"
            :scale="3"
            style="color: #51b7fe;"></icon>
      <span slot="title">这里查询UP主</span>
    </el-menu-item>
    <el-menu-item index="4" @click="toFindCartoon">
      <icon name="bili-short"
            :scale="3"
            style="color: #51b7fe;"></icon>
      <span slot="title">这里查询番剧</span>
    </el-menu-item>
    <el-menu-item index="5" @click="toExport">
      <icon name="bili-short"
            :scale="3"
            style="color: #51b7fe;"></icon>
      <span slot="title">来导出数据吧</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    methods: {
      toUperList(){
        this.$router.push({name: 'attention_up'})
      },
      toFindUper(){
        this.$router.push({name: 'search_up'})
      },
      toFindCartoon(){
        this.$router.push({name: 'search_cartoon'})
      },
      toExport(){
        this.$router.push({name: 'export'})
      },
      toCartoon(){
        this.$router.push({name: 'attention_cartoon'})
      }
    }
  }
</script>

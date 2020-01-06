<template>
  <el-row class="tac">
    <el-col :span="4">
      <navbar/>
    </el-col>

    <el-col :span="18" :offset="1">
      <el-collapse-transition>
        <router-view/>
      </el-collapse-transition>
    </el-col>
    <right-navbar/>
  </el-row>
</template>

<script>
  import Navbar from '@/components/Navbar'
  import RightNavbar from '@/components/RightNavbar'
  export default {
    name: "LayoutDefault",
    components: {
      Navbar,
      RightNavbar
    }
  }
</script>

<template>
  <el-menu :default-active="menuIndex" class="el-menu-vertical-demo" style="text-align: center;">
    <el-menu-item v-show="item.show" :index="index + ''" @click="redirectMenu(item.name)" v-for="(item,index) in menu" :key="index">
      <icon :name="item.icon.name"
            :scale="item.icon.scale"
            :style="item.icon.color"></icon>
      <span>{{item.title}}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    mounted(){
      this.calculateMenuIndex(this.$route.path)
    },
    computed: {
      ...mapState("BiliBili", {
        menuIndex : state => state.menuIndex,
        menu : state => state.menu
      })
    },
    methods: {
      redirectMenu(name){
        this.$router.push({name})
      },
      calculateMenuIndex(routePath){
        this.$store.dispatch("BiliBili/positionMenu", routePath)
      }
    }
  }
</script>

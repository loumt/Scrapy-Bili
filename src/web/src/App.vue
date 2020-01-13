<template>
  <div id="app">
    <drag-ball>
      <span @click="showDragInfo" @contextmenu.prevent="showMenu" slot="value">{{this.requestCount}}</span>
    </drag-ball>
    <router-view/>
  </div>
</template>

<script>
  import DragBall from './components/DragBall.vue'
  import {getLimit} from "./service/getData"
  export default {
    name: 'App',
    data(){
      return {
        requestCount: 0
      }
    },
    created(){
      //请求定时器
      setInterval(()=>{
        getLimit().then(res=>{
          this.requestCount = res.data.count;
        })
      }, 2000)
    },
    methods: {
      showDragInfo(){
        switch (this.requestCount) {
          case this.requestCount >= 90:
            this.$message.error(`90s内请求${this.requestCount}次与B站的数据交易~自动防护启动~`);
          case this.requestCount >= 70 &&  this.requestCount < 90:
            this.$message({
              message: `90s内请求${this.requestCount}次与B站的数据交易~`,
              type: 'warning'
            });
          case this.requestCount >= 50 &&  this.requestCount <= 70:
            this.$message(`90s内请求${this.requestCount}次与B站的数据交易~`);
          default:
            this.$message({
              message: `90s内${this.requestCount}次与B站的数据交易~`,
              type: 'success'
            });
        }
      },
      showMenu(){}
    },
    components: {
      DragBall
    }
  }
</script>

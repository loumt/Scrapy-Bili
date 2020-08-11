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

    <drag-ball>
      <span @click="showDragInfo" @contextmenu.prevent="showMenu" slot="value">{{this.requestCount}}</span>
    </drag-ball>
  </el-row>
</template>

<script>
    import Navbar from '@/components/Navbar'
    import RightNavbar from '@/components/RightNavbar'
    import DragBall from '@/components/DragBall.vue'

    import {getLimit,getEmoji} from "./../service/getData"
    import emijiUtil from "./../plugins/emijiUtil"


    export default {
        name: "LayoutDefault",
        components: {
            Navbar,
            RightNavbar,
            DragBall
        },
        data() {
            return {
                requestCount: 0,
                limitTimer: null
            }
        },
        mounted(){
            getEmoji(1,9999).then(res => {
                res.data.list.map(item => {
                    emijiUtil.pushEmoji(item.key, item.url)
                })
            })
        },
        created() {
            //请求定时器
            this.limitTimer = setInterval(() => {
                getLimit().then(res => {
                    // console.log(res)
                    if(res.data) this.requestCount = res.data.count;
                })
            }, 2000)
        },
        methods: {
            showDragInfo() {
                switch (this.requestCount) {
                    case this.requestCount >= 90:
                        this.$message.error(`90s内请求${this.requestCount}次与B站的数据交易~自动防护启动~`);
                    case this.requestCount >= 70 && this.requestCount < 90:
                        this.$message({
                            message: `90s内请求${this.requestCount}次与B站的数据交易~`,
                            type: 'warning'
                        });
                    case this.requestCount >= 50 && this.requestCount <= 70:
                        this.$message(`90s内请求${this.requestCount}次与B站的数据交易~`);
                    default:
                        this.$message({
                            message: `90s内${this.requestCount}次与B站的数据交易~`,
                            type: 'success'
                        });
                }
            },
            showMenu() {}
        },
        destroyed() {
            //消除定时器
            clearInterval(this.limitTimer)
        }
    }
</script>

<template>
  <div class="user-bubble">
    <div @mouseenter="homeEnter"
         @mouseleave="homeOut"
         :title="home.title">
      <icon name="home-2"
            :scale="home.scale"
            style="color: #51b7fe;">
      </icon>
    </div>
    <div @mouseenter="biliEnter"
         @mouseleave="biliOut"
         @click="toBiliBili"
         :title="bili.title">
      <icon name="bilibili-fill"
            :scale="bili.scale"
            style="color: #51b7fe;">
      </icon>
    </div>
    <div @mouseenter="settingEnter"
         @mouseleave="settingOut"
         @click="toSetting"
         :title="setting.title">
      <icon name="setting-2"
            :scale="setting.scale"
            style="color: #51b7fe;">
      </icon>
    </div>
    <div @mouseenter="userinfoEnter"
         @mouseleave="userinfoOut"
         @click="toUserInfo"
         :title="userinfo.title">
      <icon name="user-info-icon"
            :scale="userinfo.scale"
            style="color: #51b7fe;">
      </icon>
    </div>
    <div @mouseenter="messageEnter"
         @mouseleave="messageOut"
         @click="toMessage"
         :title="message.title">
      <icon name="message"
            :scale="message.scale"
            style="color: #51b7fe;">
      </icon>
    </div>
    <div @mouseenter="exitEnter"
         @mouseleave="exitOut"
         @click="exitHandler"
         :title="exit.title">
      <icon name="md-exit"
            :scale="exit.scale"
            style="color: #51b7fe;">
      </icon>
    </div>
  </div>
</template>

<script>
    import {logout} from "./../../service/getData"

    export default {
        name: "UserInfo",
        components: {},
        data() {
            return {
                setting: {
                    scale: 3,
                    title: "设置"
                },
                message: {
                    scale: 3,
                    title: "消息"
                },
                userinfo: {
                    scale: 2.7,
                    title: "用户"
                },
                bili: {
                    scale: 3,
                    title: "B站"
                },
                home: {
                    scale: 3,
                    title: "主页"
                },
                exit: {
                    scale: 3,
                    title: "退出"
                }
            }
        },
        mounted(){

        },
        methods: {
            settingEnter() {
                this.setting.scale = 4
            },
            settingOut() {
                this.setting.scale = 3
            },
            userinfoEnter() {
                this.userinfo.scale = 3.7
            },
            userinfoOut() {
                this.userinfo.scale = 2.7
            },
            messageEnter() {
                this.message.scale = 4
            },
            messageOut() {
                this.message.scale = 3
            },
            exitEnter() {
                this.exit.scale = 4
            },
            exitOut() {
                this.exit.scale = 3
            },
            biliEnter() {
                this.bili.scale = 4
            },
            biliOut() {
                this.bili.scale = 3
            },
            homeEnter() {
                this.home.scale = 4
            },
            homeOut() {
                this.home.scale = 3
            },
            showUserBox() {
                console.log('show user box..')
            },
            toBiliBili() {
                window.open('https://www.bilibili.com')
            },
            toSetting() {
                this.$message({type: 'info', message: 'No Config'});
            },
            toUserInfo() {
                this.$message({type: 'info', message: 'No Config'});
            },
            toMessage() {
                this.$message({type: 'info', message: 'No Config'});
            },
            exitHandler() {
                logout().then(res=>{
                    localStorage.removeItem("BiliToken")
                    this.$router.push("/login")
                }).catch(e=>{})
            }
        }
    }
</script>
<style scoped="scoped">
  .user-bubble {
    position: fixed;
    width: 4em;
    height: 4em;
    right: 0;
    top: 35%;
  }

  .user-bubble svg {
    margin-top: 10%;
  }
</style>

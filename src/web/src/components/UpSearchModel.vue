<template>
  <el-container>
    <el-header>
      <el-row class="search-item shadow">
        <el-col :span="10" :offset="1">
          <el-input
            placeholder="UP主ID"
            v-model="upId"
            maxlength="15"
            clearable>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search" circle @click="findUp" :disabled="upId === ''"></el-button>
        </el-col>
      </el-row>
    </el-header>

    <el-main>
      <el-row>
        <!-- 历史查询 -->
        <el-col :span="24">
          <el-card shadow="always">
            <el-tag class="tag-normal" v-for="(item,index) in histories" :key="index" effect="plain"
                    @click="findQuick(item.bid)">
              <icon name="bilibili-fill" width="15" height="15"></icon>
              <span>{{item.name}}</span>
            </el-tag>
          </el-card>
        </el-col>

        <!-- 查询结果 -->
        <el-col :span="24" style="margin-top: 10px;" v-show="showDetailModel">
          <el-card shadow="always">
            <el-container>
              <el-aside :span="8">
                <el-avatar :size="80" :src="this.person.face"></el-avatar>
                <el-row style="margin-top: 15%">
                  <el-col :span="12">
                    <el-button type="primary" icon="el-icon-s-home" size="small" @click="jumpMainPage" round>主页</el-button>
                  </el-col>
                  <el-col :span="12">
                    <el-button type="danger" icon="el-icon-star-on" size="small" @click="attention" :disabled="isAttention" plain round>{{isAttention ? "已关注" : "加入关注"}}
                    </el-button>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 5%">
                  <el-col :span="12">
                    <el-button type="primary" icon="el-icon-s-help" size="small" @click="jumpDynamic" round>动态
                    </el-button>
                  </el-col>
                  <el-col :span="12">
                    <el-button type="success" icon="el-icon-video-camera-solid" size="small" @click="jumpVideo" round>投稿</el-button>
                  </el-col>
                </el-row>
              </el-aside>

              <el-main :span="16">

                <!--昵称-->
                <el-row class="search-item">
                  <el-col :span="4">
                    <el-tag>昵称</el-tag>
                  </el-col>
                  <el-col :span="20">
                    {{this.person.name}}
                  </el-col>
                </el-row>

                <!--等级-->
                <el-row class="search-item">
                  <el-col :span="4">
                    <el-tag>等级</el-tag>
                  </el-col>
                  <el-col :span="20">
                    <icon :name="'lv-' + this.person.level" width="32" height="32"></icon>
                  </el-col>
                </el-row>

                <!--性别-->
                <el-row class="search-item">
                  <el-col :span="4">
                    <el-tag>性别</el-tag>
                  </el-col>
                  <el-col :span="20" v-if="person.sex ==='男'">
                    <icon name="man" width="20" height="20"></icon>
                  </el-col>
                  <el-col :span="20" v-if="person.sex ==='女'">
                    <icon name="woman" width="20" height="20"></icon>
                  </el-col>
                  <el-col :span="20" v-if="person.sex ==='保密'">
                    <icon name="unknown" width="20" height="20"></icon>
                  </el-col>
                </el-row>

                <!--签名-->
                <el-row class="search-item">
                  <el-col :span="4">
                    <el-tag>签名</el-tag>
                  </el-col>
                  <el-col :span="20">
                    {{this.person.sign}}
                  </el-col>
                </el-row>
              </el-main>
            </el-container>
          </el-card>
        </el-col>
      </el-row>
    </el-main>

  </el-container>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "UpSearchModel",
    data() {
      return {
        upId: ''
      }
    },
    created() {
      this.$store.dispatch("SearchUp/actionUpHistoryList")
    },
    computed: {
      ...mapState('SearchUp', ["histories", "person", "showDetailModel","isAttention"])
    },
    methods: {
      findUp() {
        this.$store.dispatch('SearchUp/findUpRemoteById', this.upId)
      },
      findQuick(bid) {
        this.upId = bid;
        this.findUp();
      },
      jumpMainPage() {
        window.open("https://space.bilibili.com/" + this.person.bid, '_blank');
      },
      jumpDynamic(){
        window.open("https://space.bilibili.com/" + this.person.bid + '/dynamic', '_blank');
      },
      jumpVideo(){
        window.open("https://space.bilibili.com/" + this.person.bid + '/video', '_blank');
      },
      attention() {
        this.$confirm('是否将 #' + this.person.name + "# 加入到关注列表?", '关注', {
          confirmButtonText: '关注',
          cancelButtonText: '不不',
          type: 'info',
          showClose: false
        }).then(async () => {
          await this.$store.dispatch('SearchUp/addToUpAttention', this.person)
          this.$store.commit('SearchUp/setIsAttention', true)
          this.$message({
            type: 'success', message: '关注成功!'
          });
        }).catch(e => {
          if (e !== 'cancel') {
            this.$message({type: 'info', message: '关注失败'});
          }
        });
      }
    }
  }
</script>

<style scoped>
  .search-item {
    padding: 10px 10px;
  }

  .tag-normal {
    margin: 10px 0 0 10px;
    display: inline-flex;
    align-items: center;
  }

  .tag-normal:hover {
    background-color: #ecf5ff;
  }
  .search-item{
    display: flex;
    align-items: center;
  }
</style>

<template>
  <el-container>
    <el-header>
      <el-row class="search-item shadow">
        <el-col :span="10" :offset="1">
          <el-input
            placeholder="番剧ID"
            v-model="cId"
            maxlength="15"
            clearable>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search" circle @click="findCartoon" :disabled="cId === ''"></el-button>
        </el-col>
      </el-row>
    </el-header>

    <el-main>
      <el-row>
        <!-- 历史查询 -->
        <el-col :span="24">
          <el-card shadow="always">
            <el-tag class="tag-normal" v-for="(item,index) in histories" :key="index" effect="plain" @click="findQuick(item.bid)"><icon name="bilibili-fill" width="15" height="15"></icon>{{item.name}}</el-tag>
          </el-card>
        </el-col>

        <!-- 查询结果 -->
        <el-col :span="24" style="margin-top: 10px;" v-show="showDetailModel">
          <el-card shadow="always">
            <el-container>
              <el-aside :span="8">
                <el-image
                  :src="cartoon.cover"
                  :preview-src-list="[cartoon.cover]">
                </el-image>
                <el-row style="margin-top: 15%">
                  <el-col :span="12">
                    <el-button icon="el-icon-s-home" size="small" @click="jumpMainPage" plain round>跳转到主页</el-button>
                  </el-col>
                  <el-col :span="12">
                    <el-button type="danger" icon="el-icon-star-on" size="small" plain @click="attention" :disabled="this.isAttention" round>{{isAttention ? "已关注" : "加入关注"}}</el-button>
                  </el-col>
                </el-row>
              </el-aside>

              <el-main :span="16">
                <el-row>
                  <el-col :span="4" style="margin-top: 10px">
                    <el-tag>番名</el-tag>
                  </el-col>
                  <el-col :span="20">
                    {{cartoon.title}}
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="4" style="margin-top: 10px">
                    <el-tag>原番名</el-tag>
                  </el-col>
                  <el-col :span="20">
                    {{cartoon.origin_name}}
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="4" style="margin-top: 10px">
                    <el-tag>追番人数</el-tag>
                  </el-col>
                  <el-col :span="20">
                    {{cartoon.favorites}}
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="4" style="margin-top: 10px">
                    <el-tag>弹幕总数</el-tag>
                  </el-col>
                  <el-col :span="20">
                    {{cartoon.danmakus}}
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="4" style="margin-top: 10px">
                    <el-tag>总播放数</el-tag>
                  </el-col>
                  <el-col :span="20">
                    {{cartoon.views}}
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="4" style="margin-top: 10px">
                    <el-tag>评分</el-tag>
                  </el-col>
                  <el-col :span="20">
                    {{cartoon.rating ? cartoon.rating.score: ""}}
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="4" style="margin-top: 10px">
                    <el-tag>评分人数</el-tag>
                  </el-col>
                  <el-col :span="20">
                    {{cartoon.rating ?cartoon.rating.count : ""}}
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="4" style="margin-top: 10px">
                    <el-tag>开播时间</el-tag>
                  </el-col>
                  <el-col :span="20">
                    {{cartoon.release_date_show}}
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="4" style="margin-top: 10px">
                    <el-tag>状态</el-tag>
                  </el-col>
                  <el-col :span="20">
                    {{cartoon.time_length_show}}
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="4" style="margin-top: 10px">
                    <el-tag>类型</el-tag>
                  </el-col>
                  <el-col :span="20">
                    {{cartoon.type_name}}
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="4" style="margin-top: 20px">
                    <el-tag>简介</el-tag>
                  </el-col>
                  <el-col :span="20">
                    {{cartoon.evaluate}}
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="4" style="margin-top: 20px">
                    <el-tag>演员列表</el-tag>
                  </el-col>
                  <el-col :span="20">
                    {{cartoon.actors}}
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
  import {mapState} from "vuex"
  export default {
    data(){
      return {
        cId: ''
      }
    },
    created(){
      this.initData();
    },
    computed:{
      ...mapState('SearchCartoon', ["histories", "cartoon", 'showDetailModel', 'isAttention'])
    },
    methods: {
      initData(){
        this.$store.dispatch("SearchCartoon/actionCartoonHistoryList")
      },
      findCartoon(){
        this.$store.dispatch('SearchCartoon/findCartoonRemoteById', this.cId)
      },
      findQuick(cId){
        this.cId = cId;
        this.findCartoon();
      },
      jumpMainPage(){
        window.open("https://www.bilibili.com/bangumi/media/md" + this.cartoon.mid, '_blank');
      },
      attention(){
        this.$confirm('是否将 #' + this.$store.state.SearchCartoon.cartoon.title + "# 加入到关注列表?", '关注', {
          confirmButtonText: '关注',
          cancelButtonText: '不不',
          type: 'info',
          showClose: false
        }).then(async () => {
          await this.$store.dispatch('SearchCartoon/addToAttention', this.person)
          this.$store.commit('SearchCartoon/setIsAttention', true)
          this.$message({type: 'success', message: '关注成功!'
          });
        }).catch(e => {
          if(e !== 'cancel'){
            this.$message({type: 'info', message: '关注失败'});
          }
        });
      }
    }
  }
</script>

<style>
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
</style>

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

    <el-main>
      <el-row>
        <!-- 历史查询 -->
        <el-col :span="24">
          <el-card shadow="always">
            <el-tag style="margin: 10px 0 0 10px;" v-for="(item,index) in histories" :key="index"><icon name="bilibili-fill"></icon>{{item.name}}</el-tag>
          </el-card>
        </el-col>

        <!-- 查询结果 -->
        <el-col :span="24" style="margin-top: 10px;">
          <el-card shadow="always">
            <el-container>
              <el-aside :span="8">
                <el-image
                  :src="cartoon.cover"
                  :preview-src-list="[cartoon.cover]">
                </el-image>
                <el-row style="margin-top: 15%">
                  <el-col :span="12">
                    <el-button icon="el-icon-s-home" size="small" plain round>跳转到主页</el-button>
                  </el-col>
                  <el-col :span="12">
                    <el-button type="danger" icon="el-icon-star-on" size="small" plain round>加入关注</el-button>
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
                    {{cartoon.stat.favorites}}
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="4" style="margin-top: 10px">
                    <el-tag>弹幕总数</el-tag>
                  </el-col>
                  <el-col :span="20">
                    {{cartoon.stat.danmakus}}
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="4" style="margin-top: 10px">
                    <el-tag>总播放数</el-tag>
                  </el-col>
                  <el-col :span="20">
                    {{cartoon.stat.views}}
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="4" style="margin-top: 10px">
                    <el-tag>评分</el-tag>
                  </el-col>
                  <el-col :span="20">
                    {{cartoon.rating.score}}
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="4" style="margin-top: 10px">
                    <el-tag>评分人数</el-tag>
                  </el-col>
                  <el-col :span="20">
                    {{cartoon.rating.count}}
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="4" style="margin-top: 10px">
                    <el-tag>开播时间</el-tag>
                  </el-col>
                  <el-col :span="20">
                    {{cartoon.publish.release_date_show}}
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="4" style="margin-top: 10px">
                    <el-tag>状态</el-tag>
                  </el-col>
                  <el-col :span="20">
                    {{cartoon.publish.time_length_show}}
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
      this.$store.dispatch("SearchCartoon/actionCartoonHistoryList")
    },
    computed:{
      ...mapState('SearchCartoon', {
        histories : state => state.histories,
        cartoon: state=> state.cartoon
      })
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

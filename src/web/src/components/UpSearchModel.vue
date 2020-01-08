<template>
  <el-container>
    <el-header>
      <el-row class="search-item shadow">
        <el-col :span="10" :offset="1">
          <el-input
            placeholder="UP主ID"
            v-model="upId"
            clearable>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button icon="el-icon-search" circle></el-button>
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
                <el-avatar :size="80" :src="person.face"></el-avatar>
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

                <!--昵称-->
                <el-row>
                  <el-col :span="4">
                    <el-tag>昵称</el-tag>
                  </el-col>
                  <el-col :span="20">
                    {{person.name}}
                  </el-col>
                </el-row>

                <!--等级-->
                <el-row>
                  <el-col :span="4" style="margin-top: 20px">
                    <el-tag>等级</el-tag>
                  </el-col>
                  <el-col :span="20">
                    <icon :name="'lv-' + person.level" width="32" height="32"></icon>
                  </el-col>
                </el-row>

                <!--签名-->
                <el-row>
                  <el-col :span="4" style="margin-top: 20px">
                  <el-tag>签名</el-tag>
                </el-col>
                  <el-col :span="20">
                    {{person.sign}}
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
    data(){
      return {
        upId: ''
      }
    },
    created(){
      this.$store.dispatch("SearchUp/actionUpHistoryList")
    },
    computed: {
      ...mapState('SearchUp', {
        histories : state => state.histories,
        person: state=> state.person
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

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
              </el-aside>
              <el-main :span="16">
                <el-row>
                  <el-col :span="16">
                    <el-tag>昵称</el-tag> {{person.name}}
                    <icon :name="'lv-' + person.level" width="32" height="32"></icon>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="16">
                    <el-tag>签名</el-tag> {{person.sign}}
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
  import ElForm from "../../node_modules/element-ui/packages/form/src/form.vue";
  export default {
    components: {ElForm},
    data(){
      return {
        upId: '',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
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

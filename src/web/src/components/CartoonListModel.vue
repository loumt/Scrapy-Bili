<template>
  <el-container>
    <el-header>
      <el-row class="search-item shadow">
        <el-col :span="4" :offset="1">
          <el-input
            size="small"
            placeholder="番ID"
            v-model="cId"
            clearable>
          </el-input>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-input
            size="small"
            placeholder="番名"
            v-model="cName"
            clearable>
          </el-input>
        </el-col>
        <el-col :span="5" :offset="1">
          <el-select v-model="scoreLevel" size="small" placeholder="评分级别(默认全部)">
            <el-option
              v-for="item in scoreOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5" :offset="1">
          <el-select v-model="fanMountLevel" size="small" placeholder="追番人数级别(默认全部)">
            <el-option
              v-for="item in fanOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-table :data="this.$store.state.AttentionCartoon.rows" class="shadow" max-height="100%" :stripe=true :border=true>
        <el-table-column prop="mid" label="ID" width="100"></el-table-column>
        <el-table-column prop="name" label="番名"></el-table-column>
        <el-table-column prop="originName" label="原番名" width="160"></el-table-column>
        <el-table-column prop="ratingCode" label="评分" width="70"></el-table-column>
        <el-table-column prop="ratingCount" label="评分人数" width="120"></el-table-column>
        <el-table-column prop="fans" label="追番人数" width="100"></el-table-column>
        <el-table-column prop="ctime" label="关注时间" :formatter="dateFormat"></el-table-column>
        <el-table-column prop="utime" label="数据更新时间" :formatter="dateFormat"></el-table-column>
        <el-table-column align="center" label="操作" width="200" fixed="right">
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-star-off" size="mini" circle @click="cancelAttention(scope.row)"></el-button>
            <el-button-group>
              <el-button type="primary" icon="el-icon-message-solid" size="mini" round></el-button>
              <el-button type="primary" icon="el-icon-video-camera-solid" size="mini" round></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <el-row style="margin-top: 10px;">
        <el-pagination background layout="prev, pager, next" :total="total" :page-size="limit" :pager-count="5" :current-page="page" @current-change="toPage">
        </el-pagination>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
  import {mapState} from 'vuex'

  export default {
    name: "CARTOON",
    data() {
      return {
        scoreOptions: [
          {
            value: 0,
            label: '评分级别(默认全部)'
          }, {
            value: 1,
            label: '7.0以下'
          }, {
            value: 2,
            label: '7.0~8.0'
          }, {
            value: 3,
            label: '8.0~9.0'
          }, {
            value: 4,
            label: '9.0~9.5'
          }, {
            value: 5,
            label: '9.5以上'
          }],
        fanOptions: [
          {
            value: 0,
            label: '追番人数级别(默认全部)'
          }, {
            value: 1,
            label: '十万以上'
          }, {
            value: 2,
            label: '五十万以上'
          }, {
            value: 3,
            label: '一百万以上'
          }, {
            value: 4,
            label: '五百万以上'
          }, {
            value: 5,
            label: '一千万以上'
          }],
        cId: '',
        cName: '',
        fanMountLevel: '',
        scoreLevel: ''
      }
    },
    created() {
      this.initData()
    },
    computed: {
      ...mapState('AttentionCartoon',{
        total: state => state.total,
        page: state => state.page,
        limit: state => state.limit
      })
    },
    methods: {
      initData(){
        this.$store.dispatch('AttentionCartoon/getAttentionCartoonList', {cId: this.cId, cName: this.cName, scoreLevel: this.scoreLevel, fanMountLevel: this.fanMountLevel})
      },
      goFans() {
        console.log(this.rows)
      },
      goScore(){
        console.log(this.rows)
      },
      cancelAttention(car){
        this.$confirm('是否取消关注 #' + car.name + "# ?", '取关', {
          confirmButtonText: '确定',
          cancelButtonText: '不,点错了',
          type: 'info',
          showClose: false
        }).then(async () => {
          await this.$store.dispatch("AttentionCartoon/cancelAttention", car.id)
          this.initData();
          this.$message({type: 'success', message: '取关成功!'});
        }).catch(e => {
          if(e !== 'cancel'){
            this.$message({type: 'info', message: '取关失败'});
          }
        });
      },
      toPage(currentPage){
        this.$store.commit('setPage', currentPage)
        this.$store.dispatch('getAttentionCartoonList')
      }
    },
    watch: {
      "cId": function(){ this.initData();},
      "cName": function(){ this.initData();},
      "scoreLevel":function(){
        this.initData();
        },
      "fanMountLevel":function(){this.initData();}
    }
  }
</script>


<style>
  .search-item {
    padding: 10px 10px;
  }
</style>

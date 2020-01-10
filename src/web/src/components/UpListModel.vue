<template>
  <el-container>
    <el-header>
      <el-row class="search-item shadow">
        <el-col :span="4" :offset="1">
          <el-input
            size="small"
            placeholder="UP主ID"
            v-model="upId"
            clearable>
          </el-input>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-input
            size="small"
            placeholder="UP主昵称"
            v-model="upName"
            clearable>
          </el-input>
        </el-col>
        <el-col :span="5" :offset="1">
          <el-select v-model="fanMountLevel" size="small" placeholder="粉丝数级别(默认全部)" @change="goFans">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-table :data="this.$store.state.AttentionUp.rows" class="shadow" max-height="100%" :stripe=true :border=true>
        <el-table-column prop="bid" label="ID" width="140"></el-table-column>
        <el-table-column label="头像">
          <template slot-scope="scope">
            <el-avatar :size="40" :src="scope.row.face"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column label="昵称" width="160">
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.name || "..."}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="level" label="等级">
          <template slot-scope="scope">
            <icon v-if="scope.row.level" :name="getLevelName(scope.row.level)" width="32" height="32"></icon>
          </template>
        </el-table-column>
        <el-table-column prop="sign" label="签名" width="300" :show-overflow-tooltip=true></el-table-column>
        <el-table-column prop="fans" label="粉丝数"></el-table-column>
        <el-table-column prop="attention" label="关注数"></el-table-column>
        <el-table-column prop="contribute" label="投稿数"></el-table-column>
        <el-table-column prop="play" label="播放数" width="100"></el-table-column>
        <el-table-column align="center" label="操作" width="200" fixed="right">
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-star-off" size="mini" @click="cancelAttention(scope.row)" circle></el-button>
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
    name: "UPER",
    data() {
      return {
        options: [
          {
            value: 0,
            label: '粉丝数级别(默认全部)'
          }, {
            value: 1,
            label: '一万以下'
          }, {
            value: 2,
            label: '五万以下'
          }, {
            value: 3,
            label: '十万以下'
          }, {
            value: 4,
            label: '五十万以下'
          }, {
            value: 5,
            label: '五十万至一百万'
          }, {
            value: 6,
            label: '一百万以上'
          }, {
            value: 7,
            label: '一千万以上'
          }],
        upId: '',
        upName: '',
        fanMountLevel: ''
      }
    },
    created() {
     this.initData();
    },
    computed: {
      ...mapState('AttentionUp',{
        total: state => state.total,
        page: state => state.page,
        limit: state => state.limit
      })
    },
    methods: {
      initData(){
        this.$store.dispatch('AttentionUp/getAttentionUpList')
      },
      cancelAttention(up){
        this.$confirm('是否取消关注 #' + up.name + "# ?", '取关', {
          confirmButtonText: '确定',
          iconClass: 'el-icon-delete-solid',
          cancelButtonText: '不,点错了',
          type: 'info',
          showClose: false
        }).then(async () => {
          await this.$store.dispatch("AttentionUp/cancelAttention", up.id)
          this.initData();
          this.$message({type: 'success', message: '取关成功!'});
        }).catch(e => {
          if(e !== 'cancel'){
            this.$message({type: 'info', message: '关注失败'});
          }
        });
      },
      goFans() {
        console.log(this.rows)
      },
      getLevelName(level){
        return level? 'lv-' + level: ""
      },
      toPage(currentPage){
        this.$store.commit('AttentionUp/setPage', currentPage)
        this.initData();
      }
    }
  }
</script>


<style>
  .search-item {
    padding: 10px 10px;
  }
</style>

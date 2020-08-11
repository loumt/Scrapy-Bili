<template>
  <el-container>
    <el-header>
      <el-row class="search-item shadow">
        <el-col :span="6" :offset="1">
          <el-input
            size="medium"
            placeholder="用户名"
            v-model="username"
            clearable>
          </el-input>
        </el-col>

        <el-col :span="8" :offset="2">
          <el-button type="primary" size="medium" icon="el-icon-plus" title="新增" round
                     @click="addUser" plain></el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-table :data="userList" class="shadow" max-height="100%" :stripe=true :border=true>

        <el-table-column label="用户名">
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.username}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="primary" icon="el-icon-delete" size="mini" title="删除" round
                         @click="removeUser(scope.row)"></el-button>
            </el-button-group>
          </template>
        </el-table-column>

      </el-table>
      <el-row style="margin-top: 10px;text-align: center;">
        <el-pagination background layout="prev, pager, next" :total="total" :page-size="limit" :pager-count="5"
                       :current-page="page" @current-change="toPage">
        </el-pagination>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                username: ''
            }
        },
        mounted() {
            this.initData();
        },
        computed: {
            ...mapState('User', {
                userList: state => state.rows,
                total: state => state.total,
                page: state => state.page,
                limit: state => state.limit
            })
        },
        methods: {
            initData() {
                this.$store.dispatch('User/getUsers')
            },
            toPage(currentPage) {
                this.$store.commit('User/setPage', currentPage)
                this.initData();
            },
            removeUser(row) {
                this.$store.dispatch('User/deleteUser', row.id)
                this.$message({type: 'info', message: '成功删除'});
                this.initData();
            },
            addUser(){

            }
        }
    }
</script>


<style scoped>
  .search-item {
    padding: 10px 10px;
  }

</style>

<template>
  <el-container>
    <el-header>
      <el-row class="search-item shadow">
        <el-col :span="8" :offset="1">
          <el-input
            size="medium"
            placeholder="代码"
            v-model="code"
            clearable>
          </el-input>
        </el-col>

        <el-col :span="8" :offset="2">
          <el-button type="primary" size="medium" icon="el-icon-plus" title="新增" round
                     @click="showAddPermissionModal" plain></el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-table :data="permissionList" class="shadow" max-height="100%" :stripe=true :border=true>

        <el-table-column label="代码">
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.code}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="类型">
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.type}}</el-tag>
          </template>
        </el-table-column>


        <el-table-column label="描述">
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.desc}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="启用">
          <template slot-scope="scope">
            <el-switch
              @change="disablePermission(scope.row.id, scope.row.disable)"
              v-model="scope.row.disable"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="0"
              :inactive-value="1">
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="primary" icon="el-icon-delete" size="mini" title="删除" round
                         @click="removePermission(scope.row)"></el-button>
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


    <el-dialog title="新增权限" :visible.sync="newPermission.show" :width="newPermission.width" :show-close="false">
      <el-form :model="newPermission">
        <el-form-item label="权限名" :label-width="newPermission.labelWidth">
          <el-input v-model="newPermission.name" autocomplete="off" placeholder="用户名"></el-input>
        </el-form-item>

        <el-form-item label="描述" :label-width="newPermission.labelWidth">
          <el-input v-model="newPermission.desc" autocomplete="off" placeholder="昵称"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newPermission.show = false">取 消</el-button>
        <el-button type="primary" @click="addPermission">确 定</el-button>
      </div>
    </el-dialog>

  </el-container>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                code: '',
                newPermission: {
                    show:false,
                    width:'30%',
                    labelWidth: "4rem",
                    code: "",
                    desc: ""
                }
            }
        },
        mounted() {
            this.initData();
        },
        computed: {
            ...mapState('Permission', {
                permissionList: state => state.rows,
                total: state => state.total,
                page: state => state.page,
                limit: state => state.limit
            })
        },
        methods: {
            initData() {
                this.$store.dispatch('Permission/getPermissions')
            },
            toPage(currentPage) {
                this.$store.commit('Permission/setPage', currentPage)
                this.initData();
            },
            removePermission(row) {
                this.biliConfirm('删除', '是否删除 #' + row.code + "# ?", async () => {
                    this.$store.dispatch('Permission/deletePermission', row.id)
                    this.$message({type: 'info', message: '成功删除'});
                    this.initData();
                }, "删除失败")
            },
            showAddPermissionModal(){
                this.newPermission.show= true
            },
            addPermission(){
                let permission =  {code : this.newPermission.code ,desc: this.newPermission.desc}
                this.$store.dispatch("Permission/createPermission",permission).then(res=> {
                    this.newPermission.show = false
                })
            },
            disablePermission(id, disable){
                this.$store.dispatch('Permission/upPermission', {id , disable})
            }
        }
    }
</script>


<style scoped>
  .search-item {
    padding: 10px 10px;
  }

</style>

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
                     @click="showAddUserModel" plain></el-button>
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

        <el-table-column label="昵称">
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.nickname}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <el-tag size="medium">{{ dateFormat (scope.row.ctime) }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="primary" icon="el-icon-s-tools" size="mini" title="分配角色" round
                         @click="showChooseRoleModal(scope.row)"></el-button>
            </el-button-group>

            <el-button type="primary" icon="el-icon-delete" size="mini" title="删除" round
                       @click="removeUser(scope.row)"></el-button>
          </template>
        </el-table-column>

      </el-table>
      <el-row style="margin-top: 10px;text-align: center;">
        <el-pagination background layout="prev, pager, next" :total="total" :page-size="limit" :pager-count="5"
                       :current-page="page" @current-change="toPage">
        </el-pagination>
      </el-row>
    </el-main>

    <el-dialog title="新增用户" :visible.sync="newUser.show" :width="newUser.width" :show-close="false">
      <el-form :model="newUser">
        <el-form-item label="用户名" :label-width="newUser.labelWidth">
          <el-input v-model="newUser.username" autocomplete="off" placeholder="用户名"></el-input>
        </el-form-item>

        <el-form-item label="昵称" :label-width="newUser.labelWidth">
          <el-input v-model="newUser.nickname" autocomplete="off" placeholder="昵称"></el-input>
        </el-form-item>

        <el-form-item label="密码" :label-width="newUser.labelWidth">
          <el-input v-model="newUser.password" autocomplete="off" placeholder="密码"></el-input>
        </el-form-item>

        <el-form-item label="密码确认" :label-width="newUser.labelWidth">
          <el-input v-model="newUser.checkPassword" autocomplete="off" placeholder="密码确认"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newUser.show = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>


    <el-dialog title="分配角色" :visible.sync="distributeModel.show" :width="distributeModel.width" :show-close="false">

      <el-transfer v-model="distributeModel.roleIns" :data="distributeModel.roleModels"
                   :titles="distributeModel.titles"></el-transfer>

      <div slot="footer" class="dialog-footer">
        <el-button @click="distributeModel.show = false">取 消</el-button>
        <el-button type="primary" @click="distributeRole">确 定</el-button>
      </div>
    </el-dialog>

  </el-container>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                username: '',
                newUser: {
                    show: false,
                    width: '30%',
                    labelWidth: "6rem",
                    username: "",
                    nickname: "",
                    password: '',
                    checkPassword: ''
                },
                distributeModel: {
                    userId :'',
                    show: false,
                    width: '33%',
                    roleIns: [],
                    titles: ["所有角色", '已选角色'],
                    roleModels: []
                }
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
                if (row.isAdmin === 1) return this.$message({type: 'error', message: '管理员用户不可删除'});

                this.biliConfirm('删除', '是否删除 #' + row.username + "# ?", async () => {
                    this.$store.dispatch('User/deleteUser', row.id)
                    this.$message({type: 'info', message: '成功删除'});
                    this.initData();
                }, "删除失败")
            },
            showAddUserModel() {
                this.newUser.show = true
            },
            addUser() {
                let user = {
                    username: this.newUser.username,
                    nickname: this.newUser.nickname,
                    password: this.newUser.password
                }
                this.$store.dispatch("User/createNewUser", user).then(res => {
                    this.newUser.show = false
                })
            },
            async showChooseRoleModal(row) {
                this.distributeModel.roleModels = [];
                this.distributeModel.roleIns = [];
                this.distributeModel.userId = row.id;

                //列出所有角色以及该用户已绑定的角色findUserRoles
                let userRoles = await this.$store.dispatch("User/findUserRoles", row.id)
                let roles = await this.$store.dispatch("User/findRoles")

                userRoles.data.rows.forEach(role => {
                    this.distributeModel.roleIns.push(role.id)
                })

                roles.data.rows.forEach(role => {
                    this.distributeModel.roleModels.push({
                        key: role.id,
                        label: role.name,
                        disabled: false
                    })
                })
                this.distributeModel.show = true
            },
            distributeRole() {
                this.$store.dispatch("User/distributeRoles",{userId: this.distributeModel.userId, roleIds: this.distributeModel.roleIns}).then(res=>{
                    this.distributeModel.show = false
                })
            }
        }
    }
</script>


<style scoped>
  .search-item {
    padding: 10px 10px;
  }

</style>

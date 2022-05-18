<template>
  <el-container>
    <el-header>
      <el-row class="search-item shadow">
        <el-col :span="8" :offset="1">
          <el-input
            size="medium"
            placeholder="角色名"
            v-model="name"
            clearable>
          </el-input>
        </el-col>

        <el-col :span="8" :offset="2">
          <el-button type="primary" size="medium" icon="el-icon-plus" title="新增" round
                     @click="showAddRoleModal" plain></el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-table :data="roleList" class="shadow" max-height="100%" :stripe=true :border=true>

        <el-table-column label="角色名">
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.name}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="描述" prop="remark"></el-table-column>

        <el-table-column align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="primary" icon="el-icon-s-tools" size="mini" title="分配权限" round
                         @click="showChoosePermissionModal(scope.row)"></el-button>
            </el-button-group>
            <el-button-group>
              <el-button type="primary" icon="el-icon-delete" size="mini" title="删除" round
                         @click="removeRole(scope.row)"></el-button>
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

    <el-dialog title="新增角色" :visible.sync="newRole.show" :width="newRole.width" :show-close="false">
      <el-form :model="newRole">
        <el-form-item label="角色名" :label-width="newRole.labelWidth">
          <el-input v-model="newRole.name" autocomplete="off" placeholder="用户名"></el-input>
        </el-form-item>

        <el-form-item label="描述" :label-width="newRole.labelWidth">
          <el-input v-model="newRole.desc" autocomplete="off" placeholder="昵称"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newRole.show = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="分配权限" :visible.sync="distributeModel.show" :width="distributeModel.width" :show-close="false">

      <el-transfer v-model="distributeModel.permissionIns" :data="distributeModel.permissionModels"
                   :titles="distributeModel.titles"></el-transfer>

      <div slot="footer" class="dialog-footer">
        <el-button @click="distributeModel.show = false">取 消</el-button>
        <el-button type="primary" @click="distributePermission">确 定</el-button>
      </div>
    </el-dialog>

  </el-container>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                name: '',
                newRole: {
                    show:false,
                    width:'30%',
                    labelWidth: "4rem",
                    name: "",
                    remark: ""
                },
                distributeModel: {
                    roleId :'',
                    show: false,
                    width: '33%',
                    permissionIns: [],
                    titles: ["所有权限", '已选权限'],
                    permissionModels: []
                }
            }
        },
        mounted() {
            this.initData();
        },
        computed: {
            ...mapState('Role', {
                roleList: state => state.rows,
                total: state => state.total,
                page: state => state.page,
                limit: state => state.limit
            })
        },
        methods: {
            initData() {
                this.$store.dispatch('Role/getRoles')
            },
            toPage(currentPage) {
                this.$store.commit('Role/setPage', currentPage)
                this.initData();
            },
            removeRole(row) {
                this.biliConfirm('删除', '是否删除 #' + row.name + "# ?", async () => {
                    this.$store.dispatch('Role/deleteRole', row.id)
                    this.$message({type: 'info', message: '成功删除'});
                    this.initData();
                }, "删除失败")
            },
            showAddRoleModal(){
                this.newRole.show = true
            },
            addRole(){
                let role = {name : this.newRole.name ,remark: this.newRole.remark}
                this.$store.dispatch("Role/createRole",role ).then(res=>{
                    this.newRole.show = false
                })
            },
            async showChoosePermissionModal(row){
                this.distributeModel.permissionModels = [];
                this.distributeModel.permissionIns = [];
                this.distributeModel.roleId = row.id;

                //列出所有角色以及该用户已绑定的角色findUserRoles
                let rolePermissions = await this.$store.dispatch("Role/findRolePermissions", row.id)
                let permissions = await this.$store.dispatch("Role/findPermissions")

                rolePermissions.data.rows.forEach(role => {
                    this.distributeModel.permissionIns.push(role.id)
                })

                permissions.data.rows.forEach(permission => {
                    this.distributeModel.permissionModels.push({
                        key: permission.id,
                        label: permission.code,
                        disabled: false
                    })
                })
                this.distributeModel.show=true;
            },
            distributePermission(){
                this.$store.dispatch("Role/distributePermissions",{roleId: this.distributeModel.roleId, permissionIds: this.distributeModel.permissionIns}).then(res=>{
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

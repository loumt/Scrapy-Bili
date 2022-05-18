<template>
  <el-container>
    <el-header>
      <el-row class="search-item shadow">
        <el-col :span="8" :offset="1">
          <el-input
            size="medium"
            placeholder="KEY"
            v-model="keyPart"
            clearable>
          </el-input>
        </el-col>

        <el-col :span="8" :offset="2">
          <el-button type="primary" size="medium" icon="el-icon-plus" title="新增" round
                     @click="showEmojiModel" plain></el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-table :data="emojiList" class="shadow" max-height="100%" :stripe=true :border=true>

        <el-table-column label="KEY">
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.key}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="表情">
          <template slot-scope="scope">
            <el-avatar :size="40" :src="'https://images.weserv.nl/?url=' + scope.row.url"></el-avatar>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="primary" icon="el-icon-delete" size="mini" title="删除" round
                         @click="removeEmoji(scope.row)"></el-button>
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

    <!-- 新增表情对话框 -->
    <el-dialog title="新增表情" :visible.sync="newEmoji.show" :width="newEmoji.width" :show-close="false">
      <el-form :model="newEmoji">
        <el-form-item label="KEY" :label-width="newEmoji.labelWidth">
          <el-input v-model="newEmoji.key" autocomplete="off" placeholder="[嫌弃]"></el-input>
        </el-form-item>
        <!--        <el-form-item label="活动区域" :label-width="formLabelWidth">-->
        <!--          <el-select v-model="form.region" placeholder="请选择活动区域">-->
        <!--            <el-option label="区域一" value="shanghai"></el-option>-->
        <!--            <el-option label="区域二" value="beijing"></el-option>-->
        <!--          </el-select>-->
        <!--        </el-form-item>-->
        <el-form-item label="地址" :label-width="newEmoji.labelWidth">
          <el-input v-model="newEmoji.url" autocomplete="off"
                    placeholder="https://i0.hdslb.com/bfs/emote/dessddweww4b.png@100w_100h.webp"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newEmoji.show = false">取 消</el-button>
        <el-button type="primary" @click="addEmoji">确 定</el-button>
      </div>
    </el-dialog>

  </el-container>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                keyPart: '',
                newEmoji: {
                    show: false,
                    width: '40%',
                    labelWidth: "4rem",
                    key: "",
                    url: ''
                }
            }
        },
        mounted() {
            this.initData();
        },
        computed: {
            ...mapState('Emoji', {
                emojiList: state => state.rows,
                total: state => state.total,
                page: state => state.page,
                limit: state => state.limit
            })
        },
        methods: {
            initData() {
                this.$store.dispatch('Emoji/getEmojiList')
            },
            toPage(currentPage) {
                this.$store.commit('Emoji/setPage', currentPage)
                this.initData();
            },
            removeEmoji(row) {
                this.biliConfirm('删除', '是否删除 #' + row.key + "# ?", async () => {
                    this.$store.dispatch('Emoji/removeEmoji', row.id)
                    this.$message({type: 'info', message: '成功删除'});
                    this.initData();
                }, "删除失败")
            },
            showEmojiModel() {
                this.newEmoji.show = true;
            },
            addEmoji() {
                this.$store.dispatch("Emoji/createNewEmoji", {key: this.newEmoji.key, url: this.newEmoji.url})
            }
        },
        watch: {
            "keyPart": function (newValue) {
                this.$store.dispatch("Emoji/findEmojiWithKeyPart", newValue)
            }
        }
    }
</script>


<style scoped>
  .search-item {
    padding: 10px 10px;
  }

</style>

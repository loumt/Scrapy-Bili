<template>
  <el-container>
    <el-header>
      <el-row class="search-item shadow">
        <el-col :span="8" :offset="1">
          <el-input
            size="medium"
            placeholder="KEY"
            v-model="key"
            clearable>
          </el-input>
        </el-col>

        <el-col :span="8" :offset="2">
          <el-button type="primary" size="medium" icon="el-icon-plus" title="新增" round
                     @click="addEmoji" plain></el-button>
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
  </el-container>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                key: ''
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
                this.$store.dispatch('Emoji/removeEmoji', row.id)
                this.$message({type: 'info', message: '成功删除'});
                this.initData();
            },
            addEmoji(){

            }
        }
    }
</script>


<style scoped>
  .search-item {
    padding: 10px 10px;
  }

 </style>

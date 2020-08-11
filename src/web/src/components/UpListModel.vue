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
          <el-select v-model="fanMountLevel" size="small" placeholder="粉丝数级别(默认全部)">
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
            <el-tag size="medium" @click="visitThisUper(scope.row)">{{ scope.row.name || "..."}}</el-tag>
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
            <el-button type="danger" icon="el-icon-star-off" size="mini" @click="cancelAttention(scope.row)"
                       title="取消关注" circle></el-button>
            <el-button type="success" icon="el-icon-paperclip" style="margin-left: 0px;" size="mini"
                       @click="visitThisUper(scope.row)"
                       title="访问主页" circle></el-button>
            <el-button-group>
              <el-button type="primary" icon="el-icon-s-help" size="mini" title="查看动态"
                         @click="showDynamic(scope.row)" round></el-button>
              <el-button type="primary" icon="el-icon-video-camera-solid" size="mini" title="查看投稿"
                         @click="showVideo(scope.row)" round></el-button>
            </el-button-group>
          </template>

        </el-table-column>
      </el-table>
      <el-row style="margin-top: 10px;text-align: center;">
        <el-pagination background layout="prev, pager, next" :total="total" :page-size="limit" :pager-count="5"
                       :current-page="page" @current-change="toPage">
        </el-pagination>
      </el-row>

      <!-- UP主动态列表 -->
      <data-table ref="dynamicTable" @load="loadNext" @close="refreshPageData">
        <el-timeline>
          <el-timeline-item
            v-for="(dynamic, index) in dynamicList"
            :timestamp="dateFormat(dynamic.ptime)"
            :key="index"
            size="large"
            type="success"
            color="#08c"
            placement="top">
            <el-card>
              <el-row :gutter="20">
                <p v-if="dynamic.type === 4" v-html="dynamic.content"></p>
                <p v-if="dynamic.type === 2" v-html="dynamic.description"></p>
                <p v-if="dynamic.type === 1" v-html="dynamic.content"></p>
                <p v-if="dynamic.type === 256" v-html="dynamic.content"></p>
                <p v-if="dynamic.type === 64" v-html="dynamic.dynamic"></p>
                <p v-if="dynamic.type === 8" v-html="dynamic.dynamic"></p>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="8">
                  <div class="dynamic-des">
                    <icon name="forwarding" width="20" height="20"></icon>
                    <span>{{dynamic.repost}}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="dynamic-des">
                    <icon name="comments" width="20" height="20"></icon>
                    <span>{{dynamic.reply}}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="dynamic-des">
                    <icon name="appreciates" width="20" height="20"></icon>
                    <span>{{dynamic.like}}</span>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-timeline-item>
        </el-timeline>
        <el-row :gutter="20" style="margin-bottom: 10px;" v-show="dataBox.loadMoreBtnShow">
          <el-col :span="6" :offset="10">
            <div class="grid-content bg-purple">
              <el-button type="primary" size="small" @click="loadNext" round>加载更多</el-button>
            </div>
          </el-col>
        </el-row>
      </data-table>


      <!-- UP主视频列表 -->
      <data-table ref="videoTable" @load="loadNext" @close="refreshPageData">
        <el-timeline>
          <el-timeline-item
            v-for="(video, index) in videoList"
            :timestamp="dateFormat(video.ptime)"
            :key="index"
            size="large"
            type="primary"
            color="#08c"
            placement="top">
            <el-card>
              <el-row>
                <el-col :span="8">
                  <el-image :src="'https://images.weserv.nl/?url=https:'+ video.pic" class="image video-img"/>
                </el-col>
                <el-col :span="14" :offset="2">
                  <div>
                    <a :href="'https://www.bilibili.com/video/av' + video.aid" class="dynamic-link"
                       target="_blank">{{video.title}}</a>
                  </div>
                  <div style="margin-top: 10px;">
                    <el-tag>{{video.length}}</el-tag>
                  </div>
                  <div style="margin-top: 10px;">
                    <el-tag @click="clipBoard('https://www.bilibili.com/video/av' + video.aid)">
                      <i class="el-icon-share"></i>复制视频链接
                    </el-tag>
                  </div>
                </el-col>
              </el-row>
              <el-row style="margin-top: 10px;">
                <el-col :span="6" class="dynamic-des" title="转发">
                  <icon name="forwarding" width="20" height="20"></icon>
                  <span>{{video.share}}</span>
                </el-col>
                <el-col :span="6" class="dynamic-des" title="评论">
                  <icon name="comments" width="20" height="20"></icon>
                  <span>{{video.comment}}</span>
                </el-col>
                <el-col :span="6" class="dynamic-des" title="点赞">
                  <icon name="appreciates" width="20" height="20"></icon>
                  <span>{{video.like}}</span>
                </el-col>
                <el-col :span="6" class="dynamic-des" title="收藏">
                  <icon name="collect" width="20" height="20"></icon>
                  <span>{{video.favorite}}</span>
                </el-col>
              </el-row>
              <el-row style="margin-top: 10px;">
                <el-col :span="6" class="dynamic-des" title="弹幕">
                  <icon name="barrage" width="20" height="20"></icon>
                  <span>{{video.danmaku}}</span>
                </el-col>
                <el-col :span="6" class="dynamic-des" title="B币">
                  <icon name="coin" width="20" height="20"></icon>
                  <span>{{video.coin}}</span>
                </el-col>
                <el-col :span="6" class="dynamic-des" title="播放">
                  <icon name="play" width="20" height="20"></icon>
                  <span>{{video.view}}</span>
                </el-col>
              </el-row>
            </el-card>
          </el-timeline-item>
        </el-timeline>
        <el-row :gutter="20" style="margin-bottom: 10px;" v-show="dataBox.loadMoreBtnShow">
          <el-col :span="6" :offset="10">
            <div class="grid-content bg-purple">
              <el-button type="primary" size="small" @click="loadNext" round>加载更多</el-button>
            </div>
          </el-col>
        </el-row>
      </data-table>
    </el-main>
  </el-container>
</template>
<script>
    import {mapState} from 'vuex'
    import DataTable from './DataTable'

    export default {
        name: "UPER",
        components: {
            DataTable
        },
        data() {
            return {
                upId: '',
                upName: '',
                fanMountLevel: '',
                dataBox:{
                    loadMoreBtnShow: true
                }
            }
        },
        created() {
            this.initData();
        },
        computed: {
            ...mapState('AttentionUp', {
                dynamicList: state => state.dynamicList,
                videoList: state => state.videoList,
                options: state => state.options,
                total: state => state.total,
                page: state => state.page,
                limit: state => state.limit
            })
        },
        methods: {
            initData() {
                this.$store.dispatch('AttentionUp/getAttentionUpList', {
                    upId: this.upId,
                    upName: this.upName,
                    fanMountLevel: this.fanMountLevel
                })
            },
            visitThisUper(up) {
                window.open("https://space.bilibili.com/" + up.bid, '_blank');
            },
            refreshPageData() {
                this.$store.commit('AttentionUp/initDataTableProps')
            },
            cancelAttention(up) {
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
                    if (e !== 'cancel') {
                        this.$message({type: 'info', message: '关注失败'});
                    }
                });
            },
            getLevelName(level) {
                return level ? 'lv-' + level : ""
            },
            toPage(currentPage) {
                this.$store.commit('AttentionUp/setPage', currentPage)
                this.initData();
            },
            showDynamic(up) {
                this.$store.dispatch('AttentionUp/refreshUpDynamic', up)
                this.$refs.dynamicTable.show({title: up.name + "の动态"});
            },
            showVideo(up) {
                this.$store.dispatch('AttentionUp/refreshUpVideo', up)
                this.$refs.videoTable.show({title: up.name + "の投稿"});
            },
            loadNext() {
                this.$store.dispatch('AttentionUp/loadNextDataList')
            },
            shareIt(url) {
                window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + url)
            },
            clipBoard(copyStr) {
                const oInput = document.createElement('input');
                oInput.value = copyStr;
                document.body.appendChild(oInput)
                oInput.select();
                const copyResult = document.execCommand('copy')
                document.body.removeChild(oInput)
                // 根据返回的复制结果 给用户不同的提示
                if (copyResult) {
                    this.$message({type: 'info', message: '已复制到剪贴板'});
                } else {
                    this.$message({type: 'error', message: '复制失败'});
                }
            }
        },
        watch: {
            "upId": function () {
                this.$store.commit('AttentionUp/initPageOptions');
                this.initData();
            },
            "upName": function () {
                this.$store.commit('AttentionUp/initPageOptions');
                this.initData();
            },
            "fanMountLevel": function () {
                this.$store.commit('AttentionUp/initPageOptions');
                this.initData();
            },
            "$store.state.AttentionUp.showLoadMore": function(newValue,oldValue){
                this.dataBox.loadMoreBtnShow = newValue
            }
        }
    }
</script>


<style>
  .search-item {
    padding: 10px 10px;
  }

  .dynamic-des {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .dynamic-des > span {
    margin-left: 10px;
  }

  .dynamic-link {
    text-decoration: none;
    color: #08c;
    text-shadow: #00aa00 0px 0px 3px;
  }

  .video-img {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
</style>

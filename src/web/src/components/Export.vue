<template>
  <el-container>
    <el-header>
      <el-divider content-position="left">UP主</el-divider>
    </el-header>
    <el-main>
      <el-row>
        <el-col :span="6" :offset="1">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <div style="padding: 24px;">
              <span>UP主(关注)</span>
              <div class="bottom">
                <el-button type="primary" icon="el-icon-download" size="mini" @click="exportAction(3)" round>导出
                </el-button>
              </div>
            </div>
          </el-card>
        </el-col>

        <el-col :span="6" :offset="2" v-show="false">
          <el-card :body-style="{ padding: '0px' }">
            <div style="padding: 24px;">
              <span>好吃的汉堡</span>
              <div class="bottom">
                <el-button type="primary" icon="el-icon-download" size="mini" round>导出</el-button>
              </div>
            </div>
          </el-card>
        </el-col>

        <el-col :span="6" :offset="2" v-show="false">
          <el-card :body-style="{ padding: '0px' }">
            <div style="padding: 24px;">
              <span>好吃的汉堡</span>
              <div class="bottom">
                <el-button type="primary" icon="el-icon-download" size="mini" round>导出</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-divider content-position="left">番剧</el-divider>

      <el-row>
        <el-col :span="6" :offset="1">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <div style="padding: 24px;">
              <span>番剧(关注)</span>
              <div class="bottom">
                <el-button type="primary" icon="el-icon-download" size="mini" @click="exportAction(1)" round>导出
                </el-button>
              </div>
            </div>
          </el-card>
        </el-col>

        <el-col :span="6" :offset="2" v-show="false">
          <el-card :body-style="{ padding: '0px' }">
            <div style="padding: 24px;">
              <span>好吃的汉堡</span>
              <div class="bottom">
                <el-button type="primary" icon="el-icon-download" size="mini" round>导出</el-button>
              </div>
            </div>
          </el-card>
        </el-col>

        <el-col :span="6" :offset="2" v-show="false">
          <el-card :body-style="{ padding: '0px' }">
            <div style="padding: 24px;">
              <span>好吃的汉堡</span>
              <div class="bottom">
                <el-button type="primary" icon="el-icon-download" size="mini" round>导出</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {
            exportAction(type) {
                window.open('/api/export?type=' + type);
            }
        }
    }
</script>

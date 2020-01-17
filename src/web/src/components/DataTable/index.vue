<template>
  <el-drawer
    :title="title"
    :visible="isShow"
    direction="ltr"
    :show-close="false"
    :before-close="hide">
    <slot/>
  </el-drawer>
</template>

<script>
  export default {
    data() {
      return {
        isShow: false,
        title: ''
      };
    },
    methods: {
      hide(done) {
        this.isShow = false;
      },
      show(props){
        this.title = props.title;
        this.isShow = true;
      }
    }
  };
</script>

<template>
  <el-drawer
    :title="title"
    :visible="isShow"
    direction="ltr"
    :show-close="false"
    :modal="true"
    @close="destroy"
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
            destroy(){
                this.$emit('close')
            },
            show(props) {
                this.title = props.title;
                this.isShow = true;
            }
        }
    };
</script>

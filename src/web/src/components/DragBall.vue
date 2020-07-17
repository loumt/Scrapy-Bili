<template>
  <div class="drag-ball point" ref="dragBall" v-drag="true">
    <div class="drag-content">
      <slot name="value">{{ value }}</slot>
    </div>
  </div>
</template>
<script>
    export default {
        name: 'drag-ball',
        props: {
            value: {
                type: String,
                default: '0'
            }
        },
        data() {
            return {
                canDrag: false,
                // 偏移
                inset: {
                    left: 0,
                    top: 0
                },
                // 移动
                move: {},
                // 位置
                position: {
                    left: 0,
                    top: 0
                },
                // 初始位置
                positionOld: {},
                startTime: null,
                endTime: null
            };
        },
        methods: {
            // 获取dom的绝对位置
            getPosition(source) {
                let left = source.offsetLeft; //获取元素相对于其父元素的left值var left
                let top = source.offsetTop;
                let current = source.offsetParent; // 取得元素的offsetParent // 一直循环直到根元素
                while (current != null) {
                    left += current.offsetLeft;
                    top += current.offsetTop;
                    current = current.offsetParent;
                }
                return {
                    left: left,
                    top: top
                };
            }
        },
        computed: {
            dragBall() {
                return this.$refs.dragBall;
            }
        }
    };
</script>
<style scoped>
  .drag-ball {
    position: absolute;
    z-index: 10003;
    right: 1%;
    top: 70%;
    width: 4em;
    height: 4em;
    background: #71fffd;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0px 0px 10px 2px skyblue;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    font-weight: bold;
  }

  .drag-ball:hover {
    box-shadow: 0 0 0 4px #b9fff0;
  }

  .drag-ball .drag-content {
    overflow-wrap: break-word;
    font-size: 45px;
    font-family: "Helvetica Neue";
    color: #fff;
    width: 100%;
    height: 100%;
    text-align: center;
    letter-spacing: 2px;
  }
</style>

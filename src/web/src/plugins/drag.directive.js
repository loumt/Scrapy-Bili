/**
 * 鼠标按住拖动-指令
 */
const limitClosingSize = 30


export default function (Vue) {
  Vue.directive("drag", (el, {modifiers, value}) => {
    el.style.position = "absolute";
    let {x, y} = modifiers;
    el.addEventListener("mousedown", donw);
    var disX, disY;

    function donw(e) {
      disX = e.offsetX;
      disY = e.offsetY;
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up)
    }

    function move(e) {
      var l = e.clientX - disX;
      var t = e.clientY - disY;

      // console.log("e.clientX :" + e.clientX)
      // console.log("e.clientY :" + e.clientY)
      // console.log("l " + l)
      // console.log("t " + t)


      //自动贴边
      let innerHeight = window.innerHeight;
      let innerWidth = window.innerWidth;
      let {clientHeight, clientWidth} = el
      // console.log("clientHeight：" + clientHeight)
      // console.log("clientWidth：" + clientWidth)
      if (t < limitClosingSize) {
        t = 0
      }
      if (l < limitClosingSize) {
        l = 0
      }


      if (t > innerHeight - limitClosingSize - clientHeight || innerHeight - t < limitClosingSize) {
        t = innerHeight - clientHeight
      }
      if (l > innerWidth - limitClosingSize - clientHeight || innerWidth - l < limitClosingSize) {
        l = innerWidth - clientWidth
      }

      if (value) {
        if (x) {
          el.style.left = l + 'px';
        }
        if (y) {
          el.style.top = t - clientWidth + 10 + 'px';
        }
        if (x && y || (!x && !y)) {
          el.style.left = l + 'px';
          el.style.top = t - clientWidth + 10 + 'px';
        }
      }
    }

    function up(e) {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    }
  })
}

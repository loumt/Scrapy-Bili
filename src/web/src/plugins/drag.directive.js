/**
 * 鼠标按住拖动-指令
 */
export default function (Vue) {
  Vue.directive("drag", (el, {modifiers, value}) => {
    el.style.position = "absolute";
    let limitSize = 30;
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


      //自动贴边
      let innerHeight = window.innerHeight;
      let innerWidth = window.innerWidth;
      let {clientHeight, clientWidth} = el
      if (t < limitSize) {
        t = 0
      }
      if (l < limitSize) {
        l = 0
      }
      if (t > innerHeight - limitSize - clientHeight || innerHeight - t < limitSize) {
        t = innerHeight - clientHeight
      }
      if (l > innerWidth - limitSize - clientHeight || innerWidth - l < limitSize) {
        l = innerWidth - clientWidth
      }

      if (value) {
        if (x) {
          el.style.left = l + 'px';
        }
        if (y) {
          el.style.top = t + 'px';
        }
        if (x && y || (!x && !y)) {
          el.style.left = l + 'px';
          el.style.top = t + 'px';
        }
      }
    }

    function up(e) {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    }
  })
}

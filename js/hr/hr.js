var prizeList = [
  { id: 1, text: '煎饼果子' },
  { id: 2, text: '铁锅炖大鹅' },
  { id: 3, text: '臭豆腐' },
  { id: 4, text: '豆腐脑' },
  { id: 5, text: '烤馕' },
  { id: 6, text: '牛排' },
  { id: 7, text: '大盘鸡' },
  { id: 8, text: '披萨' },
  { id: 9, text: '烤全羊' },
  { id: 10, text: '肉夹馍' },
  { id: 11, text: '红糖冰粉' },
  { id: 12, text: '各种榴莲制品' },
  { id: 13, text: '烤冷面' },
  { id: 14, text: '烤包子' },
  { id: 15, text: '铁板鱿鱼' },
  { id: 16, text: '九宫格麻辣火锅' },
  { id: 17, text: '酸菜鱼' },
  { id: 18, text: '芒果糯米饭' },
  { id: 19, text: '菠萝咕咾肉' },
  { id: 20, text: '糍粑' },
];
creatDrawBox();
function creatDrawBox() {
  var drawStr = '';
  for (var i = 0; i < prizeList.length; i++) {
    drawStr +=
      '<div class="item-box item-box0' +
      i +
      '">' +
      '<div class="prize-item" ><p class="draw-txt">' +
      prizeList[i].text +
      '</p></div></div>';
  }
  $('#prizeBox').html(drawStr);
}

var roting = false;
var loading = false;
var deg = 0;
// 获取到奖品后转盘旋转动画时间
var round_time = 5000;
// 开始抽奖
function clickDrawBtn() {
  if (roting || loading) return;
  loading = true;
  // 前端生成随机数奖品
  setTimeout(() => {
    var randomNo = Math.floor(Math.random() * prizeList.length);
    var activePrize = prizeList[randomNo];
    // 使用 some 循环，获取到奖品即停止遍历
    prizeList.some((item, index) => {
      if (item.id === activePrize.id) {
        // 获取该奖品的一个随机角度，具体见下方函数注释
        var newDeg = this.getRote(index, prizeList.length);
        // roting 为 true 时，转盘有旋转动画，时间为 round_time
        roting = true;
        deg = newDeg;
        $('.round').removeClass('not_roting');
        $('.round').css({
          transition: round_time + 'ms',
          transform: 'rotate(' + deg + 'deg)',
        });
        setTimeout(() => {
          // 经过 config.round_time 的时间后，转盘进行复位，方便下一次抽取，deg 不取 0 而是 NewDeg % 360 以确保用户看不到转盘闪动
          roting = false;
          deg = newDeg % 360;
          $('.round').addClass('not_roting');
          $('.round').css({
            transition: round_time + 'ms',
            transform: 'rotate(' + deg + 'deg)',
          });
          // alert('今天吃' + activePrize.text);
          $('.draw-pop').addClass('active');
          $('#dpTxt').text(activePrize.text);
          $('.mask').show();
        }, round_time);
        return true;
      }
    });
    loading = false;
  }, 100);
}
/**
 * 根据奖品获取转盘角度
 * @param {number} index 获得奖品在 prizeList 中的 index
 * @param {number} count 奖品数量
 * @return {number}
 */
function getRote(index, count) {
  if (!count) {
    count = 8;
  }
  const MAX_ROUND = 10;
  const MIN_ROUND = 8;
  const OFFSET_MULTIPLE = 0;
  const unit = 360 / count;
  const offset = Math.floor(Math.random() * -unit) + unit / 2;
  const roundNo = Math.floor(
    Math.random() * (MAX_ROUND - MIN_ROUND + 1) + MIN_ROUND
  );
  const newDeg = 360 * roundNo - unit * index;
  return newDeg + OFFSET_MULTIPLE * offset;
}

function hidePop() {
  $('.draw-pop').removeClass('active');
  $('.mask').hide();
}

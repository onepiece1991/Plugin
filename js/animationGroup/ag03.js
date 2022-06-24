var ratateDraw = new Vue({
  el: '#animWidget03',
  data() {
    return {
      roting: false,
      loading: false,
      deg: 0,
      config: {
        wheel: '../images/animationGroup/ag03/wheel.png', // 转盘图片
        icon: '../images/animationGroup/ag03/icon.png', // 中心 LOGO
        arrow: '../images/animationGroup/ag03/arrow.png', // 顶部剪头
        round_time: 5000, // 获取到奖品后转盘旋转动画时间
        text_color: '#666', // 文字颜色
        // 奖品列表
        prizeList: [
          {
            id: 1,
            text: '一等獎',
            img: '../images/animationGroup/ag03/prize1.png',
          },
          {
            id: 2,
            text: '谢谢参与',
            img: '../images/animationGroup/ag03/prize2.png',
          },
          {
            id: 3,
            text: '二等獎',
            img: '../images/animationGroup/ag03/prize1.png',
          },
          {
            id: 4,
            text: '谢谢参与',
            img: '../images/animationGroup/ag03/prize2.png',
          },
          {
            id: 5,
            text: '三等獎',
            img: '../images/animationGroup/ag03/prize1.png',
          },
          {
            id: 6,
            text: '谢谢参与',
            img: '../images/animationGroup/ag03/prize2.png',
          },
          {
            id: 7,
            text: '特等獎',
            img: '../images/animationGroup/ag03/prize1.png',
          },
          {
            id: 8,
            text: '谢谢参与',
            img: '../images/animationGroup/ag03/prize2.png',
          },
        ],
      },
    };
  },
  methods: {
    // 开始抽奖
    clickBtn() {
      if (this.roting || this.loading) return;
      this.loading = true;
      // 前端生成随机数奖品
      setTimeout(() => {
        let config = this.config;
        let activePrize = config.prizeList[Math.floor(Math.random() * 7)];
        // 使用 some 循环，获取到奖品即停止遍历
        config.prizeList.some((item, index) => {
          if (item.id === activePrize.id) {
            // 获取该奖品的一个随机角度，具体见下方函数注释
            let newDeg = this.getRote(index, config.prizeList.length);
            // roting 为 true 时，转盘有旋转动画，时间为 config.round_time
            this.roting = true;
            this.deg = newDeg;
            setTimeout(() => {
              // 经过 config.round_time 的时间后，转盘进行复位，方便下一次抽取，deg 不取 0 而是 NewDeg % 360 以确保用户看不到转盘闪动
              this.roting = false;
              this.deg = newDeg % 360;
            }, config.round_time);
            return true;
          }
        });
        this.loading = false;
      }, 100);
    },
    /**
     * 根据奖品获取转盘角度
     * @param {number} index 获得奖品在 prizeList 中的 index
     * @param {number} count 奖品数量
     * @return {number}
     */
    getRote(index, count) {
      if (!count) count = 8; // 若不传奖品数量，则默认为8
      const MAX_ROUND = 10; // 最大转圈数
      const MIN_ROUND = 8; // 最小转圈数
      const OFFSET_MULTIPLE = 0; // 偏移量倍数，范围 [0, 1)，例如4个奖品时，偏移量是[-45, 45)，若倍数为 1，则可能出现贴边的情况
      const unit = 360 / count; // 单元角度，为360 ÷ 奖品总数
      const offset = Math.floor(Math.random() * -unit) + unit / 2;
      const roundNo = Math.floor(
        Math.random() * (MAX_ROUND - MIN_ROUND + 1) + MIN_ROUND
      );
      const newDeg = 360 * roundNo - unit * index;
      console.log(roundNo);
      return newDeg + OFFSET_MULTIPLE * offset;
    },
  },
});

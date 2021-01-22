/**
 * @Author: Jinxx
 * @Time: 2020/5/25
 * @Description: calendar javascript
 */

// 标记当前一年(2020年)的所有法定节假日及调休日
var signObjAll = {
  weekdays: ["2020-1-19", "2020-2-1", "2020-4-26", "2020-5-9", "2020-6-28", "2020-9-27", "2020-10-10"],
  weekends: ["2020-1-1", "2020-1-24", "2020-1-25", "2020-1-26", "2020-1-27", "2020-1-28", "2020-1-29", "2020-1-30",
    "2020-4-4", "2020-4-5", "2020-4-6",
    "2020-5-1", "2020-5-2", "2020-5-3", "2020-5-4", "2020-5-5",
    "2020-6-25", "2020-6-26", "2020-6-27",
    "2020-10-1", "2020-10-2", "2020-10-3", "2020-10-4", "2020-10-5", "2020-10-6", "2020-10-7", "2020-10-8"
  ]
}
var calendar = {
  // 农历start
  /**
   * 农历1900-2100的润大小信息表
   * @Array Of Property
   * @return Hex 
   */
  lunarInfo: [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, //1900-1909
    0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, //1910-1919
    0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, //1920-1929
    0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, //1930-1939
    0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, //1940-1949
    0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, //1950-1959
    0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, //1960-1969
    0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, //1970-1979
    0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, //1980-1989
    0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0, //1990-1999
    0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, //2000-2009
    0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, //2010-2019
    0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, //2020-2029
    0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, //2030-2039
    0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, //2040-2049
    /**Add By JJonline@JJonline.Cn**/
    0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, //2050-2059
    0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, //2060-2069
    0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, //2070-2079
    0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, //2080-2089
    0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252, //2090-2099
    0x0d520
  ], //2100

  /**
   * 公历每个月份的天数普通表
   * @Array Of Property
   * @return Number 
   */
  solarMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],

  /**
   * 天干地支之天干速查表
   * @Array Of Property trans["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
   * @return Cn string 
   */
  Gan: ["\u7532", "\u4e59", "\u4e19", "\u4e01", "\u620a", "\u5df1", "\u5e9a", "\u8f9b", "\u58ec", "\u7678"],

  /**
   * 天干地支之地支速查表
   * @Array Of Property 
   * @trans["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
   * @return Cn string 
   */
  Zhi: ["\u5b50", "\u4e11", "\u5bc5", "\u536f", "\u8fb0", "\u5df3", "\u5348", "\u672a", "\u7533", "\u9149", "\u620c",
    "\u4ea5"
  ],

  /**
   * 天干地支之地支速查表<=>生肖
   * @Array Of Property 
   * @trans["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
   * @return Cn string 
   */
  Animals: ["\u9f20", "\u725b", "\u864e", "\u5154", "\u9f99", "\u86c7", "\u9a6c", "\u7f8a", "\u7334", "\u9e21",
    "\u72d7", "\u732a"
  ],

  /**
   * 24节气速查表
   * @Array Of Property 
   * @trans["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
   * @return Cn string 
   */
  solarTerm: ["\u5c0f\u5bd2", "\u5927\u5bd2", "\u7acb\u6625", "\u96e8\u6c34", "\u60ca\u86f0", "\u6625\u5206",
    "\u6e05\u660e", "\u8c37\u96e8", "\u7acb\u590f", "\u5c0f\u6ee1", "\u8292\u79cd", "\u590f\u81f3", "\u5c0f\u6691",
    "\u5927\u6691", "\u7acb\u79cb", "\u5904\u6691", "\u767d\u9732", "\u79cb\u5206", "\u5bd2\u9732", "\u971c\u964d",
    "\u7acb\u51ac", "\u5c0f\u96ea", "\u5927\u96ea", "\u51ac\u81f3"
  ],

  /**
   * 1900-2100各年的24节气日期速查表
   * @Array Of Property 
   * @return 0x string For splice
   */
  sTermInfo: ['9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f',
    '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
    '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa',
    '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f',
    'b027097bd097c36b0b6fc9274c91aa', '9778397bd19801ec9210c965cc920e', '97b6b97bd19801ec95f8c965cc920f',
    '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd197c36c9210c9274c91aa',
    '97b6b97bd19801ec95f8c965cc920e', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2',
    '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bcf97c3598082c95f8e1cfcc920f',
    '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e',
    '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
    '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722',
    '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f',
    '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
    '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
    '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd07f595b0b6fc920fb0722',
    '9778397bd097c36b0b6fc9210c8dc2', '9778397bd19801ec9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f',
    '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
    '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
    '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bd07f1487f595b0b0bc920fb0722',
    '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
    '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
    '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
    '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722',
    '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
    '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
    '97b6b97bd19801ec9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
    '9778397bd097c36b0b6fc9210c91aa', '97b6b97bd197c36c9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722',
    '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
    '97b6b7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
    '9778397bd097c36b0b70c9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
    '7f0e397bd097c35b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
    '7f0e27f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
    '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
    '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
    '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
    '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
    '97b6b7f0e47f531b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
    '9778397bd097c36b0b6fc9210c91aa', '97b6b7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
    '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '977837f0e37f149b0723b0787b0721',
    '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c35b0b6fc9210c8dc2',
    '977837f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
    '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
    '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd',
    '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
    '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
    '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
    '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd',
    '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
    '977837f0e37f14998082b0723b06bd', '7f07e7f0e37f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
    '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721',
    '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5',
    '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f531b0b0bb0b6fb0722',
    '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
    '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
    '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35',
    '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
    '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721',
    '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd',
    '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35',
    '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e37f14998083b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
    '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14898082b0723b02d5', '7f07e7f0e37f14998082b0787b0721',
    '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66aa89801e9808297c35', '665f67f0e37f14898082b0723b02d5',
    '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66a449801e9808297c35',
    '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
    '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
    '7f07e7f0e47f531b0723b0b6fb0721', '7f0e26665b66a449801e9808297c35', '665f67f0e37f1489801eb072297c35',
    '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722'
  ],

  /**
   * 数字转中文速查表
   * @Array Of Property 
   * @trans ['日','一','二','三','四','五','六','七','八','九','十']
   * @return Cn string 
   */
  nStr1: ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u4e03", "\u516b", "\u4e5d",
    "\u5341"
  ],

  /**
   * 日期转农历称呼速查表
   * @Array Of Property 
   * @trans ['初','十','廿','卅']
   * @return Cn string 
   */
  nStr2: ["\u521d", "\u5341", "\u5eff", "\u5345"],

  /**
   * 月份转农历称呼速查表
   * @Array Of Property 
   * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
   * @return Cn string 
   */
  nStr3: ["\u6b63", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u4e03", "\u516b", "\u4e5d", "\u5341",
    "\u51ac", "\u814a"
  ],

  /**
   * 返回农历y年一整年的总天数
   * @param lunar Year
   * @return Number
   * @eg:var count = calendar.lYearDays(1987) ;//count=387
   */
  lYearDays: function(y) {
    var i, sum = 348;
    for (i = 0x8000; i > 0x8; i >>= 1) {
      sum += (calendar.lunarInfo[y - 1900] & i) ? 1 : 0;
    }
    return (sum + calendar.leapDays(y));
  },

  /**
   * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
   * @param lunar Year
   * @return Number (0-12)
   * @eg:var leapMonth = calendar.leapMonth(1987) ;//leapMonth=6
   */
  leapMonth: function(y) { //闰字编码 \u95f0
    return (calendar.lunarInfo[y - 1900] & 0xf);
  },

  /**
   * 返回农历y年闰月的天数 若该年没有闰月则返回0
   * @param lunar Year
   * @return Number (0、29、30)
   * @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29
   */
  leapDays: function(y) {
    if (calendar.leapMonth(y)) {
      return ((calendar.lunarInfo[y - 1900] & 0x10000) ? 30 : 29);
    }
    return (0);
  },

  /**
   * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
   * @param lunar Year
   * @return Number (-1、29、30)
   * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29
   */
  monthDays: function(y, m) {
    if (m > 12 || m < 1) {
      return -1
    } //月份参数从1至12，参数错误返回-1
    return ((calendar.lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29);
  },

  /**
   * 返回公历(!)y年m月的天数
   * @param solar Year
   * @return Number (-1、28、29、30、31)
   * @eg:var solarMonthDay = calendar.leapDays(1987) ;//solarMonthDay=30
   */
  solarDays: function(y, m) {
    if (m > 12 || m < 1) {
      return -1
    } //若参数错误 返回-1
    var ms = m - 1;
    if (ms == 1) { //2月份的闰平规律测算后确认返回28或29
      return (((y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0)) ? 29 : 28);
    } else {
      return (calendar.solarMonth[ms]);
    }
  },

  /**
   * 农历年份转换为干支纪年
   * @param  lYear 农历年的年份数
   * @return Cn string
   */
  toGanZhiYear: function(lYear) {
    var ganKey = (lYear - 3) % 10;
    var zhiKey = (lYear - 3) % 12;
    if (ganKey == 0) ganKey = 10; //如果余数为0则为最后一个天干
    if (zhiKey == 0) zhiKey = 12; //如果余数为0则为最后一个地支
    return calendar.Gan[ganKey - 1] + calendar.Zhi[zhiKey - 1];

  },

  /**
   * 公历月、日判断所属星座
   * @param  cMonth [description]
   * @param  cDay [description]
   * @return Cn string
   */
  toAstro: function(cMonth, cDay) {
    var s =
      "\u9b54\u7faf\u6c34\u74f6\u53cc\u9c7c\u767d\u7f8a\u91d1\u725b\u53cc\u5b50\u5de8\u87f9\u72ee\u5b50\u5904\u5973\u5929\u79e4\u5929\u874e\u5c04\u624b\u9b54\u7faf";
    var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
    return s.substr(cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0), 2) + "\u5ea7"; //座
  },

  /**
   * 传入offset偏移量返回干支
   * @param offset 相对甲子的偏移量
   * @return Cn string
   */
  toGanZhi: function(offset) {
    return calendar.Gan[offset % 10] + calendar.Zhi[offset % 12];
  },

  /**
   * 传入公历(!)y年获得该年第n个节气的公历日期
   * @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起 
   * @return day Number
   * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
   */
  getTerm: function(y, n) {
    if (y < 1900 || y > 2100) {
      return -1;
    }
    if (n < 1 || n > 24) {
      return -1;
    }
    var _table = calendar.sTermInfo[y - 1900];
    var _info = [
      parseInt('0x' + _table.substr(0, 5)).toString(),
      parseInt('0x' + _table.substr(5, 5)).toString(),
      parseInt('0x' + _table.substr(10, 5)).toString(),
      parseInt('0x' + _table.substr(15, 5)).toString(),
      parseInt('0x' + _table.substr(20, 5)).toString(),
      parseInt('0x' + _table.substr(25, 5)).toString()
    ];
    var _calday = [
      _info[0].substr(0, 1),
      _info[0].substr(1, 2),
      _info[0].substr(3, 1),
      _info[0].substr(4, 2),

      _info[1].substr(0, 1),
      _info[1].substr(1, 2),
      _info[1].substr(3, 1),
      _info[1].substr(4, 2),

      _info[2].substr(0, 1),
      _info[2].substr(1, 2),
      _info[2].substr(3, 1),
      _info[2].substr(4, 2),

      _info[3].substr(0, 1),
      _info[3].substr(1, 2),
      _info[3].substr(3, 1),
      _info[3].substr(4, 2),

      _info[4].substr(0, 1),
      _info[4].substr(1, 2),
      _info[4].substr(3, 1),
      _info[4].substr(4, 2),

      _info[5].substr(0, 1),
      _info[5].substr(1, 2),
      _info[5].substr(3, 1),
      _info[5].substr(4, 2),
    ];
    return parseInt(_calday[n - 1]);
  },

  /**
   * 传入农历数字月份返回汉语通俗表示法
   * @param lunar month
   * @return Cn string
   * @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'
   */
  toChinaMonth: function(m) { // 月 => \u6708
    if (m > 12 || m < 1) {
      return -1
    } //若参数错误 返回-1
    var s = calendar.nStr3[m - 1];
    s += "\u6708"; //加上月字
    return s;
  },

  /**
   * 传入农历日期数字返回汉字表示法
   * @param lunar day
   * @return Cn string
   * @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'
   */
  toChinaDay: function(d) { //日 => \u65e5
    var s;
    switch (d) {
      case 10:
        s = '\u521d\u5341';
        break;
      case 20:
        s = '\u4e8c\u5341';
        break;
        break;
      case 30:
        s = '\u4e09\u5341';
        break;
        break;
      default:
        s = calendar.nStr2[Math.floor(d / 10)];
        s += calendar.nStr1[d % 10];
    }
    return (s);
  },

  /**
   * 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”
   * @param y year
   * @return Cn string
   * @eg:var animal = calendar.getAnimal(1987) ;//animal='兔'
   */
  getAnimal: function(y) {
    return calendar.Animals[(y - 4) % 12]
  },

  /**
   * 传入阳历月日得到阳历节日（中文）
   */
  getSolarHoliday: function(m, d) {
    var txt;
    if (m == 1 && d == 1) {
      txt = '元旦';
    } else if (m == 5 && d == 1) {
      txt = '劳动节';
    } else if (m == 10 && d == 1) {
      txt = '国庆节';
    }
    return txt;
  },

  /**
   * 传入阴历月日得到阴历节日（中文）
   */
  getLunarHoliday: function(m, d) {
    var txtL;
    if (m == 1 && d == 1) {
      txtL = '春节';
    } else if (m == 5 && d == 5) {
      txtL = '端午节';
    } else if (m == 8 && d == 15) {
      txtL = '中秋节';
    }
    return txtL;
  },

  /**
   * 传入阳历年月日获得详细的公历、农历object信息 <=>JSON
   * @param y  solar year
   * @param m  solar month
   * @param d  solar day
   * @return JSON object
   * @eg:console.log(calendar.solar2lunar(1987,11,01));
   */
  solar2lunar: function(y, m, d) { //参数区间1900.1.31~2100.12.31
    if (y < 1900 || y > 2100) {
      return -1;
    } //年份限定、上限
    if (y == 1900 && m == 1 && d < 31) {
      return -1;
    } //下限
    if (!y) { //未传参  获得当天
      var objDate = new Date();
    } else {
      var objDate = new Date(y, parseInt(m) - 1, d)
    }
    var i, leap = 0,
      temp = 0;
    //修正ymd参数
    var y = objDate.getFullYear(),
      m = objDate.getMonth() + 1,
      d = objDate.getDate();
    var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) /
      86400000;
    for (i = 1900; i < 2101 && offset > 0; i++) {
      temp = calendar.lYearDays(i);
      offset -= temp;
    }
    if (offset < 0) {
      offset += temp;
      i--;
    }

    //是否今天
    var isTodayObj = new Date(),
      isToday = false;
    if (isTodayObj.getFullYear() == y && isTodayObj.getMonth() + 1 == m && isTodayObj.getDate() == d) {
      isToday = true;
    }
    //星期几
    var nWeek = objDate.getDay(),
      cWeek = calendar.nStr1[nWeek];
    if (nWeek == 0) {
      nWeek = 7;
    } //数字表示周几顺应天朝周一开始的惯例
    //农历年
    var year = i;

    var leap = calendar.leapMonth(i); //闰哪个月
    var isLeap = false;

    //效验闰月
    for (i = 1; i < 13 && offset > 0; i++) {
      //闰月
      if (leap > 0 && i == (leap + 1) && isLeap == false) {
        --i;
        isLeap = true;
        temp = calendar.leapDays(year); //计算农历闰月天数
      } else {
        temp = calendar.monthDays(year, i); //计算农历普通月天数
      }
      //解除闰月
      if (isLeap == true && i == (leap + 1)) {
        isLeap = false;
      }
      offset -= temp;
    }

    if (offset == 0 && leap > 0 && i == leap + 1)
      if (isLeap) {
        isLeap = false;
      } else {
        isLeap = true;
        --i;
      }
    if (offset < 0) {
      offset += temp;
      --i;
    }
    //农历月
    var month = i;
    //农历日
    var day = offset + 1;

    //天干地支处理
    var sm = m - 1;
    var gzY = calendar.toGanZhiYear(year);

    //月柱 1900年1月小寒以前为 丙子月(60进制12)
    var firstNode = calendar.getTerm(year, (m * 2 - 1)); //返回当月「节」为几日开始
    var secondNode = calendar.getTerm(year, (m * 2)); //返回当月「节」为几日开始

    //依据12节气修正干支月
    var gzM = calendar.toGanZhi((y - 1900) * 12 + m + 11);
    if (d >= firstNode) {
      gzM = calendar.toGanZhi((y - 1900) * 12 + m + 12);
    }

    //传入的日期的节气与否
    var isTerm = false;
    var Term = null;
    if (firstNode == d) {
      isTerm = true;
      Term = calendar.solarTerm[m * 2 - 2];
    }
    if (secondNode == d) {
      isTerm = true;
      Term = calendar.solarTerm[m * 2 - 1];
    }
    //日柱 当月一日与 1900/1/1 相差天数
    var dayCyclical = Date.UTC(y, sm, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
    var gzD = calendar.toGanZhi(dayCyclical + d - 1);
    //该日期所属的星座
    var astro = calendar.toAstro(m, d);

    /**
     * @Auhor: Jxx
     * @Time: 2018-11-28
     * @description: add new holidays
     */
    //传入的日期是否是阴历的节日
    var isLunarH = false;
    if (calendar.getLunarHoliday(month, day) != "" && calendar.getLunarHoliday(month, day) != undefined) {
      isLunarH = true;
    }
    //传入的日期是否是阳历的节日
    var isSolarH = false;
    if (calendar.getSolarHoliday(m, d) != "" && calendar.getSolarHoliday(m, d) != undefined) {
      isSolarH = true;
    }

    return {
      'lYear': year,
      'lMonth': month,
      'lDay': day,
      'Animal': calendar.getAnimal(year),
      'IMonthCn': (isLeap ? "\u95f0" : '') + calendar.toChinaMonth(month),
      'IDayCn': calendar.toChinaDay(day),
      'cYear': y,
      'cMonth': m,
      'cDay': d,
      'gzYear': gzY,
      'gzMonth': gzM,
      'gzDay': gzD,
      'isToday': isToday,
      'isLeap': isLeap,
      'nWeek': nWeek,
      'ncWeek': "\u661f\u671f" + cWeek,
      'isTerm': isTerm,
      'Term': Term,
      'astro': astro,
      'isLunarH': isLunarH,
      'lunarH': calendar.getLunarHoliday(month, day),
      'isSolarH': isSolarH,
      'solarH': calendar.getSolarHoliday(m, d)
    };
  },
  /**
   * 传入农历年月日以及传入的月份是否闰月获得详细的公历、农历object信息 <=>JSON
   * @param y  lunar year
   * @param m  lunar month
   * @param d  lunar day
   * @param isLeapMonth  lunar month is leap or not.[如果是农历闰月第四个参数赋值true即可]
   * @return JSON object
   * @eg:console.log(calendar.lunar2solar(1987,9,10));
   */
  lunar2solar: function(y, m, d, isLeapMonth) { //参数区间1900.1.31~2100.12.1
    var isLeapMonth = !!isLeapMonth;
    var leapOffset = 0;
    var leapMonth = calendar.leapMonth(y);
    var leapDay = calendar.leapDays(y);
    if (isLeapMonth && (leapMonth != m)) {
      return -1;
    } //传参要求计算该闰月公历 但该年得出的闰月与传参的月份并不同
    if (y == 2100 && m == 12 && d > 1 || y == 1900 && m == 1 && d < 31) {
      return -1;
    } //超出了最大极限值 
    var day = calendar.monthDays(y, m);
    var _day = day;
    //bugFix 2016-9-25 
    //if month is leap, _day use leapDays method 
    if (isLeapMonth) {
      _day = calendar.leapDays(y, m);
    }
    if (y < 1900 || y > 2100 || d > _day) {
      return -1;
    } //参数合法性效验

    //计算农历的时间差
    var offset = 0;
    for (var i = 1900; i < y; i++) {
      offset += calendar.lYearDays(i);
    }
    var leap = 0,
      isAdd = false;
    for (var i = 1; i < m; i++) {
      leap = calendar.leapMonth(y);
      if (!isAdd) { //处理闰月
        if (leap <= i && leap > 0) {
          offset += calendar.leapDays(y);
          isAdd = true;
        }
      }
      offset += calendar.monthDays(y, i);
    }
    //转换闰月农历 需补充该年闰月的前一个月的时差
    if (isLeapMonth) {
      offset += day;
    }
    //1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)
    var stmap = Date.UTC(1900, 1, 30, 0, 0, 0);
    var calObj = new Date((offset + d - 31) * 86400000 + stmap);
    var cY = calObj.getUTCFullYear();
    var cM = calObj.getUTCMonth() + 1;
    var cD = calObj.getUTCDate();

    return calendar.solar2lunar(cY, cM, cD);
  },
  // 农历end

  //当前时间
  nowTime: new Date(),
  // 当前年份
  // currYear: calendar.nowTime.getFullYear(),
  currYear: function() {
    return calendar.nowTime.getFullYear();
  },
  // // 当前月份
  currMonth: function() {
    return calendar.nowTime.getMonth() + 1;
  },
  // 当前日
  currDate: function() {
    return calendar.nowTime.getDate();
  },
  holidays: ['假期安排', '元旦', '除夕', '春节', '清明节', '劳动节', '端午节', '中秋节', '国庆节'],
  // 日期外框
  calendarContainer: function() {
    var calendarWrapper = calendar.withID("calendarWrapper");
    if (calendarWrapper != "" && calendarWrapper != null && calendarWrapper != 'undefined') {
      calendarWrapper.parentNode.removeChild(calendarWrapper);
    }
    var cM = calendar.currMonth();
    var cY = calendar.currYear();
    var str = '<div class="calendar-select-box">' +
      '<div class="calendar-year-box"></div>' +
      '<div class="calendar-month-box">' +
      '<button class="calender-month-prev"></button>' +
      '<button class="calender-month-next"></button>' +
      '<div id="monthBtnGroup">';
    if (cM < 10) {
      str += '<div class="dropdown-btn" id="selectedMonth" data-value="' + cM + '">' + cY + '年0' + cM + '月</div>';
    } else {
      str += '<div class="dropdown-btn" id="selectedMonth" data-value="' + cM + '">' + cY + '年' + cM + '月</div>';
    }
    str += '</div>' +
      '<div class="month-dropmenu" id="monthDropMenu" style="display: none;">' +
      '<div class="month-wrapper">' +
      '<p class="current-year" data-value="' + cY + '" id="currentYearDrop">' + cY + '年</p>' +
      '<div class="month-main">' +
      '<ul class="month-box" id="monthBox"></ul>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>'
      +'<button class="calendar-backtotoday">返回今天</button>'
      +'<button class="calendar-reset">重置</button>'
      +
      '</div>' +
      '<div class="calendar-table-wrapper">' +
      '<table class="calendar-table-box" cellspacing="0" cellpadding="0">' +
      '<thead>' +
      '<tr>' +
      '<th class="calendar-table-weekend">日</th>' +
      '<th>一</th>' +
      '<th>二</th>' +
      '<th>三</th>' +
      '<th>四</th>' +
      '<th>五</th>' +
      '<th class="calendar-table-weekend">六</th>' +
      '</tr>' +
      '</thead>' +
      '<tbody class="calendar-tbody">' +
      '</tbody>' +
      '</table>' +
      '</div>';
    var rootEle = document.body;
    var div = calendar.newElement("div");
    div.innerHTML = str;
    div.setAttribute("class", "calendar-wrapper");
    div.setAttribute("id", "calendarWrapper");
    rootEle.appendChild(div);
  },
  /**
   * 创建年份下拉,并给对应事件
   * 选择则对应的table日期也将改变,且已选中日期会跳到当前选择月的日期，然后给右边明细栏赋值
   */
  createSelectYear: function() {
    var cY = calendar.currYear();
    var strY = ''
      +'<div class="year-btn-group" id="yearBtnGroup">'
      +'<div class="dropdown-btn align-l" id="selectedYear" data-value="' + cY + '">' + cY + '年</div>'
      +'<i class="arrow-down"></i>'
      +'</div>'
      +'<div class="year-dropmenu" id="yearDropMenu" style="display: none;">'
      +'<ul class="dropdown-menu-box" id="yearMenuBox">'
      +'</ul>'
      +'</div>'
      +'</div>';
    calendar.withClass("calendar-year-box").innerHTML = strY;
    //填充下拉框中的年份
    var yearBox = calendar.withID('yearMenuBox');
    //总年数
    var lenY = 20;
    for (var i = 0; i <= 20; i++) {
      var li = calendar.newElement('li');
      li.className = 'dropdown-item';
      li.setAttribute('data-value', (cY - 10 + i));
      li.innerText = (cY - 10 + i) + '年';
      //给li添加点击事件
      li.onclick = function() {
        var selectyear = calendar.withID("selectedYear");
        var year = this.getAttribute('data-value');
        var month = calendar.withID("selectedMonth").getAttribute('data-value');
        selectyear.innerHTML = year + '年';
        selectyear.setAttribute('data-value', year);
        if(month < 10) {
          calendar.withID("selectedMonth").innerHTML = year + '年0' + month + '月';
        } else {
          calendar.withID("selectedMonth").innerHTML = year + '年' + month + '月';
        }
        calendar.createMonthBox(year);
        
        yearMenu.style.display = 'none';
        calendar.createTabledate(year, month);
        //切换时是否会遇到假期安排的时间selectedDate
        if (calendar.isSelectedDate(selectedDate)) {
          calendar.addItemClassname(calendar.withClass('calendar-wrapper'), 'calendar-holidaystyle');
        } else {
          calendar.removeItemClassname(calendar.withClass('calendar-wrapper'), 'calendar-holidaystyle');
        }
      }
      yearBox.appendChild(li);
    }

    //点击年份下拉框
    var yearBtn = calendar.withID('yearBtnGroup');
    var yearMenu = calendar.withID('yearDropMenu');
    yearBtn.onclick = function() {
      var ymd = yearMenu.style.display;
      calendar.hideDropdown('month-dropmenu');
      if (ymd == 'none') {
        yearMenu.style.display = 'block';
      } else {
        yearMenu.style.display = 'none';
      }
    }
  },
  /**
   * @param year 传入当前选中的是哪一年
   */
  createMonthSelect: function(year) {
    var monthBox = calendar.withID("monthBox");
    if (monthBox != "" && monthBox != null && monthBox != 'undefined') {
      monthBox.parentNode.removeChild(monthBox);
    }
    var monthBox = calendar.newElement("ul");
    monthBox.setAttribute("class", "month-box");
    monthBox.setAttribute("id", "monthBox");
    var monthMain = calendar.withClass('month-main');
    monthMain.appendChild(monthBox);

    //当前年份
    var currentYear = calendar.withID('selectedYear').getAttribute('data-value');
    //当前年份
    var currentMonth = calendar.withID('selectedMonth').getAttribute('data-value');
    //去年最后两个月

    for (var j = 11; j <= 12; j++) {
      var prevLi = calendar.newElement("li")
      prevLi.className = 'other-month';
      prevLi.setAttribute('data-value', parseInt(year) - 1 + '-' + j);
      prevLi.innerText = parseInt(year) - 1 + '年' + j + '月';
      monthBox.appendChild(prevLi);
    }

    //当前年
    for (var i = 1; i <= 12; i++) {
      var li = calendar.newElement("li")
      if (i == currentMonth) {
        li.className = 'current-month';
      } else {
        li.className = '';
      }
      if (i < 10) {
        li.setAttribute('data-value', parseInt(year) + '-0' + i);
        li.innerText = parseInt(year) + '年0' + i + '月';
      } else {
        li.setAttribute('data-value', parseInt(year) + '-' + i);
        li.innerText = parseInt(year) + '年' + i + '月';
      }
      monthBox.appendChild(li);
    }

    //明年头两个月
    for (var k = 1; k <= 2; k++) {
      var nextLi = calendar.newElement("li")
      nextLi.className = 'other-month';
      nextLi.setAttribute('data-value', parseInt(year) + 1 + '-0' + k);
      nextLi.innerText = parseInt(year) + 1 + '年0' + k + '月';
      monthBox.appendChild(nextLi);
    }

    var liArr = document.getElementById("monthBox").childNodes;
    for (var n = 0; n < liArr.length; n++) {
      if (liArr[n].className.indexOf("other-month") > -1) {
        //上一年
        liArr[n].onclick = function() {
          var selectmonth = calendar.withID("selectedMonth");
          var monthOther = this.getAttribute("data-value");
          var monthOtherArr = monthOther.split("-");
          selectmonth.innerHTML = monthOtherArr[0] + '年' + monthOtherArr[1] + '月';
          selectmonth.setAttribute('data-value', parseInt(monthOtherArr[1], 10))

          //月份时间表重新加载
          calendar.createMonthBox(monthOtherArr[0]);

          monthMenu.style.display = 'none';
          calendar.createTabledate(monthOtherArr[0], parseInt(monthOtherArr[1], 10));
          //切换时是否会遇到假期安排的时间selectedDate
          if (calendar.isSelectedDate(selectedDate)) {
            calendar.addItemClassname(calendar.withClass('calendar-wrapper'), 'calendar-holidaystyle');
          } else {
            calendar.removeItemClassname(calendar.withClass('calendar-wrapper'), 'calendar-holidaystyle');
          }
        }
      } else {
        liArr[n].onclick = function() {
          var selectmonth = calendar.withID("selectedMonth");
          var month = this.getAttribute('data-value');
          var monthArr = month.split("-");
          selectmonth.innerHTML = monthArr[0] + '年' + monthArr[1] + '月';
          selectmonth.setAttribute('data-value', parseInt(monthArr[1], 10))
          monthMenu.style.display = 'none';
          calendar.createTabledate(monthArr[0], parseInt(monthArr[1], 10));

          //切换时是否会遇到假期安排的时间selectedDate
          if (calendar.isSelectedDate(selectedDate)) {
            calendar.addItemClassname(calendar.withClass('calendar-wrapper'), 'calendar-holidaystyle');
          } else {
            calendar.removeItemClassname(calendar.withClass('calendar-wrapper'), 'calendar-holidaystyle');
          }
        }
      }
    }

    //点击月份下拉框
    var monthBtn = calendar.withID('monthBtnGroup');
    var monthMenu = calendar.withID('monthDropMenu');
    monthBtn.onclick = function() {
      var mmd = monthMenu.style.display;
      calendar.hideDropdown('year-dropmenu');
      if (mmd == 'none') {
        var year = calendar.withID("currentYearDrop").getAttribute("data-value");
        monthMenu.style.display = 'block';
        calendar.createMonthSelect(year);
      } else {
        monthMenu.style.display = 'none';
      }
    }
  },
  //根据年，月，用table绘制日历。 年月变动则 重新绘制
  createTabledate: function(year, month) {
    var calendar_tbody = calendar.withClass("calendar-tbody");
    if (calendar_tbody != "" && calendar_tbody != null && calendar_tbody != 'undefined') {
      calendar_tbody.parentNode.removeChild(calendar_tbody);
    }
    var calendar_body = calendar.newElement('tbody');
    calendar_body.setAttribute("class", "calendar-tbody");
    var calendarTable = calendar.withClass('calendar-table-box');
    calendarTable.appendChild(calendar_body);
    // month去0
    month = parseInt(month, 10);
    //先得到当前月第一天是星期几,然后根据这个星期算前面几天的上个月最后几天.
    var fixedDate = calendar.setdateinfo(year, month, 1);
    //当前月第一天星期几,星期一到星期日的值分别是1-2-3-4-5-6-0
    var firstDay = fixedDate.getDay();
    //上个月的最后一天是星期几
    var pervLastDay;
    if (firstDay != 0) {
      pervLastDay = firstDay - 1;
    } else {
      pervLastDay = 6;
    }
    //得到上个月最后一天;
    var pervMonthlastDay = calendar.getPervMonthLastDay(year, month);
    //上月最后几天循环
    var lastdays = pervMonthlastDay - pervLastDay;
    var tr = calendar.newElement('tr');
    if (firstDay != 0) {
      for (var i = lastdays; i <= pervMonthlastDay; i++) {
        var td = calendar.newElement('td');
        var tdDiv = calendar.newElement('div');
        tdDiv.className = 'calendar-relative';
        td.appendChild(tdDiv);
        var a = calendar.getA(parseInt(month, 10) - 1 == 0 ? parseInt(year) - 1 : year, parseInt(month, 10) - 1 == 0 ? 12 :
          parseInt(month, 10) - 1, i);
        //上个月最后几天的样式
        a.className = 'calendar-table-other-month';
        tdDiv.appendChild(a);
        tr.appendChild(td);
      }
    }
    //这个月开始的循环
    //这个月startDays的取值 7-6-5-4-3-2-1
    var startDays = ((7 - firstDay) == 7 ? 7 : (7 - firstDay));
    for (var i = 1; i <= startDays; i++) {
      var td = calendar.newElement("td");
      var tdDiv = calendar.newElement('div');
      tdDiv.className = 'calendar-relative';
      td.appendChild(tdDiv);
      var b = calendar.getA(year, month, i);
      tdDiv.appendChild(b);
      tr.appendChild(td);
    }
    calendar_body.appendChild(tr);
    //指定年月最后一天
    var currMonthLashDay = calendar.getCurrMonthLashDay(year, month);
    //当月除开第一行的起点
    var currmonthStartDay = startDays;
    //当月还剩余的天数
    var restDays = currMonthLashDay - startDays;
    //循环次数
    var loopT = 0;
    if (calendar.check(restDays / 7)) {
      //是小数
      loopT = Math.ceil(restDays / 7); //向上取整
    } else {
      loopT = restDays / 7;
    }

    //这是下个月开始的变量;
    var lastFirstDay = 1;
    for (var i = 0; i < loopT; i++) {
      var tr1 = calendar.newElement('tr');
      for (var n = 1; n <= 7; n++) {
        var td = calendar.newElement('td');
        var tdDiv = calendar.newElement('div');
        tdDiv.className = 'calendar-relative';
        td.appendChild(tdDiv);

        if (startDays == 0) {
          //下个月
          var c = calendar.getA(parseInt(month, 10) + 1 == parseInt(13) ? parseInt(year) + 1 : year, parseInt(month, 10) +
            1 == parseInt(13) ? 1 : parseInt(month, 10) + 1, lastFirstDay);
          //下个月最后几天的样式
          c.className = 'calendar-table-other-month';
          tdDiv.appendChild(c);
          lastFirstDay++;
          tr1.appendChild(td);
          continue;
        } else {
          startDays++;
          var d = calendar.getA(year, month, startDays);
          tdDiv.appendChild(d);
          if (startDays == currMonthLashDay) {
            //下个月
            startDays = 0;
          }
          tr1.appendChild(td);
        }

      }
      calendar_body.appendChild(tr1);
    }
    calendar.setHolidayred(); //设置星期六星期天的样式   
    calendar.setA(); //设置td中a的事件
    //左上角休息和上班的标记
    calendar.daySign();

    //获取当前被选中的a，如果没有被选中的则查找今天
    var sarr = [];
    if (calendar.isHasClass('calendar-table-selected')) {
      selectedDate = calendar.withClass('calendar-table-selected').getAttribute('date');
      sarr = selectedDate.split('-');
    } else if (calendar.isHasClass('calendar-table-today')) {
      selectedDate = calendar.withClass('calendar-table-today').getAttribute('date');
      sarr = selectedDate.split('-');
    } else {
      sarr = selectedDate.split('-');
      var syear = calendar.withID('selectedYear').getAttribute('data-value');
      var smonth = calendar.withID('selectedMonth').getAttribute('data-value');
      sarr[0] = syear;
      sarr[1] = smonth;
    }
    if (sarr[2] > calendar.getCurrMonthLashDay(sarr[0], sarr[1])) {
      sarr[2] = calendar.getCurrMonthLashDay(sarr[0], sarr[1])
    }
    selectedDate = sarr[0] + '-' + sarr[1] + '-' + sarr[2];
  },
  // 根据年重新绘制月份表
  createMonthBox: function(year) {
    calendar.createMonthSelect(year);
    calendar.withID("currentYearDrop").setAttribute("data-value", year);
    calendar.withID("currentYearDrop").innerHTML = year + "年";
    calendar.withID("selectedYear").setAttribute("data-value", year);
    calendar.withID("selectedYear").innerHTML = year + "年";
  },
  //切换上一个月，下一个月和返回今天
  leftrightclick: function() {
    var LeftBtn = calendar.withClass('calender-month-prev');
    var rightBtn = calendar.withClass('calender-month-next');
    var toToday = calendar.withClass('calendar-backtotoday');
    var resetBtn = calendar.withClass('calendar-reset');
    //上一个月
    LeftBtn.onclick = function() {
      var monthSelect = calendar.withID("selectedMonth");
      var monthVal = parseInt(monthSelect.getAttribute('data-value'), 10);
      var yearSelect = calendar.withID("selectedYear");
      var yearVal = parseInt(yearSelect.getAttribute('data-value'));
      calendar.withID('monthDropMenu').style.display = 'none';
      if (monthVal == 1) {
        yearVal -= 1;
        monthVal = 12;
      } else {
        monthVal -= 1;
      }
      calendar.createMonthBox(yearVal);
      monthSelect.setAttribute('data-value', monthVal);
      if (monthVal < 10) {
        monthSelect.innerHTML = yearVal + '年0' + monthVal + '月';
      } else {
        monthSelect.innerHTML = yearVal + '年' + monthVal + '月';
      }
      //重新画表
      calendar.createTabledate(yearVal, monthVal);
      //切换时是否会遇到假期安排的时间selectedDate
      if (calendar.isSelectedDate(selectedDate)) {
        calendar.addItemClassname(calendar.withClass('calendar-wrapper'), 'calendar-holidaystyle');
      } else {
        calendar.removeItemClassname(calendar.withClass('calendar-wrapper'), 'calendar-holidaystyle');
      }
    }
    //下一个月
    rightBtn.onclick = function() {
      var monthSelect = calendar.withID("selectedMonth");
      var monthVal = parseInt(monthSelect.getAttribute('data-value'), 10);
      var yearSelect = calendar.withID("selectedYear");
      var yearVal = parseInt(yearSelect.getAttribute('data-value'));
      calendar.withID('monthDropMenu').style.display = 'none';
      if (monthVal == 12) {
        yearVal += 1;
        monthVal = 1;
      } else {
        monthVal += 1;
      }
      calendar.createMonthBox(yearVal);
      monthSelect.setAttribute('data-value', monthVal);
      if (monthVal < 10) {
        monthSelect.innerHTML = yearVal + '年0' + monthVal + '月';
      } else {
        monthSelect.innerHTML = yearVal + '年' + monthVal + '月';
      }
      //重新画表
      calendar.createTabledate(yearVal, monthVal);
      //切换时是否会遇到假期安排的时间selectedDate
      if (calendar.isSelectedDate(selectedDate)) {
        calendar.addItemClassname(calendar.withClass('calendar-wrapper'), 'calendar-holidaystyle');
      } else {
        calendar.removeItemClassname(calendar.withClass('calendar-wrapper'), 'calendar-holidaystyle');
      }
    }
    //返回今天
    toToday.onclick = function() {
      var monthSelect = calendar.withID("selectedMonth");
      var yearSelect = calendar.withID("selectedYear");
      yearSelect.innerHTML = calendar.currYear() + '年';
      monthSelect.setAttribute('data-value', calendar.currMonth());
      if (parseInt(calendar.currMonth(), 10) < 10) {
        monthSelect.innerHTML = calendar.currYear() + '年0' + calendar.currMonth() + '月';
      } else {
        monthSelect.innerHTML = calendar.currYear() + '年' + calendar.currMonth() + '月';
      }
      calendar.createMonthBox(calendar.currYear());
      //重新画表
      calendar.createTabledate(calendar.currYear(), calendar.currMonth());
      //切换时是否会遇到假期安排的时间selectedDate
      if (calendar.isSelectedDate(selectedDate)) {
        calendar.addItemClassname(calendar.withClass('calendar-wrapper'), 'calendar-holidaystyle');
      } else {
        calendar.removeItemClassname(calendar.withClass('calendar-wrapper'), 'calendar-holidaystyle');
      }
    }
    //重置
    resetBtn.onclick = function() {
      signData.weekdays = signObjAll.weekdays.concat();
      signData.weekends = signObjAll.weekends.concat();
      calendar.initCalendar(signObjAll);
    }
  },
  //根据传入的年月日获取具体的时间信息
  setdateinfo: function(year, month, day) {
    var date1 = new Date();
    date1.setFullYear(parseInt(year));
    date1.setMonth(parseInt(month, 10) - parseInt(1), parseInt(day, 10));
    return date1;
  },
  //得到指定月的上个月最后一天传进来按 12月算
  getPervMonthLastDay: function(year, month) {
    //当月就是  month-1 也就是计算机里面的0-11月份,那么算上个月的最后一天就是当月的0天
    return parseInt(new Date(year, month - 1, 0).getDate(), 10);
  },
  //创建日历表中的a标签并设置公用属性
  getA: function(year, month, day) {
    //获取农历信息
    var almanacTxt;
    var lunarObj = calendar.solar2lunar(year, month, day);
    /**
     * Animal: 生肖
     * IDayCn: 农历-日
     * IMonthCn: 农历-月
     * Term: 24节气
     * astro: 星座
     * cDay: 公历—日
     * cMonth: 公历-月
     * cYear: 公历-年
     * gzDay: 天干地支-日
     * gzMonth: 天干地支-月
     * gzYear: 天干地支-年
     * isLeap: 是否为闰月
     * isTerm: 是否是24节气日
     * isToday: 是否是今天
     * lDay: 农历-日
     * lMonth: 农历-月
     * lYear: 农历-年
     * nWeek: 星期几(3)
     * ncWeek: 星期几(星期三)
     * isLunarH: 是否是农历的节日
     * isSolarH: 是否是阳历的节日
     * lunarH: 农历节日
     * solarH: 阳历节日
     */
    var a = calendar.newElement("a");

    var nyEveObj = calendar.lunar2solar(year, 1, 0);
    if (month == nyEveObj.cMonth && day == nyEveObj.cDay) {
      //除夕
      almanacTxt = '除夕';
      calendar.addItemClassname(a, 'calendar-table-festival');
    } else if (lunarObj.isLunarH) {
      //农历节日
      almanacTxt = lunarObj.lunarH;
      calendar.addItemClassname(a, 'calendar-table-festival');
    } else if (lunarObj.isSolarH) {
      //阳历节日
      almanacTxt = lunarObj.solarH;
      calendar.addItemClassname(a, 'calendar-table-festival');
    } else if (lunarObj.isTerm) {
      //是24节气
      almanacTxt = lunarObj.Term;
      calendar.addItemClassname(a, 'calendar-table-festival');
    } else if (lunarObj.IDayCn == '初一') {
      almanacTxt = lunarObj.IMonthCn;
    } else {
      almanacTxt = lunarObj.IDayCn;
    }
    a.href = "javascript:;";
    a.innerHTML = '<p class="calendar-table-daynumber"><span class="daynumber">' + day + '</span></p>' +
      '<p class="calendar-table-almanac">' + almanacTxt + '</p>';
    a.setAttribute("date", year + "-" + month + "-" + day);
    //判断是否被选中过
    var itemTxt = year + "-" + month + "-" + day;
    if (calendar.indexOfArray(calendar.selectDays, itemTxt) > -1) {
      calendar.addItemClassname(a, 'calendar-table-selected');
    } else {
      calendar.removeItemClassname(a, 'calendar-table-selected');
    }
    return a;
  },

  //得到指定月最后一天，传进来按 12月算
  getCurrMonthLashDay: function(year, month) {
    if (month >= 12) {
      year = year + 1;
      month = month - 12;
    }
    return parseInt(new Date(year, month, 0).getDate(), 10);
  },

  //给tbody中的td中的A设置事件，上个月的天数,这个月的天数,下个月的天数三种对应的事件
  //这里还有个功能就是判断当前的A中日期是不是数据库中有带状态的日期,如果是就给相当的样式
  setA: function() {
    var tbody = calendar.withClass("calendar-tbody");
    var arr = tbody.getElementsByTagName("a");
    for (var i = 0; i < arr.length; i++) {
      var date = arr[i].getAttribute("date");
      var datearr = date.split("-");
      if (arr[i].className.indexOf("calendar-table-other-month") > -1) {
        arr[i].setAttribute("onclick", "calendar.setOther(" + datearr[0] + "," + datearr[1] + "," + datearr[2] +
          ",this);calendar.stopBubble(this);")
      } else {
        arr[i].setAttribute("onclick", "calendar.setAClick(this);calendar.stopBubble(this);");
      }
      //判断当前值是否被选中
      if (calendar.indexOfArray(calendar.selectDays, date) > -1) {
        //被选中
        calendar.addItemClassname(arr[i], 'calendar-table-selected');
      } else {
        calendar.removeItemClassname(arr[i], 'calendar-table-selected');
      }
    }
  },

  //给当前的A设置点击添加样式
  setAClick: function(obj) {
    var itemA = obj.getAttribute("date");
    var str = obj.className;
    if (!str) {
      str = ''
    }
    calendar.withID('monthDropMenu').style.display = 'none';
    if (str.indexOf("calendar-table-selected") > -1) {
      calendar.removeItemClassname(obj, 'calendar-table-selected');
      calendar.removeArrayItem(calendar.selectDays, itemA);
    } else {
      calendar.addItemClassname(obj, 'calendar-table-selected')
      calendar.selectDays.push(itemA);
    }
    calendar.selectDays = calendar.removeSameItem(calendar.selectDays);
    calendar.checkDateType(itemA);
  },
  //给上一个月最后几天和下一个月头几天设置点击跳转月份
  setOther: function(year, month, day, data) {
    calendar.createTabledate(year, month); //创建对应的table(日期)
    calendar.updateSelect(year, month); //改变年月select值
    //选中该天
    var dateTxt = data.getAttribute('date')
    calendar.setAClick(calendar.dateToA(dateTxt))
  },
  //判断是否有某个classname
  isHasClass: function(classname) {
    //获取body下所有的子元素
    var allTag = document.getElementsByTagName('*');
    for (var i = 0; i < allTag.length; i++) {
      if (allTag[i].className.indexOf(classname) > -1) {
        return true;
      } else {
        return false;
      }
    };
  },
  //隐藏所有的下拉框
  hideDropdown: function(classname) {
    //获取body下所有的子元素
    var allTag = document.getElementsByTagName('*');
    for (var i = 0; i < allTag.length; i++) {
      if (allTag[i].className == classname) {
        allTag[i].style.display = 'none';
      }
    };
  },
  //通过a标签上的date值找到对应的a元素
  dateToA: function(val) {
    //获取body下的所有a标签
    var allTagA = document.getElementsByTagName('a');
    for (var i = 0; i < allTagA.length; i++) {
      var attrs = allTagA[i].getAttribute('date');
      if (attrs == val) {
        return allTagA[i];
      }
    };
  },
  
  /**
   * @param ele: 元素标签名
   * @return 新建元素
   */
  newElement: function(ele) {
    return document.createElement(ele);
  },
  /**
   * @param id: 元素id
   * @return 得到id对象
   */
  withID: function(id) {
    return document.getElementById(id);
  },
  /**
   * @param classname: 元素类名
   * @return 得到传入参数为class的对象(同名返回第一个)
   */
  withClass: function(classname) {
    var targets = document.getElementsByTagName("*") || targets;
    for (var k in targets) {
      var target = targets[k];
      if (target.className != "" && target.className != null && target.className != 'undefined') {
        if (target.className.indexOf(classname) > -1) {
          return target;
        }
      }
    }
    return "";
  },
  //判断c是否是小数
  check: function(c) {
    var r = /^[+-]?[1-9]?[0-9]*\.[0-9]*$/;
    return r.test(c);
  },
  //移除某个classname
  removeClassName: function(classname) {
    //获取body下所有的子元素
    var allTag = document.getElementsByTagName('*');
    for (var i = 0; i < allTag.length; i++) {
      calendar.removeArrayItem(allTag[i].classList, classname)
    };
  },
  

  //是否是假期安排的时间---（未用到）
  isSelectedDate: function(str) {
    if (calendar.indexOfArray(calendar.hVal, str) > -1) {
      return true;
    } else {
      return false;
    }
  },

  //上班---标记
  daySign: function() {
    var signdays;
    var weekdays = [];
    var weekends = [];
    if (window.XMLHttpRequest) {
      signdays = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      signdays = new window.ActiveXObject();
    } else {
      alert("请升级您的浏览器");
    }
    if (signdays != null) {
      weekdays = calendar.signObj.weekdays;
      weekends = calendar.signObj.weekends;
      //工作日
      var allTagA = document.getElementsByTagName('a');
      for (var i = 0; i < allTagA.length; i++) {
        var attrs = allTagA[i].getAttribute('date');
        if (calendar.indexOfArray(weekdays, attrs) > -1) {
          calendar.removeItemClassname(allTagA[i], 'calendar-table-rest');
          calendar.addItemClassname(allTagA[i], 'calendar-table-work');
          // allTagA[i].innerHTML += '<span class="calendar-table-holiday-sign">班</span>';
        }
        if (calendar.indexOfArray(weekends, attrs) > -1) {
          calendar.removeItemClassname(allTagA[i], 'calendar-table-work');
          calendar.addItemClassname(allTagA[i], 'calendar-table-rest');
          // allTagA[i].innerHTML += '<span class="calendar-table-holiday-sign">休</span>';
        }
      };
    }
  },
  /**
   * 判断数组中是否包含某个元素
   * @param {Array} arr
   * @param {String} str
   * @return {Number} 包含返回1，不包含返回-1
   */
  indexOfArray: function(arr, str) {
    for (var i in arr) {
      if (arr[i] == str) {
        return 1;
      }
    }
    return -1;
  },
  //从数组中移除某元素
  removeArrayItem: function(arr, val) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == val) {
        arr.splice(i, 1);
        i--;
      }
    }
  },
  /**
   * @param obj dom元素
   * 从obj对象的classname中移除某个classname
   */
  removeItemClassname: function(obj, classname) {
    var cnStr = obj.className;
    var cnArr = cnStr.split(' ');
    calendar.trimSpace(cnArr)
    for (var i = 0; i < cnArr.length; i++) {
      if (cnArr[i] == classname) {
        cnArr.splice(i, 1);
        i--;
      }
    }
    obj.className = cnArr.join(' ');
  },
  /**
   * @param {Object} 目标dom对象
   * @param {String} 要添加的classname
   */
  addItemClassname: function(obj, classname) {
    obj.className = calendar.trimString(obj.className + ' ' + classname);
  },
  /**
   * @param {String} str 去掉字符串前后的空格
   * trim()函数不兼容IE8，以下为兼容IE8版
   */
  trimString: function(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
  },
  /**
   * 去掉array中的空，null和undefined
   * @param {Array}
   * @return {Array}
   */
  trimSpace: function(array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] == " " || array[i] == null || typeof(array[i]) == "undefined") {
        array.splice(i, 1);
        i = i - 1;
      }
    }
    return array;
  },
  //设置星期六星期天的样式
  setHolidayred: function() {
    var rows = calendar.withClass('calendar-tbody').rows;
    //行遍历
    for (var i = 0; i < rows.length; i++) {
      //列遍历
      for (var j = 0; j < rows[i].cells.length; j++) {
        var cell = rows[i].cells[j];
        var cellDiv = cell.childNodes[0];
        var cellA = cellDiv.childNodes[0];
        var aDate = cellA.getAttribute('date');
        var arr = aDate.split('-');
        //判断是否是今天
        if ((arr[0] == calendar.currYear()) && (arr[1] == calendar.currMonth()) && (arr[2] == calendar.currDate())) {
          calendar.addItemClassname(cellA, 'calendar-table-today');
        }
        if (j >= rows[i].cells.length - 1 || j == 0) {
          if (cellA.getAttribute("class") != "calendar-table-other-month") {
            calendar.addItemClassname(cellA, 'calendar-table-weekend');
          }
        }
      }
    }
  },
  //更新日历下拉选项中的年和月
  updateSelect: function(year, month) {
    var selectmonth = calendar.withID("selectedMonth");
    var selectyear = calendar.withID("selectedYear");
    selectyear.innerHTML = year + '年';
    selectyear.setAttribute('data-value',year);
    selectmonth.setAttribute('data-value',month);
    if(parseInt(month, 10) < 10) {
      selectmonth.innerHTML = year + '年0' + month + '月';
    } else {
      selectmonth.innerHTML = year + '年' + month + '月';
    }
  },

  //判断选择的日期是工作日还是非工作日
  checkDateType: function(val) {
    if (calendar.dateToA(val).className.indexOf("calendar-table-weekend") > -1 && calendar.dateToA(val).className.indexOf(
        "calendar-table-selected") > -1) {
      //周末
      if (calendar.dateToA(val).className.indexOf("calendar-table-work") > -1) {
        //正常周末调休上班----选中则表示要变成休息日
        calendar.handleRestDays.push(val);
      } else {
        //正常周末放假----选中则表示要变成工作日
        calendar.handleWorkDays.push(val);
      }
    } else if (calendar.dateToA(val).className.indexOf("calendar-table-selected") > -1) {
      //工作日
      if (calendar.dateToA(val).className.indexOf("calendar-table-rest") > -1) {
        //正常放假----选中则表示要变成工作日
        calendar.handleWorkDays.push(val);
      } else {
        //正常上班----选中则表示要变成休息日
        calendar.handleRestDays.push(val);
      }
    } else {
      calendar.removeArrayItem(calendar.handleWorkDays, val)
      calendar.removeArrayItem(calendar.handleRestDays, val)
    }
  },

  // 返回操作了的日期
  returnHandleWorkData: function() {
    return calendar.removeSameItem(calendar.handleWorkDays);
  },
  returnHandleRestData: function() {
    return calendar.removeSameItem(calendar.handleRestDays);
  },
  
  // 返回今天
  
  
  //日期格式转换：例：2020-2-1转换成2020年2月1日
  dateFormat: function(val) {
    var arr = val.split("-");
    return arr[0] + '年' + arr[1] + '月' + arr[2] + '日';
  },
  //日期格式转换：例：20200201转换成2020-2-1
  dateFormat2: function(val) {
    var arr0 = val.substring(0, 4);
    var arr1 = val.substring(4, 6);
    var arr2 = val.substring(6, 8);
    return arr0 + '-' + parseInt(arr1, 10) + '-' + parseInt(arr2, 10);
  },
  /**
   * 日期数组排序
   * @param {Object} arr1
   * @param {Object} arr2
   */
  sortDateArray: function(arr) {
    for (var i in arr) {
      var arrStr = arr[i].split('-');
      if (parseInt(arrStr[1], 10) < 10) {
        arrStr[1] = '0' + arrStr[1];
      }
      if (parseInt(arrStr[2], 10) < 10) {
        arrStr[2] = '0' + arrStr[2];
      }
      arr[i] = arrStr[0] + arrStr[1] + arrStr[2]
    }
    arr.sort();
    for (var j in arr) {
      arr[j] = calendar.dateFormat2(arr[j])
    }
    return arr;
  },
  //过滤数组,去除第一个数组中和第二个数组相同的部分
  filterArray: function(arr1, arr2) {
    for (var i = 0; i < arr1.length; i++) {
      for (var j = 0; j < arr2.length; j++) {
        if (arr1[i] == arr2[j]) {
          arr1.splice(i, 1);
          i--;
        }
      }
    }
    return arr1;
  },
  // 排除数组中相同的元素
  removeSameItem: function(arr) {
    var tempA = [];
    for (var i = 0; i < arr.length; i++) {
      //判断当前数组下标为i的元素是否已经保存到临时数组 
      //如果已保存，则跳过，否则将此元素保存到临时数组中 
      if (calendar.indexOfArray(tempA, arr[i]) == -1) {
        tempA.push(arr[i]);
      }
    }
    return tempA;
  },
  
  //阻止冒泡
  stopBubble: function(event) {
    if (event && event.stopPropagation) { // 别的浏览器
      event.stopPropagation();
    } else { //IE
      var e = event || window.event;
      e.cancelBubble = true;
    }
  },
  
  /**
   * 1、将数据存储
   * 从标记的休息日中（weekends）剔除被标记为将变成工作日的（workArr）
   * 从标记的工作日中（weekdays）剔除被标记为将变成休息日的（restArr）
   * 2、隐藏弹框
   * 3、日历重新加载
   * 4、data为上一次存储的特殊标记工作日和休息日的数据
   */
  storeData: function(data) {
    var wA = calendar.returnHandleWorkData(); //工作日
    var rA = calendar.returnHandleRestData(); //休息日
    data.weekdays = calendar.filterArray(data.weekdays, rA);  // 去除arr1中与arr2相同的部分
    data.weekends = calendar.filterArray(data.weekends, wA);
    data.weekdays.push.apply(data.weekdays, wA) // 合并
    data.weekends.push.apply(data.weekends, rA)
    data.weekdays = calendar.removeSameItem(data.weekdays)  // 去重
    data.weekends = calendar.removeSameItem(data.weekends)
    calendar.updateData(data);

    var setYearValS = parseInt(calendar.withID("selectedYear").getAttribute("data-value"))
    var setMonthValS = parseInt(calendar.withID("selectedMonth").getAttribute("data-value"), 10)
    if (parseInt(setMonthValS, 10) < 10) {
      calendar.withID("selectedMonth").innerHTML = setYearValS + '年0' + setMonthValS + '月'
    } else {
      calendar.withID("selectedMonth").innerHTML = setYearValS + '年' + setMonthValS + '月'
    }
    calendar.createMonthBox(setYearValS)
    calendar.handleWorkDays = []; //工作日
    calendar.handleRestDays = []; //休息日
    calendar.selectDays = [];
    //重新加载日历
    calendar.createTabledate(setYearValS, setMonthValS);
  },
  // 更新数据
  updateData: function(data) {
    if (data) {
      calendar.signObj = data;
    }
  },
  /**
   * 初始化日历
   */
  selectDays: [],
  handleWorkDays: [], // 工作日
  handleRestDays: [], // 休息日
  // 标记当前一年的所有法定节假日及调休日
  signObj: signObjAll,
  hVal: [],
  initCalendar: function(data) {
    calendar.handleWorkDays = []; //工作日
    calendar.handleRestDays = []; //休息日
    calendar.selectDays = [];
    calendar.updateData(data)
    // 创建日历外框
    calendar.calendarContainer()
    //创建年份下拉,并给对应事件
    calendar.createSelectYear();
    //创建月份下拉，并给对应事件
    calendar.createMonthSelect(calendar.currYear());
    //获取当前选中的是哪一年哪一月
    var setYearVal = parseInt(calendar.withID("selectedYear").getAttribute("data-value"))
    var setMonthVal = parseInt(calendar.withID("selectedMonth").getAttribute("data-value"), 10)
    //根据年，月，用table绘制日历。 年月变动则 重新绘制
    calendar.createTabledate(setYearVal, setMonthVal);
    //上月下月的a标签给事件
    calendar.leftrightclick();
  }
}
// 存放当前被选中的或者今天的日期
var selectedDate = calendar.currYear() + '-' + calendar.currMonth() + '-' + calendar.currDate();
// 输入框中存放当天信息
calendar.withID('input').value = calendar.currYear() + '-' + calendar.currMonth() + '-' + calendar.currDate();
// 日期初始化
calendar.initCalendar(calendar.signObj);

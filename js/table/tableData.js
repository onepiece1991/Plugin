/**
 * @Author: Jinxx
 * @Time: 2021/06/28
 * @Description: table data js
 */
var floorMaintain = new Vue({
  el: '#floorMaintain',
  data: {
    linesNo: 10, // 每行展示的房间数
    floorList: [
      {
        floor: '地上1层',
        floorId: '1',
        name: '1层',
        propertyNo: '20',
        roomList: [
          {room: '101'},
          {room: '102'},
          {room: '103'},
          {room: '104'},
          {room: '105'},
          {room: '106'},
          {room: '107'},
          {room: '108'},
          {room: '109'},
          {room: '110'},
          {room: '111'},
          {room: '112'},
          {room: '113'},
          {room: '114'},
          {room: '115'},
          {room: '116'},
          {room: '117'},
          {room: '118'},
          {room: '119'},
          {room: '120'}
        ]
      },
      {
        floor: '地上2层',
        floorId: '2',
        name: '2层',
        propertyNo: '6',
        roomList: [
          {room: '201'},
          {room: '202'},
          {room: '203'},
          {room: '204'},
          {room: '205'}
        ]
      },
      {
        floor: '地上3层',
        floorId: '3',
        name: '3层',
        propertyNo: '11',
        roomList: [
          {room: '301'},
          {room: '302'},
          {room: '303'},
          {room: '304'},
          {room: '305'},
          {room: '306'},
          {room: '307'},
          {room: '308'},
          {room: '309'},
          {room: '310'},
          {room: '311'}
        ]
      }
    ],
    //处理后的数据-moban
    roomListResult: [
      // {
      //   floor: '地上1层',
      //   floorId: 1, // 第几条数据：第1条数据
      //   lineId: 1,  // 第几行：第1行
      //   name: '1层',
      //   propertyNo: '20',
      //   roomList: [
      //     // {room: '101'},
      //     // {room: '102'},
      //     // {room: '103'},
      //     // {room: '104'},
      //     // {room: '105'},
      //     // {room: '106'},
      //     // {room: '107'},
      //     // {room: '108'},
      //     // {room: '109'},
      //     // {room: '110'}
      //   ]
      // },
      // {
      //   floor: '',
      //   floorId: 1, // 第几条数据：第1条数据
      //   lineId: 2,  // 第几行：第2行
      //   name: '',
      //   propertyNo: '',
      //   roomList: [
      //     {room: '111'},
      //     {room: '112'},
      //     {room: '113'},
      //     {room: '114'},
      //     {room: '115'},
      //     {room: '116'},
      //     {room: '117'},
      //     {room: '118'},
      //     {room: '119'},
      //     {room: '120'}
      //   ]
      // },
      // {
      //   floor: '地上2层',
      //   floorId: 2, // 第几条数据：第2条数据
      //   lineId: 1,  // 第几行：第1行
      //   name: '2层',
      //   propertyNo: '6',
      //   roomList: [
      //     {room: '201'},
      //     {room: '202'},
      //     {room: '203'},
      //     {room: '204'},
      //     {room: '205'},
      //     {room: ''},
      //     {room: ''},
      //     {room: ''},
      //     {room: ''},
      //     {room: ''}
      //   ]
      // },
      // {
      //   floor: '地上3层',
      //   floorId: 3, // 第几条数据：第3条数据
      //   lineId: 1,  // 第几行：第1行
      //   name: '1层',
      //   propertyNo: '11',
      //   roomList: [
      //     {room: '301'},
      //     {room: '302'},
      //     {room: '303'},
      //     {room: '304'},
      //     {room: '305'},
      //     {room: '306'},
      //     {room: '307'},
      //     {room: '308'},
      //     {room: '309'},
      //     {room: '310'}
      //   ]
      // },
      // {
      //   floor: '',
      //   floorId: 3, // 第几条数据：第3条数据
      //   lineId: 2,  // 第几行：第2行
      //   name: '',
      //   propertyNo: '',
      //   roomList: [
      //     {room: '311'},
      //     {room: ''},
      //     {room: ''},
      //     {room: ''},
      //     {room: ''},
      //     {room: ''},
      //     {room: ''},
      //     {room: ''},
      //     {room: ''},
      //     {room: ''}
      //   ]
      // },
    ],
    inputEditVal: '', //输入框的值
    startEdit: false, // 是否显示可输入框
    currentLine: -1, // 当前行
    currentCol: -1, // 当前列
  　currentStr: '' // 当前是别称name还是物业数propertyNo
    // // 最终数据
    // resultDataList: []
  },
  mounted() {
    this.initResultData()
  },
  methods: {
    // 格式化数据
    initResultData() {
      let linesNo = this.linesNo // 每行展示多少房间数
      let resultDataList = []
      for(let i in this.floorList) {
        let thisFloorData = this.floorList[i] // 当前楼层的数据
        let floor = thisFloorData.floor // 当前楼层
        let floorId = thisFloorData.floorId // 第几条数据
        // let lineId = thisFloorData.lineId // 第几行
        let name = thisFloorData.name // 当前楼层的别称
        let roomList = thisFloorData.roomList // 当前楼层的房间数组
        let propertyNo = roomList.length // 当前楼层的房间数量
        let lines = Math.ceil(propertyNo/linesNo) // 当前楼层要展示多少行
        // 当前楼层的房间数量为0时需要展示一行
        if(propertyNo == 0) {
          lines = 1
        }
        // 遍历行数
        for(let line = 1; line <= lines; line++) {
          // 每一行显示的数据
          let floorLineData = {
            floor: '',  // 楼层
            floorId: floorId, // 第几条数据
            lineId: line, // 第几行
            name: '', // 别称
            propertyNo: '', // 物业数
            roomList: [] // 存放房间的数组
          }
          // 第一行
          if(line == 1) {
            floorLineData.floor = floor
            floorLineData.name = name
            floorLineData.propertyNo = propertyNo
          }
          // 遍历房间
          // 每一行显示的房间 = 每行显示的数量*（当前行-1）；小于每行显示的数量*行数
          for(let j = linesNo*(line-1); j < linesNo*line; j++) {
            if(propertyNo > j) {
              floorLineData.roomList.push(roomList[j])
            } else {
              floorLineData.roomList.push({room: ''})
            }
          }
          resultDataList.push(floorLineData)
        }
        this.roomListResult = resultDataList
      }

    },
    deleteData(i, j){
      let dataRowS = this.roomListResult[i].floorId // 第几条数据
      let lineS = this.roomListResult[i].lineId // 第几行
      let indexS = this.linesNo*(lineS-1) + j
      this.floorList[dataRowS-1].roomList.splice(indexS,1)
      this.checkLinesNo()
    },
    // 判断房间号被删除后所有层的房间数是否都小于最开始每行展示的房间数linesNo
    checkLinesNo() {
      let roomLengthArr = []
      let num = 0
      for(let i in this.floorList) {
        roomLengthArr[i] = this.floorList[i].roomList.length
        if(this.floorList[i].roomList.length < this.linesNo) {
          num++
        }
      }
      if(num == 3) {
        roomLengthArr.sort(function(a,b){
          return b-a;  //降序排列，return a-b; —>升序排列
        })
        this.linesNo = roomLengthArr[0]
      }
    },
    // 鼠标移上td显示可编辑图标
    mouseenterFn(i,j, str) {
      this.currentLine = i
      this.currentCol = j
      this.currentStr = str
    },
    // 鼠标从td移走隐藏可编辑图标
    mouseleaveFn() {
      this.currentLine = -1
      this.currentCol = -1
      this.currentStr = ''
      this.startEdit = false
    },
    // 点了图标-编辑
    editFn(val){
      this.startEdit = true
      this.inputEditVal = val
    },
    // 点了图标-勾
    confirmFn(i,j, strF) {
      this.startEdit = false
      this.roomListResult[i].roomList[j][`${strF}`] = this.inputEditVal
    },
    // 点了图标-删除
    deleteFn(i, j) {
      this.deleteData(i,j)
      this.initResultData()
    },
    // 是否显示编缉图标
    editFlag(i,j, strF) {
      if(!this.startEdit && this.currentLine == i && this.currentCol == j &&　this.currentStr == strF) {
        return true
      } else {
        return false
      }
    },
    // 是否显示输入框
    inputFlag(i,j, strF) {
      if(this.startEdit && this.currentLine == i && this.currentCol == j &&　this.currentStr == strF) {
        return true
      } else {
        return false
      }
    }
  }
})
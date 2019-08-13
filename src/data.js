export default {
  rowHeader: [{
    name: "服装",
    prop: "category",
    children: [{
      name: "裤子",
      prop: "sub_category",
      children: [{
        name: "2,017",
        prop: "yearku2017",
        children: []
      }, {
        name: "2,018",
        prop: "yearku2018",
        children: []
      }, {
        name: "Total",
        prop: "yeartotal",
        children: []
      }],
    }, {
      name: "鞋子",
      prop: "sub_category",
      children: [{
        name: "2,017",
        prop: "year",
        children: []
      }, {
        name: "2,018",
        prop: "year",
        children: []
      }, {
        name: "Total",
        prop: "year",
        children: []
      }]
    }, {
      name: "Total",
      prop: "sub_category",
      children: []
    }]
  }],
  columnHeader:   [
    {
      name: "日期",
      prop: "date"
    },
    {
      name: "配送信息",
      prop: "info",
      children: [
        {
          name: "姓名",
          prop: "name"
        },
        {
          name: "地址",
          prop: "nx",
          children: [
            {
              name: "省份",
              prop: "province"
            },
            {
              name: "城市",
              prop: "address"
            },
            {
              name: "邮编",
              prop: "zip"
            }
          ]
        }
      ]
    }
  ],
  data: [{
    date: '2016-05-02',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  }, {
    date: '2016-05-02',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  }, {
    date: '2016-05-02',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  }, {
    date: '2016-05-02',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  }, {
    date: '2016-05-02',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  }, {
    date: '2016-05-02',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  }, {
    date: '2016-05-02',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  }]
};
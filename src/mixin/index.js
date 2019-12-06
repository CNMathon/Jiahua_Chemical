const mixin = {
  data() {
    return {};
  },
  methods: {
    pageBack() {
      this.$router.back(-1);
    },
    notify() {
      this.$notify("请正确填写工作票内容");
    },
    Next() {
      this.isDataEmpty_throw({
        data: [
          
        ],
      })
      let sendData = this.sendData;
      for (const key in sendData) {
        if (sendData.hasOwnProperty(key)) {
          const element = sendData[key];
          if (typeof element === "string" && element === "") {
            this.notify();
            return;
          }
          if (typeof element === "object" && element === null) {
            this.notify();
            return;
          }
          if (typeof element === "object" && element.length < 1) {
            this.notify();
            return;
          }
        }
      }
      this.postData();
    },
    stringData(key, list) {
      let sendData = JSON.parse(JSON.stringify(this.sendData));
      let arr = [];
      sendData[key].forEach(element => {
        let index = this[list].indexOf(element);
        if (index !== -1) {
          arr.push(index + 1);
        }
      });
      return arr.join(",");
    },
    userString(arr, key) {
      let newArr = arr.map(item => {
        return item[key];
      });
      return newArr.join(",");
    },
    reductionSelectTag(data, list) {
      let newArr = [];
      let arr = data.split(",");
      arr.forEach(element => {
        newArr.push(list[element - 1]);
      });
      return newArr;
    },
    reductionSelectUser(data) {
      let newArr = [];
      let arr = data.split(",");
      arr.forEach(element => {
        let obj = {};
        obj.userName = element;
        newArr.push(obj);
      });
      return newArr;
    },
    // 作业票状态
    htStatus(status) {
      const statusList = ['编辑', '初审', '有效', '已验票', '已终结',]
      return statusList[Number(status) - 1]
    },
    // 判断数据群是否为空
    isDataEmpty() {
      for (const key in arguments) {
        let value = arguments[key]
        // 判断条件
        let condition = (
          value == "" ||
          value == null ||
          value == undefined ||
          JSON.stringify(value) === '{}' ||
          JSON.stringify(value) === '[]' ||
          value == String ||
          value == Number ||
          value == Boolean ||
          value == Object ||
          value == Function ||
          value == Date ||
          value == Array ||
          value == Symbol
        )
        if (condition) {
          return true
        }
      }
      return false
    },
    // 判断数据群是否为空 => 1. 直接抛出，不用判断
    //                  => 2. 面向对象
    // 参数1 => config => 判断配置 => Object
    // => 参数1 => data => Array => 判断数据组
    // => 参数2 => err => Callback => 错误处理
    // => 参数3 => success => Callback => 成功处理
    // => 参数4 => finnal => Callback => 完成处理
    isDataEmpty_throw(config) {
      let configObj = {
        data: [],
        success: () => { },
        err: () => { },
        final: () => { }
      }
      for (const key in config) {
        let configValue = config[key]
        if (configValue != undefined) {
          configObj[key] = configValue
        }
      }
      console.log(configObj)
      for (const key in configObj.data) {
        let value = configObj.data[key]
        // 判断条件
        let condition = (
          value == "" ||
          value == null ||
          value == undefined ||
          JSON.stringify(value) === '{}' ||
          JSON.stringify(value) === '[]' ||
          value == String ||
          value == Number ||
          value == Boolean ||
          value == Object ||
          value == Function ||
          value == Date ||
          value == Array ||
          value == Symbol
        )
        if (condition) {
          configObj.err()
          throw ('The data input is empty!')
        }
        else {
          configObj.success()
        }
      }
      configObj.final()
      return
    },
    // 深拷贝
    deepCopy(content) {
      return JSON.parse(JSON.stringify(content))
    },
    // 小数转化为百分数
    // => num => 传入数值 => Number => 必填
    // => dec => 保留小数位数 => Number => 选填（默认为1）
    toPercent(num, dec = 1) {
      let res = Number(num * 100).toFixed(dec)
      res += '%'
      return res
    },
    toPoint( per ) {
      let res = per.replace("%", "");
      res = res / 100;
      return res;
    },
    // 路由跳转
    // 参数1 => url => 跳转路径 => String
    // 参数2 => query => 路由传参 => Object
    jumpTo(path, query = {}) {
      this.$router.push({
        path: path,
        query: query
      })
    },
  }
};

export default mixin
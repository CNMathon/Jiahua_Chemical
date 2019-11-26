export const business = {
  data() {
    return {};
  },
  methods: {
    pageBack() {
      this.$router.back();
    },
    notify() {
      this.$notify("请正确填写工作票内容");
    },
    Next() {
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
//     avatarUrl: "http://47.96.148.87:8980/js/static/images/user1.jpg"
// fullName: "新材料厂"
// userCode: "XCLCDD001"
// userName: "新材料调度甲班"

    reductionSelectUserObj (data) {
      let newArr = [];
      let userOBj = (item) => {
        let obj = {
          avatarUrl: item.avatarUrl || '',
          fullName: item.fullName || '',
          userCode: item.userCode,
          userName: item.userName,
        };
        return obj;
      }
      // 判断是传入的 obj还是 Array
       if (Array.isArray(data)) {
        let arr = data;
        arr.forEach(element => {
          newArr.push(userOBj(element));
        });
       } else {
        newArr = [userOBj(data)];
       }
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
      const statusList = ['编辑','初审','有效','已验票','已终结',]
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
    // 深拷贝
    deepCopy(content) {
      return JSON.parse(JSON.stringify(content))
    },
    // 小数转化为百分数
    // => num => 传入数值 => Number => 必填
    // => dec => 保留小数位数 => Number => 选填（默认为1）
    toPercent(num, dec = 1) {
      let res = Number(num*100).toFixed(dec)
      res += '%'
      return res
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

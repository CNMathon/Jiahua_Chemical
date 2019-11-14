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
        console.log(value)
        if (value == "" || value == null || value == undefined || JSON.stringify(value) === '{}' || JSON.stringify(value) === '[]') {
          return true
        }
      }
      return false
    }
  }
};

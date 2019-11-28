import SparkMD5 from "spark-md5";
export const uploadFile = {
  data() {
    return {
      fileList: []
    };
  },
  methods: {
    // 返回布尔值
    beforeRead(file) {
      console.log(`begin => beforeRead`)
      let imageRegex = /^image\/(jpeg|jpg|png)/;
      if (!imageRegex.test(file.type)) {
        alert("图片类型必须是jpeg,jpg,png中的一种");
        return false;
      }
      const formdata = new FormData();
      formdata.append("uploadType", "image");
      // 上传文件
      this.uploadFile(formdata, file);
    },
    // 获得文件md5
    getFileMD5(file, callback) {
      //声明必要的变量
      var fileReader = new FileReader(),
        //文件每块分割2M，计算分割详情
        chunkSize = 10485760,
        chunks = Math.ceil(file.size / chunkSize),
        currentChunk = 0,
        //创建md5对象（基于SparkMD5）
        spark = new SparkMD5();

      //每块文件读取完毕之后的处理
      fileReader.onload = function(e) {
        //每块交由sparkMD5进行计算
        spark.appendBinary(e.target.result);
        currentChunk++;

        //如果文件处理完成计算MD5，如果还有分片继续处理
        if (currentChunk < chunks) {
          // loadNext();
          callback(spark.end());
        } else {
          callback(spark.end());
        }
      };

      //处理单片文件的上传
      function loadNext() {
        var start = currentChunk * chunkSize,
          end = start + chunkSize >= file.size ? file.size : start + chunkSize;

        fileReader.readAsBinaryString(file.slice(start, end));
      }
      loadNext();
    },
    // 上传文件
    uploadFile(formdata, file) {
      formdata.append("file", file);
      formdata.append("fileName", file.name);
      formdata.append("__sid", this.$userInfo.sessionId);
      // 得到md5码
      this.getFileMD5(file, md5 => {
        // 添加文件md5码
        formdata.append("fileMd5", md5);
        this.$api.common
          .uploadFile(formdata)
          .then(res => {
            if (res.result === "true") {
              this.$Toast.success({
                message: "上传成功"
              });
              this.uploadFileSuccess(res);
            } else {
              this.$Toast.fail({
                message: "上传失败"
              });
            }
          })
          .catch(() => {
            this.$Toast.fail({
              message: "上传失败"
            });
          });
      });
    },
    // 文件上传成功
    uploadFileSuccess(res) {
      let urls = this.$imageUrl + res.fileUpload.fileUrl;
      let obj = {
        index: this.fileList.length,
        id: res.fileUpload.id,
        url: urls,
        fileUrl: res.fileUpload.fileUrl
      };
      this.fileList.push(obj);
      console.log(5555)
      console.log(this.fileList)
    },
    // 删除文件
    beforeDelete(e) {
      let _fileList = this.fileList.filter(item => {
        return !Object.is(e, item);
      });
      this.fileList = _fileList;
    }
  }
};

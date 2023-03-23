<template>
  <div class="template-container">
    <div style="width: 100%; height:  76vh;">
      <Form :label-width="100">
                <Form-item label="模型 :" >
                  <select style="width:200px;height: 30px;margin-top: 5px;margin-bottom: 5px;margin-left: 10px">
                    <option v-for="item in kindList" :key="item.id" selected>{{item.name}}</option>
                  </select>
                </Form-item>
                <Form-item label="信噪比(dB) : ">
                  <!-- /0 4 8 12 -->
                  <select style="width:200px;height: 30px;margin-top: 5px;margin-bottom: 5px;margin-left: 10px">
                    <option v-for="item in dB" :key="item.id" selected>{{item.name}}</option>
                  </select>
                </Form-item>
                <Form-item label="去多径 :">
                  <!-- 是/否 -->
                  <select style="width:200px;height: 30px;margin-top: 5px;margin-bottom: 5px;margin-left: 10px">
                    <option v-for="item in duojing" :key="item.id" selected>{{item.name}}</option>
                  </select>
                </Form-item>
      </Form>
      <!-- action="https://jsonplaceholder.typicode.com/posts/" -->
      <!-- <el-upload
        class="upload-demo"
        action=""
        accept=".csv,.doc,.docx"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :before-upload="beforeUploadFn"
        :auto-upload="false"
        multiple
        :limit="5"
        :on-exceed="handleExceed"
        :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传csv,doc,docx文件</div>
      </el-upload> -->
      <el-upload
        class="upload-demo"
        ref="upload"
        action="https://jsonplaceholder.typicode.com/posts/"    
        :limit="5"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="onSuccess"
        :on-exceed="handleExceed"
        :file-list="fileList"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传csv文件</div>
      </el-upload>
      <el-table
      :data="tableData"
      :row-class-name="tableRowClassName"
      @row-click="handdle"
      style="width: 100%">
          <el-table-column
            prop="filename"
            label="文件名"
            width="160">
          </el-table-column>
          <el-table-column
            prop="tick"
            label="是否扫描"
            width="160">
          </el-table-column>
    </el-table>
  </div>
    </div>
</template>

<script>
export default {

  data() {
    return {
      kindList:[{name:"CNN",id:1},{name:"RESNET",id:2},{name:"DRSN",id:3}],
      fileList: [],
      dB:[{name:0,id:1},{name:4,id:2},{name:8,id:3},{name:12,id:4}],
      duojing:[{name:'是',id:1},{name:'否',id:2}],
      tableData: [],
      curRow:-1
    };
  },
  watch: {

   
  },
  methods: {
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
       // 文件上传之前的限制
      // beforeUploadFn(file) {
      // // const isJPG = file.type === 'csv./jpeg';
      // console.log(90, file);
      // // const isSize = file.size / 1024 / 1024 > ;
      // // console.log(92, isSize);
      // return true;
      // if (!isSize) {
      //   this.$message.error("文件大小不能超过20M！");
      //   return false;
      // }
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      onSuccess(response, file, fileList){
        console.log("hello",fileList)
        // for(var i=0;i<fileList.length;i++)
        // {
        //   var a={filename:fileList[i].name,tick:"否"}
        //   this.tableData.push(a)
        // }
        this.tableData.push({filename:file.name,tick:"否"})
      },
      handdle(row,event,column){
        console.log(row, event, column)
        this.curRow=row.rowIndex
      },
      tableRowClassName({row, rowIndex}){
        console.log("what's problem")
        console.log(row,rowIndex)
        row.index=rowIndex
        console.log("当前行",this.curRow)
        // console.log()
        if(rowIndex===this.curRow)
        {
          return 'success-row';
        }
      }
    },

    mounted() {}
};
</script>

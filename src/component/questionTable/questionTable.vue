<template>
  <div style="position: relative">
    <el-table :data="paperData" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="name" label="问卷" width="180"></el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template slot-scope="scope" >
          <el-tag :type="renderStatusTag(scope.row.status)" disable-transitions>{{scope.row.status | changeStatusTag }}</el-tag>
        </template>
      </el-table-column>
      <tableBtn :btnType="tableType"  @getQRcode="bindQRCode"></tableBtn>
    </el-table>
    <el-dialog
            title="生成的二维码"
            :visible.sync="dialogVisible"
            width="30%"
            >
      <div id="qrCode" ref="qrCodeDiv" class="QRcode"></div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false" class="QRcodeBtn">确 定</el-button>
       </span>
    </el-dialog>

  </div>
</template>

<script>
import ajaxAllPaperObj from "../../api/questionPaper";
import tableBtn from "../../component/questionTable/tableBtn";
import QRCode from 'qrcodejs2';
export default {
  name: "questionTable",
  components: {
      tableBtn
  },
  props: {
      tableType:String,
      paperData:Array,
  },
  data() {
    return {
        dialogVisible:false
    };
  },
  methods: {
    renderStatusTag(status) {
      let result;
      switch (status) {
        case 0:
          result = "success";
          break;
        case 1:
          result = "primary";
          break;
        case 2:
          result = "danger";
          break;
        default:
          break;
      }
      return result;
    },

    bindQRCode (data) {
        this.dialogVisible = true
        this.$nextTick(() => {
        this.$refs.qrCodeDiv.innerHTML = ''
        var url = 'http://182.61.26.241:18080/dist/'+data.href
        new QRCode(this.$refs.qrCodeDiv, {
            text: url,
            width: 200,
            height: 200,
            colorDark: "#333333", //二维码颜色
            colorLight: "#ffffff", //二维码背景色
            correctLevel: QRCode.CorrectLevel.L//容错率，L/M/H
        })
    })
    }
  },
  filters: {
   changeStatusTag: function(val) {
      var result;
      switch (val) {
        case 0:
          result = "发布";
          break;
        case 1:
          result = "未发布";
          break;
        case 2:
          result = "删除";
          break;
        default:
          break;
      }
      return result;
    }
  },

};
</script>

<style scoped lang="scss">
  .QRcode{
    position: relative;
    left: 50%;
    margin-left: -100px;
  }
  .QRcodeBtn{
    position: relative;
    left:-50%;
    transform: translateX(50%);
  }
</style>

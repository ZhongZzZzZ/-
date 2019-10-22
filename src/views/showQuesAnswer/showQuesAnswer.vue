<!--  -->
<template>
  <div style="width:100%">
      <h1 class="title">查看{{title}}问卷的答卷</h1>

      <el-table :data="ansTable" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="50"></el-table-column>
        <el-table-column prop="ipAddr" label="用户IP" width="180"></el-table-column>
        <el-table-column prop="createTime" label="提交时间" width="180"></el-table-column>
        <el-table-column prop="useTime" label="答题用时/s" width="90"></el-table-column>
        <el-table-column prop="userCode" label="用户Code" width="180"></el-table-column>
        <el-table-column prop="sourceDetail" label="来源设备" ></el-table-column>
        <el-table-column prop="status" label="操作">
            <template slot-scope="scope">
          <el-button type="primary" plain size="mini" @click="handleView(scope.$index, scope.row)">查看详情</el-button>
          <el-button type="danger" plain size="mini" @click="handleDdelete(scope.$index, scope.row)">删除</el-button>
        </template>
        </el-table-column>
      </el-table>
      <el-button type="danger" @click="handleAllDdelete" class="delBtn">删除所有答卷</el-button>
      <pagination :total="total" :page.sync="pageQuery.pageNo" @getNewQues="getNewQues"></pagination>
        <el-dialog title="答卷详情" :visible.sync="dialogTableVisible">
            <p v-for="(item, index) in answerDetail" :key="index">第{{index+1}}题 --- {{item.answers}}</p>
        </el-dialog>
  </div>
</template>

<script>
import ajaxPaperAnswerObj from '../../api/paperAnswer'
import pagination from '../../component/pagination/pagination'
export default {
  name:'showQuesAnswer',
  data () {
    return {
        pageQuery: {
            pageNo:1,
            pageSize:20,
            paperCode:''
        },
        total:1,
        ansTable:[],
        title:'',
        answerDetail:[],//答卷详情
        dialogTableVisible:false//控制单个用户选项弹框
    };
  },
  components: {
    pagination
  },
  computed: {
    pagesSize() {
      //当前页面条数
      return this.ansTable.length;
    }
  },
  methods: {
      getPaperAnswer() {
        ajaxPaperAnswerObj.queryPaperAnswer(this.pageQuery).then((result) => {
                this.ansTable = result.data.results
                this.total = result.data.total
                console.log(result)
            }).catch((err) => {
                console.log(err);
            });
      },
      deleteSinglePaperAnswer(id){
        ajaxPaperAnswerObj.deleteSingleAnswerPaper(id).then((result) => {
          if(result.code === 0) {
            this.$notify({
            title: '成功',
            message: '删除答卷成功',
            type: 'success'
          });
          if(this.pagesSize-1 === 0 && this.pageQuery.pageNo >1 )
            this.pageQuery.pageNo -= 1
            return ajaxPaperAnswerObj.queryPaperAnswer(this.pageQuery)
          }
        }).then((result) => {
                this.ansTable = result.data.results
                this.total = result.data.total
            })
        .catch((err) => {
          console.log(err);
        });
      },
      handleView(index,row) {
        this.dialogTableVisible = true
        this.answerDetail = JSON.parse(row.ansJson).data
      },
      handleDdelete(index,row) {
        this.deleteSinglePaperAnswer(row.id)
      },
      handleAllDdelete(){
        ajaxPaperAnswerObj.deleteAllAnswerPaper(this.$route.params.paperCode).then((result) => {
          if(result.code === 0) {
            this.$notify({
            title: '成功',
            message: '删除所有答卷成功',
            type: 'success'
          });

            this.pageQuery= {
            pageNo:1,
            pageSize:20,
            paperCode:''
        }
            return ajaxPaperAnswerObj.queryPaperAnswer(this.pageQuery)
          }
        }).then((result) => {
                this.ansTable = result.data.results
                this.total = result.data.total
            })
        .catch((err) => {
          console.log(err);
        });
      },
      getNewQues() {
        this.getPaperAnswer()
      }
  },
  created() {
      this.pageQuery.paperCode = this.$route.params.paperCode
      this.title = this.$route.params.title
      this.getPaperAnswer()
  },
}

</script>
<style lang='scss' scoped>
    .title{
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        width: 35%;
        font-size: 30px;
        margin-bottom: 25px;
        color:#409EFF;
    }
    .delBtn{
        margin:15px 0 0 15px;
    }
</style>

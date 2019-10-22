<template>
  <el-table-column label="操作">
    <template slot-scope="scope" v-if="btnType === 'myQues'">
      <el-button size="mini" @click="handleView(scope.$index, scope.row)">查看问卷</el-button>
      <el-button size="mini" @click="handleViewAnswer(scope.$index, scope.row)">查看答卷</el-button>
      <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
      <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
    </template>
    <template slot-scope="scope" v-else>
      <el-button size="mini" @click="handleView(scope.$index, scope.row)">查看</el-button>
      <el-button size="mini" @click="handleRevert(scope.$index, scope.row)">还原</el-button>
    </template>
  </el-table-column>
</template>

<script>
import ajaxAllPaperObj from "../../api/questionPaper";
import Bus from "@/utils/eventBus";
export default {
  name:'tableBtn',
  props: {
      btnType:String
  },
  data() {
    return {};
  },

  components: {},

  computed: {},

  methods: {
    handleView(index, row) {
      //点击查看
      //this.$router.push({name:"showQues",params: {paperCode:row.code}})
      const routerData = this.$router.resolve({
        name:'showQues',
        params: {paperCode:row.code,status:row.status}
      })
      window.open(routerData.href,'_blank')
        console.log(row.status)
    },
    handleViewAnswer(index, row) {
      //点击查看答卷

      this.$router.push({name:"showQuesAnswer",params: {paperCode:row.code,title:row.name}})
    },
    handleDelete(index, row) {
      //点击删除
      Bus.$emit('handleDeletePaper',row.code)
        console.log(row.code)
     /*  ajaxAllPaperObj
        .deletePaper(row.code)
        .then(result => {

          this.$notify({
            title: '成功',
            message: '删除问卷成功',
            type: 'success'
          });
          return ajaxAllPaperObj.queryAllPaper({pageNo:1,pageSize:1})
        })
        .then(result => {
          this.$emit('updatePaperTable',result.data.results,result.data.total)
          ;
        })
        .catch(err => {
          console.log(err);
        }); */
    },
    handleRevert(index,row) {//点击还原
        console.log(index,row);
    },
        handleEdit(index,row) {//点击编辑
        this.$router.push({name:"editQues",params: {paperCode:row.code,id:row.id}})
    },
  }
};
</script>
<style lang='scss' scoped>
</style>

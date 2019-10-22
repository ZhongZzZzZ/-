<template>
    <div style="width:100%;position: relative;">
        <questionTable tableType="myQues" :paperData="allPaper"></questionTable>
        <pagination :total="total" :page.sync="pageQuery.pageNo" @getNewQues="getNewQues"></pagination>
    </div>
</template>

<script>
import questionTable from '../../component/questionTable/questionTable'
import allPaperObj from "../../api/questionPaper";
import pagination from '../../component/pagination/pagination'
import Bus from "@/utils/eventBus";
export default {
  name:'myQuestionnaire',
  data () {
    return {
        allPaper:[],
        total:1,
        pageQuery:{
            pageNo: 1,
            pageSize: 20
        }
    };
  },
  computed: {
    pagesSize() {
      //当前页面条数
      return this.allPaper.length;
    }
  },
  methods: {
    getAllPaper() {
      //获取当前未删除的问卷
      allPaperObj.queryAllPaper(this.pageQuery)
        .then(result => {
          this.allPaper = result.data.results;
          this.total = result.data.total
            console.log(result)
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleDeletePaper(code) {
      //点击删除问卷
         allPaperObj
        .deletePaper(code)
        .then(result => {
          if(result.code === 0) {
            this.$notify({
            title: '成功',
            message: '删除问卷成功',
            type: 'success'
          });
          if(this.pagesSize-1 === 0 && this.pageQuery.pageNo >1 )
            this.pageQuery.pageNo -= 1
            return allPaperObj.queryAllPaper(this.pageQuery)
          }
        })
        .then(result => {

          this.allPaper = result.data.results
          this.total = result.data.total

        })
        .catch(err => {
          console.log(err);
        });
    },
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
    getNewQues:function () {
        this.getAllPaper()
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
    },

    },
    components: {
        questionTable,
        pagination
    },
    created() {
      Bus.$on('handleDeletePaper',this.handleDeletePaper)
    },
    activated(){
      this.getAllPaper()
    },
    beforeDestroy(){
      Bus.$off('handleDeletePaper',this.handleDeletePaper)
    }

}

</script>
<style lang='scss' scoped>
</style>

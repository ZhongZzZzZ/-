<template>
  <div class="showQues">
       <questionList :questionList="questionData" class="quesList"></questionList>
      <el-button type="primary" class="quesBtn" @click="addAnswer" :disabled="this.status === '1'?true:false">提交</el-button>
  </div>
</template>

<script>
import questionList from "../../component/questionList/questionList";
import ajaxAllPaperObj from "../../api/questionPaper";
import ajaxPaperAnswerObj from "./../../api/paperAnswer";
export default {
  name:"showQues",
  data () {
    return {
      questionData:'',
      openTime:new Date().getTime(),//用户打开问卷的此刻
      status:undefined
    };
  },
  components: {
      questionList
  },
  computed: {},
  methods: {
    getAnsJson() {
      const arr = [],questionData = this.questionData.data
      for (let i =0;i < questionData.length; i++) {
        const obj = {}
        if(questionData[i].type === 'danxuan' || questionData[i].type === 'tiankong') {
          obj.answers = questionData[i].oneAnswer
        } else {
          obj.answers = questionData[i].checkboxAnswer.join(',')
        }
        obj.seq = questionData[i].seq
        arr.push(obj)
      }
      const ansJson = {
        data:arr,
        title: this.questionData.title
      }
      return ansJson
    },
    addAnswer() {
      const paperAnswerDto = {
        ansJson:this.getAnsJson(),
        paperCode:this.$route.params.paperCode,
        userCode:'',
        useTime: Math.floor((new Date().getTime() - this.openTime)/10)/100
      }
      ajaxPaperAnswerObj.postAddAnswer(paperAnswerDto).then((result) => {

        this.openTime = new Date().getTime()
        this.$notify({
          title: '成功',
          message: '成功提交',
          type: 'success'
        });
        this.$router.replace({path:'/answerSuccess'})
      }).catch((err) => {
        console.log(err);
      });

    },
    getSinglePaper(params) {
        ajaxAllPaperObj.querySinglePaper(params).then((result) => {
      this.questionData = JSON.parse(result.data.pageJson);
    }).catch((err) => {
      console.log(err);
    });
    }
  },
  created(){
      this.getSinglePaper({paperCode:this.$route.params.paperCode})
      this.status = this.$route.params.status
  },
}

</script>
<style lang='scss' scoped>
    .showQues{
        position: relative;
    }
    .quesBtn{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        margin-bottom: 15px;
        width: 25%;
    }
    .quesList{
        position: relative;
        left:0;
    }
    @media screen and (max-width:760px){
        .quesBtn{
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            margin-bottom: 15px;
            width: 90%;
        }
    }
</style>

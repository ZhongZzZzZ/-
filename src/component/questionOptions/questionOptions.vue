<template>
        <div class="quesContainer">
            <h1 class="title">{{operation === 'edit' ? '修改' : '创建'}}问卷</h1>
           <el-form :label-position="labelPosition" label-width="80px" >
                   <el-form-item label="问卷标题" class="quesTitle" >
                       <el-input v-model="quesList.title" placeholder="请输入标题" ></el-input>
                   </el-form-item>
                   <el-form-item label="问卷说明" class="quesTitle" >
                       <el-input v-model="quesList.instructions" placeholder="请输入说明" ></el-input>
                   </el-form-item>
                   <el-form-item label="问卷状态" class="quesTitle" >
                        <el-radio-group v-model="quesObj.status">
                            <el-radio :label="0">发布</el-radio>
                            <el-radio :label="1">未发布</el-radio>
                            <el-radio :label="2">删除</el-radio>
                        </el-radio-group>
                   </el-form-item>
                    <el-form-item>
                        <el-button type="primary"  @click="addRadio('danxuan')">单选题</el-button>
                        <el-button type="primary"  @click="addCheckbox('duoxuan')">多选题</el-button>
                        <el-button type="primary"  @click="addTextarea('tiankong')">填空题</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success"  @click="addPaper" >提交</el-button>
                    </el-form-item>
                    <el-form-item>
                        <questionList :questionList="quesList" :isCreate="isCreate" class="quesList"></questionList>
                    </el-form-item>
           </el-form>
            <!--单选题弹框-->
            <el-dialog title="添加单选题" :visible.sync="radioVisible" width="650px">
                <el-form label-width="80px">
                    <el-form-item label="题目">
                        <el-input v-model="addRadioForm.question"></el-input>
                    </el-form-item>
                    <el-form-item label="选项">
                        <div v-for="(item,index) in addRadioForm.options" :key="index">
                            <el-row>
                                <el-col :span="18">
                                    <el-input  placeholder="请输入内容" v-model="addRadioForm.options[index]" ></el-input>
                                </el-col>
                                    <el-button type="success" @click="addRadioItem(index)" icon="el-icon-plus" size="small"></el-button>
                                    <el-button type="danger" @click="delRadioItem(index)" icon="el-icon-minus" size="small"></el-button>
                            </el-row>
                        </div>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                 <el-button @click="calAdd">取 消</el-button>
                 <el-button type="primary" @click="addRadioList(addRadioForm)">确 定</el-button>
                </span>
            </el-dialog>
            <!--多选题弹框-->
            <el-dialog title="添加多选题" :visible.sync="checkboxVisible" width="650px">
                <el-form label-width="80px">
                    <el-form-item label="题目">
                        <el-input v-model="addCheckboxForm.question"></el-input>
                    </el-form-item>
                    <el-form-item label="选项">
                        <div v-for="(item,index) in addCheckboxForm.options" :key="index">
                            <el-row>
                                <el-col :span="18">
                                    <el-input  placeholder="请输入内容" v-model="addCheckboxForm.options[index]" ></el-input>
                                </el-col>
                                <el-button type="success" @click="addCheckboxItem(index)" icon="el-icon-plus" size="small"></el-button>
                                <el-button type="danger" @click="delCheckboxItem(index)" icon="el-icon-minus" size="small"></el-button>
                            </el-row>
                        </div>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                 <el-button @click="calAdd">取 消</el-button>
                 <el-button type="primary" @click="addCheckboxList(addCheckboxForm)">确 定</el-button>
                </span>
             </el-dialog>
            <!--填空题弹框-->
            <el-dialog title="添加填空题" :visible.sync="textareaVisible" width="650px">
                <el-form label-width="80px">
                    <el-form-item label="题目">
                        <el-input v-model="addTextareaForm.question"></el-input>
                    </el-form-item>
                    <el-form-item label="选项">
                        <div v-for="(item,index) in addTextareaForm.options" :key="index">
                            <el-row>
                                <el-col :span="24">
                                    <el-input  placeholder="请输入内容" type="textarea" :rows="5" v-model="addTextareaForm.options[index]" ></el-input>
                                </el-col>
                            </el-row>
                        </div>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                 <el-button @click="calAdd">取 消</el-button>
                 <el-button type="primary" @click="addTextareaList(addTextareaForm)">确 定</el-button>
                </span>
            </el-dialog>
        </div>
</template>
<script>

import questionList from '../../component/questionList/questionList'
import allPaperObj from "../../api/questionPaper";


export default {
    name: "questionOptions",
    props: {
            operation: {type:String},
            isCreate:{type:Boolean}
    },
    data(){
        return{
            radioVisible:false, //控制单选题弹框
            checkboxVisible:false,//控制多选题弹框
            textareaVisible:false,//控制填空题弹框
            quesObj:{//问卷对象
                status:0,
                desc:'',
                name:'',
                pageJsonDto:'',
                questionJsonDto:''
            },
            quesList: {             // 问卷总题目
                title:'',
                instructions:'',
                data:[]
            },
            labelPosition:'right',
            addRadioForm:{      //单选题题目
                question:'',
                oneAnswer:'',
                checkboxAnswer:[],
                options:['选项1','选项2']
            },
            addCheckboxForm:{//多选题题目
                question:'',
                oneAnswer:'',
                checkboxAnswer:[],
                options:['选项1','选项2']
            },
            addTextareaForm:{   //填空题题目
                question:'',
                oneAnswer:'',
                checkboxAnswer:[],
                options:['填空内容']
            }
        }
    },
 components:{
   questionList
 },
 watch: {
     quesList:{
         handler(newVal){
             this.quesObj.name = newVal.title
             this.quesObj.desc = newVal.instructions
         },
         deep: true
     }
 },
 methods:{
     addRadio:function (type) {      //打开添加单选题弹框
         this.radioVisible = true
         this.addRadioForm.type = type
     },
     addCheckbox:function(type){    //打开添加多选题弹框
         this.checkboxVisible = true
         this.addCheckboxForm.type = type
     },
     addTextarea:function(type){    //打开添加填空题弹框
       this.textareaVisible = true
       this.addTextareaForm.type = type
    },
    addRadioItem: function(index) {
      //添加多选题选项
      this.addRadioForm.options.push("选项");
    },
    delRadioItem: function(index) {
      //删除单选题选项
      if (this.addRadioForm.options.length === 1) return false;
      this.addRadioForm.options.splice(index, 1);
    },
    delCheckboxItem: function(index) {
      //删除多选题选项
      if (this.addCheckboxForm.options.length === 1) return false;
      this.addCheckboxForm.options.splice(index, 1);
    },
    addCheckboxItem: function(index) {
      //添加多选题选项
      this.addCheckboxForm.options.push("选项");
    },

    addRadioList:function (addRadioForm) {      // 添加单选题
         this.addRadioForm.seq = this.quesList.data.length + 1 //题号
        this.quesList.data.push(addRadioForm)
        this.addRadioForm={
            options:['选项1','选项2']
        }
        this.radioVisible = false
    },
    addCheckboxList:function (addCheckboxForm) {    //添加多选题
        this.addCheckboxForm.seq = this.quesList.data.length + 1 //题号
        this.quesList.data.push(addCheckboxForm)
        this.addCheckboxForm={
            options:['选项1','选项2']
        }
        this.checkboxVisible = false
    },
    addTextareaList:function(addTextareaForm) {      //添加填空题
        this.addTextareaForm.seq = this.quesList.data.length + 1 //题号
        this.quesList.data.push(addTextareaForm)
        this.addTextareaForm = {
            options: ['填空题']
        }
        this.textareaVisible = false
    },
    calAdd: function() {
      //关闭弹框
      this.radioVisible = false;
      this.textareaVisible = false;
      this.checkboxVisible = false;
    },
     addPaper () {
          if(this.operation === 'create') {
              allPaperObj.addPaper(this.getQuesAllParams())
             .then(result => {

                 this.$notify({
                    title: '成功',
                    message: '创建问卷成功',
                    type: 'success'
                    });
                this.quesList= {             // 清空下缓存问卷总题目
                   title:'',
                   instructions:'',
                   data:[]
                      }
                 })
             .catch(err => {
                 console.log(err);
             })
          } else {
              console.log(this.getQuesAllParams());
               allPaperObj.updatePaper(this.getQuesAllParams())
             .then(result => {
                 this.$notify({
                    title: '成功',
                    message: '修改问卷成功',
                    type: 'success'
                    });
                 })
             .catch(err => {
                 console.log(err);

                 this.$notify({
                    title: '错误',
                    message: '修改问卷错误',
                    type: 'error'
                    });
             })
          }
            },
     getSinglePaper(params) {
         allPaperObj.querySinglePaper(params).then((result) => {
             const pageJson = JSON.parse(result.data.pageJson)
             this.quesList = pageJson
             this.quesObj.status = result.data.status
         }).catch((err) => {
             console.log(err);
         });
     },
     getQuesJson() {
         const arr = []
         for (let i =0;i < this.quesList.data.length;i++) {
             const obj = {
                 question:this.quesList.data[i].question,
                 seq: this.quesList.data[i].seq,
             }
             arr.push(obj)
         }
         const data = {
             data:arr,
             title:this.quesList.title,
         }
         return data
     },
     getQuesAllParams() {
         this.quesObj.pageJsonDto = this.quesList
         this.quesObj.questionJsonDto = this.getQuesJson()
         if (this.operation === "edit") {
             this.quesObj.code = this.$route.params.paperCode
             this.quesObj.id = this.$route.params.id
         }
         return this.quesObj
     }
     },


    created() {
        if(this.operation === 'edit') {
            this.getSinglePaper({paperCode:this.$route.params.paperCode})
           }
    }
};
</script>

<style scoped>

.quesContainer {
  margin: 15px 15px 0 0;
  position: relative;
  overflow-x: hidden;
  overflow-y: scroll;
}
.title{
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 25%;
    font-size: 30px;
    margin-bottom: 25px;
    color:#409EFF;
}
.quesTitle {
  width: 500px;
}
.quesList{
    left: -5%;
}
.el-form-item{
    margin-bottom: 10px;
}
</style>

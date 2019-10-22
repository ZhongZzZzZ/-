<template>
    <div class="quesContainer">
                <el-form  label-width="80px">
                    <h3 class="quesTitle">{{questionList.title }}</h3>
                    <p class="quesDesc">{{questionList.instructions}}</p>
                    <div v-for="(item,index) in questionList.data" :key="index" class="quesItem">
                        <!--单选题-->
                        <el-form-item v-if="item.type ==='danxuan'" >
                            <p style="color: #000;font-weight: bold">{{index+1}}:{{item.question}}
                                <el-button @click.native="deleteItem(index)" size="small" v-if="isCreate" type="danger" class="delBtn">删除</el-button>
                            </p>
                            <el-radio-group v-model="item.oneAnswer" @change="modelChange($event,item.seq)" :disabled="isCreate" >
                            <el-radio  class="itemOption"  v-for="(radio,index) in item.options" :key="index" :label="radio" >
                            </el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <!--多选题-->
                        <el-form-item v-if="item.type ==='duoxuan'" >
                            <p style="color: #000;font-weight: bold">{{index+1}}:{{item.question}}
                                <el-button type="danger" @click.native="deleteItem(index)" size="small" v-if="isCreate" class="delBtn">删除</el-button>
                            </p>
                            <el-checkbox-group v-model="item.checkboxAnswer" @change="modelChange($event,item.seq)" :disabled="isCreate" style="width: 80%">
                            <el-checkbox class="itemCheckbox" v-for="(checkbox,index) in item.options" :key="index" :label="checkbox">
                            </el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <!--填空题-->
                        <el-form-item v-if="item.type ==='tiankong'">
                            <p style="color: #000;font-weight: bold">{{index+1}}:{{item.question}}
                                <el-button @click.native="deleteItem(index)" size="small" v-if="isCreate" type="danger" class="delBtn">删除</el-button>
                            </p>
                            <el-input class="itemInput" :key="index"  type="textarea" rows="4"
                                      v-model="item.oneAnswer" @change="modelChange($event,item.seq)" :disabled="isCreate">
                            </el-input>
                        </el-form-item>
                    </div>
                </el-form>
    </div>
</template>

<script>
    export default {
        name: "questionList",
        data(){
           return{
               form:{
                    data:[]
               },
           }
        },
        props:{
            questionList:{
                type:Object,
                default:{}
            },
            isCreate:{
                type:Boolean,
                default:false
            }},
        methods:{
            modelChange(val,seq) {
             for(let i = 0 ; i < this.form.data.length ; i++){
                 if (this.form.data[i].seq == seq){
                     this.form.data[i].answer = val
                     return false
                 }
             }
                    let obj = {}
                    obj.answer = val
                    obj.seq = seq
                    this.form.data.push(obj)
            },
            deleteItem:function (index) {
                this.questionList.data.splice(index,1)
                console.log(this.questionList)
            }
        }
    }
</script>

<style scoped>
.quesContainer{
    position: relative;
    width: 100vw;
    left: 0;
}
.quesTitle{
    position: relative;
    text-align: center;
    font-size: 28px;
    width: 95%;
    left: 50%;
    transform: translateX(-50%);
    color:#409EFF;
    font-weight: normal;
    margin-bottom: 20px;
}
.quesDesc{
    font-size: 16px;
    padding:0 0 15px 20px;
    border-bottom: 1px dashed #848484;
}
.quesItem{
    position: relative;

}
.itemOption{
    display: block;
    padding:  8px;

    color:#000;
    border-left: 1px solid #adadad;
    border-top: 1px solid #adadad;
    width: 70vw;
    border-right: 1px solid #adadad;
}
.itemOption:last-child{
    border-bottom: 1px solid #adadad;
}
.itemCheckbox{
    display: block;
    padding:  8px;
    color:#000;
    border-left: 1px solid #adadad;
    border-top: 1px solid #adadad;
    width: 70vw;
    border-right: 1px solid #adadad;
}
.itemCheckbox:last-child{
    border-bottom: 1px solid #adadad;
   margin-right: 30px;
}
.itemInput{
    display: block;
    margin-bottom:10px;
    width:71vw;
}
.delBtn{
    margin-left: 10px;
}
@media screen and (max-width: 760px) {
    .quesItem{
        position: relative;
        margin-left: -15%;
    }
    .itemInput{
        display: block;
        margin-bottom:10px;
        width:75vw;
    }
}
</style>

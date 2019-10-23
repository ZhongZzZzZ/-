<template>
    <div class="successContainer">
        <div class="imgContainer">
            <img src="../assets/404_cloud.png" class="imgLeft" alt="问卷完成">
            <img src="../assets/404_cloud.png" class="imgMid" alt="问卷完成">
            <img src="../assets/404_cloud.png" class="imgRight" alt="问卷完成">
            <div class="textSuccess">感谢完成问卷填写</div>
        </div>
        <div class="textContainer">

        </div>
    </div>
</template>

<script>
    export default {
        name: "answerSuccess"
    }
</script>

<style scoped>
.successContainer{
    position: absolute;
    margin: auto;
    top: 50%;
    left:50%;
    transform: translate(-50%,-50%);
    font-size: 22px;
    color:#5cb87a;
    overflow: hidden;
    display: flex;
}
.imgContainer{
    position: relative;
    width: 350px;
    height: 350px;

}
.textContainer{

}
.imgLeft{
    width: 80px;
    position: absolute;
    top: 0px;
    left: 60px;
}
.imgRight{
    width: 62px;
    position: absolute;
    top: 10px;
    left: 220px;
}
.imgMid{
    width: 46px;
    position: absolute;
    top: 100px;
    left: 150px;
}
.textSuccess{
    opacity: 0;
    text-align: center;
    margin-bottom: 20px;
    margin-top: 50px;
    animation-name:slideUp;
    animation-duration: 1s;
    animation-fill-mode: forwards;
}
@keyframes slideUp {
    0%{
        transform: translateY(60px);
        opacity: 0;
    }
    100%{
        transform: translateY(0px);
        opacity: 1;
    }
}
</style>

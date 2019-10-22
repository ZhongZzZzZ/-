<template>
  <div class="layout">
    <el-row type="flex" class="lay-out-box">
      <el-col :span="5">
        <h3 class="layout-header">问卷调查</h3>
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          ext-color="#fff"
          active-text-color="#ffd04b"
        >
          <router-link v-for="(item,navIndex) in navList" :to="item.path" :key="navIndex">
            <el-menu-item :index="(navIndex+1).toString()">
              <i :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </el-menu-item>
          </router-link>
        </el-menu>
      </el-col>
      <el-col class="layout-right" :span="18">
        <keep-alive :include="['addQues','myQuestionnaire']">
        <router-view ></router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      navList: [
        {
          path: "/addQues",
          icon: "el-icon-circle-plus-outline",
          title: "创建问卷"
        },
        {
          path: "/myQuestionnaire",
          icon: "el-icon-folder",
          title: "我的问卷"
        },
        {
          path: "/trashBin",
          icon: "el-icon-delete",
          title: "回收站"
        }
      ]
    };
  },
  computed: {}
};
</script>

<style lang="scss" scoped>


.layout {
  position: relative;
  background: #f5f7f9;
  height: 100vh;
  width: 100vw;
  min-width: 750px;
}
.lay-out-box {
  height: 100%;
  box-sizing: border-box;
}
.el-menu-vertical-demo {
  height: 100%;
}
.layout-header {
  color: #f5f7f9;
  text-align: center;
  font-size: 24px;
  background-color: #545c64;
  box-sizing: border-box;
}

.layout-right {
    background-color: #fff;
    margin: 0 15px;
    box-shadow: 0 0 5px #eee;
    flex: 1;
    display: flex;
    box-sizing: border-box;
    overflow-y: auto;
}
</style>

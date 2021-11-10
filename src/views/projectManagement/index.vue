<template>
  <div class="project-management">
    <div class="search-view">
      <el-form :inline="true">
        <el-form-item label="项目名称:">
          <el-input size="small" v-model="projectName"></el-input>
        </el-form-item>
        <el-form-item label="项目编号:">
          <el-input size="small" v-model="projectCode"></el-input>
        </el-form-item>
        <el-form-item label="领域:">
          <el-input size="small" v-model="projectField"></el-input>
        </el-form-item>
        <el-button size="small" type="primary">查询</el-button>
        <el-button size="small">重置</el-button>
      </el-form>
      <el-button type="primary" size="small">新增项目</el-button>
    </div>
    <div class="main-view">
      <div
        v-for="item in 10"
        :key="item"
        class="item"
        @mouseover="activeId = item"
        @mouseleave="activeId = -1"
      >
        <div class="img-box">
          <img src="../../assets/img.png" class="project-img" alt="">
        </div>
        <div class="content-box">
          <div class="content-box-li">
            <div class="name">**学校可视化项目</div>
            <div class="resolution">适用分辨率：1920*1080</div>
          </div>
          <div class="content-box-li">
            <div>领域：中职院校 页面数：6</div>
            <div>2021-03-02</div>
          </div>
        </div>
        <div class="operate-panel" v-show="activeId === item">
          <el-button type="primary" @click="toEditProject(item)">编辑</el-button>
          <el-button >预览</el-button>
          <i class="el-icon-document-copy copy-icon"></i>
          <i class="el-icon-delete delete-icon"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ProjectManagement",
    data() {
      return {
        projectName: '',
        projectField: '',
        projectCode: '',
        activeId: -1
      }
    },
    mounted() {
    },
    methods: {
      toEditProject(id) {
        this.$router.push('/home/edit/' + id);
      }
    }
  }
</script>

<style lang="scss" scoped>
  $background: #cccccc;
  .project-management {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .search-view {
      height: 56px;
      width: 100%;
      flex-shrink: 0;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-left: 1.1rem;
      padding-right: 1.1rem;
      box-sizing: border-box;
      ::v-deep .el-form {
        display: flex;
        align-items: center;
        .el-form-item {
          margin-bottom: 0;
        }
      }
    }
    .main-view {
      background: #DCDCDC;
      flex: 1;
      box-sizing: border-box;
      padding: .2rem .8rem .2rem 1rem;
      display: flex;
      flex-wrap: wrap;
      .item {
        min-width: 4.1rem;
        width: calc(25% - .25rem);
        height: 320px;
        background: #ffffff;
        border-radius: 4px;
        margin-right: .2rem;
        margin-bottom: .2rem;
        position: relative;
        cursor: pointer;
        .img-box {
          width: 100%;
          height: fit-content;
          max-height: 233px;
          overflow: hidden;
          .project-img {
            width: 100%;
            /*height: auto;*/
            /*max-height: 233px;*/
            height: 233px;
            transition: all 0.6s;
            cursor: pointer;
          }
          .project-img:hover {
            transform: scale(1.2);
          }
        }
        .content-box {
          width: 100%;
          height: 87px;
          padding: 0 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          .content-box-li {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #999999;
            font-size: 12px;
            .name {
              font-size: 14px;
              font-family: "PingFang SC";
              color: #333333;
            }
            .resolution {
              color: #376AB8;
              font-size: 12px;
              font-family: "PingFang SC";
            }
          }
        }
        .operate-panel {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: calc(100% - 87px);
          z-index: 0;
          background: rgba(0, 0, 0, .5);
          display: flex;
          align-items: center;
          justify-content: center;
          .copy-icon {
            position: absolute;
            font-size: 24px;
            top: 20px;
            right: 70px;
            background: transparent;
            color: #ffffff;
          }
          .delete-icon {
            position: absolute;
            font-size: 24px;
            top: 20px;
            right: 30px;
            background: transparent;
            color: #ffffff;
          }
        }
      }
    }
  }
</style>

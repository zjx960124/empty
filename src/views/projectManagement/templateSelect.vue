<template>
  <div class="edit-project">
    <div class="detail-view">
      <div class="title">新增版面</div>
      <div class="info">
        <div>项目名称：福州商旅学校</div>
        <div>领域：高职院校</div>
        <div>
          <span>项目编辑时分辨率:</span>
          <el-input size="small"></el-input>
        </div>
      </div>
      <div class="info">
        <div>
          <span>模板名称：</span>
          <el-input size="small"></el-input>
        </div>
        <div>
          <span>类型：</span>
          <el-input size="small"></el-input>
        </div>
        <div>
          <span>主题风格：</span>
          <el-input size="small"></el-input>
        </div>
        <div>
          <el-button type="primary" size="small">查询</el-button>
          <el-button size="small">重置</el-button>
        </div>
      </div>
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
            <div class="name">全校数据一览</div>
            <div class="resolution">福州商旅学校</div>
          </div>
          <div class="content-box-li">
            <div>类型：全校</div>
            <div>2021-03-02</div>
          </div>
        </div>
        <div class="operate-panel" v-show="activeId === item">
          <el-button type="primary" @click="toEditProjectPage(item)">编辑</el-button>
          <i class="el-icon-document-copy copy-icon"></i>
          <i class="el-icon-delete delete-icon"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TemplateSelect',
    data() {
      return {
        projectId: '',
        activeId: ''
      }
    },
    created() {
      this.projectId = this.$route.params.id;
    },
    mounted() {
    },
    methods: {
      toEditProjectPage() {
        this.$router.push('/home/editPage');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .edit-project {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .detail-view {
      width: 100%;
      flex-shrink: 0;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      padding-left: 1.1rem;
      padding-right: 1.1rem;
      box-sizing: border-box;
      padding-bottom: 20px;
      .title {
        height: 36px;
        width: 100%;
        line-height: 42px;
        border-bottom: 1px solid #DCE6F5;
        text-align: left;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
        cursor: pointer;
      }
      .info {
        width: 100%;
        margin-top: 20px;
        font-size: 14px;
        color: #999999;
        display: flex;
        align-items: center;
        & > div {
          display: flex;
          align-items: center;
          ::v-deep .el-input {
            width: 208px;
            height: 28px;
            .el-input__inner {
              height: 28px;
              line-height: 28px;
            }
          }
        }
        div + div {
          margin-left: 30px;
        }
        .operate {
          float: right;
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
        width: calc(25% - .2rem);
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

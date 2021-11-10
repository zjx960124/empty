<template>
  <div class="attr-panel">
    <!--<el-tabs v-model="currentTab">
      <el-tab-pane label="容器属性" name="container" />
      <el-tab-pane label="画布属性" name="canvas" />
    </el-tabs>-->
    <el-menu
      :default-active="currentTab"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">容器属性</el-menu-item>
      <el-menu-item index="2">画布属性</el-menu-item>
    </el-menu>
    <div class="property-view">
      <el-form
        v-show="currentTab === '1'"
        size="small"
        label-width="125px"
      >
        <el-form-item label="容器排列方向">
          <el-select
            v-model="activeData.style.flexDirection"
          >
            <el-option
              v-for="(item, index) in arrangeOption"
              :key="index.toString()"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="容器内间距">
          <el-input v-model="activeData.style.padding" placeholder="请输入容器内间距" />
        </el-form-item>
        <el-form-item label="容器占比">
          <el-input v-model="activeData.style.flex" placeholder="请输入容器内间距" />
        </el-form-item>
        <el-form-item label="容器背景色">
          <el-color-picker v-model="activeData.style.backgroundColor"></el-color-picker>
        </el-form-item>
      </el-form>
      <el-form
        v-show="currentTab === '2'"
        size="small"
        label-width="125px"
      >
        <el-form-item label="画布内容器间隔:">
          <el-input v-model="formConf.gutter" placeholder="请输入画布内容器间隔" />
        </el-form-item>
        <el-form-item label="画布排列方向:">
          <el-select
            v-model="formConf.flexDirection"
          >
            <el-option
              v-for="(item, index) in arrangeOption"
              :key="index.toString()"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AttrPanel",
    props: ['formConf', 'activeData'],
    data() {
      return {
        currentTab: '1',
        arrangeOption: [
          {
            label: '横向',
            value: 'row'
          },
          {
            label: '纵向',
            value: 'column'
          }
        ]
      }
    },
    watch: {
      activeData(old) {
        console.log(old)
        if (old.componentName.indexOf('echart') !== -1) this.currentTab = '3';
      }
    },
    mounted() {
    },
    methods: {
      handleSelect(val) {
        this.currentTab = val;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .attr-panel {
    .center-tabs {
      height: 40px;
    }
    .property-view {
      margin-top: 20px;
      ::v-deep .el-form {
        .el-form-item {
          .el-form-item__content {
            display: flex;
            .el-input {
              width: auto;
            }
          }
        }
      }
    }
  }
</style>

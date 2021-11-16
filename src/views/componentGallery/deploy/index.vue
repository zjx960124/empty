<template>
  <div class="deploy">
    <div class="left">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="数据模型" name="1">
          <el-button type="primary" @click="changeChartData('1')">选择数据源1</el-button>
          <el-button type="primary" @click="changeChartData('2')">选择数据源2</el-button>
        </el-collapse-item>
        <el-collapse-item title="主题风格" name="2">
          <el-select
            v-model="theme"
            @change="changeTheme"
          >
            <el-option
              v-for="(item, index) in themeFileList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-collapse-item>
        <el-collapse-item title="数据" name="3">
          <span>类目轴</span>
          <el-select
            v-model="category"
            @change="changeCategory"
          >
            <el-option
              v-for="(item, index) in dimension"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
          <span>图例</span>
          <el-select
            v-model="legend"
            @change="changeLegend"
          >
            <el-option
              v-for="(item, index) in dimension"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="center">
      <div class="category">
        sql
        <el-input v-model="sql">
          <el-button slot="append" icon="el-icon-search" @click="getChartData"></el-button>
        </el-input>
      </div>
      <!--<div class="value">
        y
        <el-input v-model="yValue"></el-input>
      </div>-->
      <div class="comp">
        <component
          :is="comp"
          :ref-name="refName"
          :style="styleOption"
          :class-name="className"
          :chart-data="chartData"
          :theme="theme"
          :data-model="dataModel"
          :legend="legend"
          :category="category"
          :sql="sql"
        ></component>
      </div>
    </div>
    <div class="right">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @select="changeComp"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>图表选择</span>
          </template>
          <el-menu-item index="clDis" route="clDis">dis组件</el-menu-item>
          <el-menu-item index="clSub" route="clSub">sub组件</el-menu-item>
          <el-menu-item index="clPie" route="clPie">pie组件</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Deploy',
    data() {
      return {
        comp: 'clDis',
        refName: 'row1',
        theme: 'dark',
        styleOption: {
          flexDirection: 'row',
          display: 'flex',
          padding: '10',
          flex: 2,
          backgroundColor: '#E1FFFF',
          color: 'red',
          height: '100%'
        },
        className: 'row1',
        chartData: {
          category: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          legend: ['男生', '女生'],
          value: [233, 233, 200, 180, 199, 233, 210, 180]
        },
        themeFileList: [],
        category: '',
        legend: '',
        yValue: '',
        activeNames: '3',
        dataModel: '1',
        sql: 'select count(1),businessName,depName from transaction group by businessName,depName',
        dimension: [],
        baseData: []
      }
    },
    created() {
      let modulesFiles = require.context("@/cChart/conf/", true, /\.js$/);
      let modules = modulesFiles.keys().reduce((modules, modulePath) => {
        const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
        const value = modulesFiles(modulePath);
        // modules[moduleName] = moduleName;
        modules.push({label: moduleName, value: moduleName})
        return modules;
      }, []);
      this.themeFileList = modules;
      this.getChartData()
    },
    methods: {
      changeComp(index, indexPath) {
        this.comp = index;
      },
      changeCategory(val) {
        this.category = val;
      },
      changeLegend(val) {
        this.legend = val;
      },
      handleChange() {},
      changeChartData(type) {
        switch (type) {
          case '1':
            this.dataModel = type;
            break;
          case '2':
            this.dataModel = type;
            break;
        }
      },
      changeTheme(val) {
        console.log(val)
        console.log(this.theme)
      },
      getChartData() {
        this.http.get('/rest/report/sql', {
          datasourceId: this.dataModel,
          sql: this.sql
        }).then((res) => {
          console.log(res.data)
          let data = res.data;
          this.dimension = data.columns.splice(1, data.columns.length);
          this.category = this.dimension[0];
          this.legend = this.dimension[1];
          this.baseData = res.data.rows;
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .deploy {
    width: 100%;
    height: 100%;
    display: flex;
    box-sizing: border-box;
    padding: 55px 100px;
    background-color: #ededed;
    .left {
      height: 100%;
      flex: 270;
      background: #ffffff;
    }
    .center {
      height: 100%;
      flex: 1139;
      margin: 0 20px;
      display: flex;
      flex-direction: column;
      font-size: 14px;
      text-align: left;
      .category {
        height: 48px;
        width: 100%;
        background: #ffffff;
        line-height: 48px;
        display: flex;
        padding: 0 20px;
      }
      .value {
        height: 48px;
        width: 100%;
        background: #ffffff;
        margin: 13px 0;
        line-height: 48px;
        padding-left: 20px;
        display: flex;
      }
      .comp {
        flex: 1;
        width: 100%;
        background: #ffffff;
        padding: 20px;
        box-sizing: border-box;
      }
    }
    .right {
      height: 100%;
      flex: 270;
      background: #ffffff;
    }
  }
</style>

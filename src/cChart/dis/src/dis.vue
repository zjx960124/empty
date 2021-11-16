<template>
  <div
    :ref="refName"
    :class="className"
    :style="{ ...styleOption }"
  >
  </div>
</template>
<script>
  import echarts from 'echarts';
  export default {
    name: 'ClDis',

    props: {
      refName: String,
      styleOption: Object,
      className: '',
      chartData: Object,
      theme: String,
      dataModel: String,
      legend: String,
      category: String,
      sql: String
    },

    data() {
      return {
        baseData: '',
        columns: []
      }
    },

    watch: {
      chartData: {
        deep:true, //深度监听设置为 true
        handler: function (newV, oldV) {
          this.renderEChart();
        }
      },
      theme: {
        deep:true, //深度监听设置为 true
        handler: function (newV, oldV) {
          this.setTheme();
        }
      },
      category: {
        deep:true, //深度监听设置为 true
        handler: function (newV, oldV) {
          this.renderOption();
        }
      },
      legend: {
        deep:true, //深度监听设置为 true
        handler: function (newV, oldV) {
          this.renderOption();
        }
      }
    },

    beforeDestroy() {
      console.log('destory');
      console.log(this.refName)
      this[this.refName + 'Chart'].dispose();
      this[this.refName + 'Chart'] = null;
    },

    methods: {
      renderEChart() {
        this.http.get('/rest/report/sql', {
          datasourceId: this.dataModel,
          sql: this.sql
        }).then((res) => {
          this.baseData = res.data.rows;
          this.columns = res.data.columns;
          this.renderOption();
        })
      },
      renderOption() {
        if (this[this.refName + 'Chart']) {
          this[this.refName + 'Chart'].dispose();
        }
        this[this.refName + 'Chart'] = echarts.init(this.$refs[this.refName], this.theme);
        console.log(this.baseData);
        let xAxisIndex = this.columns.indexOf(this.category);
        let legendIndex = this.columns.indexOf(this.legend);
        let xAxisData = Array.from(new Set(...new Array(1).fill(this.baseData.map((item) => item[xAxisIndex]))));
        let legendData = Array.from(new Set(...new Array(1).fill(this.baseData.map((item) => item[legendIndex]))));
        let seriesData = legendData.map((item, index) => {
          return {
            name: item,
            type: 'line',
            data: this.baseData.filter((items, index) => { return items[legendIndex] === item}).map((item2, index2) => item2[0])
          }
        })
        console.log(xAxisData)
        console.log(legendData)
        console.log(seriesData)
        let option = {
          // backgroundColor: 'red',
          xAxis: {
            type: 'category',
            data: xAxisData
          },
          yAxis: {
            type: 'value'
          },
          legend: {
            data: legendData
          },
          series: seriesData
        };
        this[this.refName + 'Chart'].setOption(option);
      },
      setTheme() {
        console.log(this.theme)
        let str = this.theme + 'dark.js';
        function jikj(str) {   return `../../conf/${str}`; }
        try {
          // const cc = () => import(jikj());
        } catch (e) {}
        this.renderEChart();
      }
    },

    mounted() {
      /*this.$once('hook:beforeDestroy',()=>{
        if (this[this.refName + 'Chart']) {
          this[this.refName + 'Chart'].dispose();
          this[this.refName + 'Chart'] = null;
        }
      })*/
      /*let str = 'fir.js';
      function jikj(str) {   return `../../conf/${str}`; }
      const cc = () => import(jikj());*/
      // const modulesFiles = require.context("../../conf", true, /\.js$/);
      /*const modules = modulesFiles.keys().reduce((modules, modulePath) => {
        const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
        const value = modulesFiles(modulePath);
        modules[moduleName] = value;
        return modules;
      }, {});*/
      this.$nextTick(() => {
        this.setTheme();
      })
    }
  };
</script>

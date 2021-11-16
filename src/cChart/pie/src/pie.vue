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
    name: 'ClPie',

    props: {
      refName: String,
      styleOption: Object,
      className: '',
      chartData: Object,
      renderKey: String
    },

    watch: {
      chartData: {
        deep:true, //深度监听设置为 true
        handler: function (newV, oldV) {
          console.log(this)
          this.renderEChart();
        }
      },
    },


    beforeDestroy() {
      this[this.refName + 'Chart'].dispose();
      this[this.refName + 'Chart'] = null;
    },

    methods: {
      renderEchart() {
        this[this.refName + 'Chart'] = echarts.init(this.$refs[this.refName]);
        let option = {
          backgroundColor:"#031d33",
          color: [  "#0097FB",
            "#92E1FF",
            "#FFC227",
            "#30ECA6",
            "#FDFA4E",
            "#FF4848"],
          series: [
            {
              name: "标签使用频率",
              type: "pie",
              radius: ["44%", "63%"],
              center: ["50%", "50%"],
              roseType: "radius",
              label: {
                show: false
              },
              emphasis: {
                label: {
                  show: false
                }
              },
              itemStyle: {
                shadowBlur: 1,
                shadowColor: 2,
                shadowOffsetX: 5,
                shadowOffsetY: 5
              },
              data:[21,32,43,64,55]
            }
          ]
        };
        this[this.refName + 'Chart'].setOption(option);
      }
    },

    mounted() {
      /*this.$once('hook:beforeDestroy',()=>{
        if (this[this.refName + 'Chart']) {
          this[this.refName + 'Chart'].dispose();
          this[this.refName + 'Chart'] = null;
        }
      })*/
      this.$nextTick(() => {
        console.log('mounted')
        console.log(this.refName)
        this.renderEchart();
      })
    }
  };
</script>

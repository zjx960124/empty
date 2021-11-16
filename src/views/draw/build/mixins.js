import echarts from 'echarts';
const echartMixin = {
  mounted: function() {
    this.$nextTick(() => {
      console.log(this.$refs);
      this.renderEChart();
    })
  },
  methods: {
    renderEChart: function() {
      // let layouts = this.options.layouts;
      let layouts = this.drawingList || this.options.layouts;
      function treeToArray(tree) {
        return tree.reduce((res, item) => {
          const { children, ...i } = item
          return res.concat(i, children && children.length ? treeToArray(children) : [])
        }, [])
      }
     /* let data = [
        {
          layout: 'rowFrame',
          tagIcon: 'row',
          label: '容器',
          layoutTree: true,
          document: 'https://element.eleme.cn/#/zh-CN/component/layout#row-attributes',
          style: {
            flexDirection: 'row',
            display: 'flex',
            padding: '10',
            flex: 2,
            backgroundColor: '#E1FFFF'
          },
          children: [
            {
              layout: 'echart',
              label: '柱状图',
              data: {
                x: ['学生', '老师'],
                legend: ['男生', '女生'],
                data: [1, 2, 3, 4]
              },
              style: {
                flexDirection: 'row',
                display: 'flex',
                padding: '10',
                flex: 2,
                backgroundColor: '#E1FFFF'
              },
            }
          ],
        },
        {
          layout: 'rowFrame',
          tagIcon: 'row',
          label: '容器',
          layoutTree: true,
          document: 'https://element.eleme.cn/#/zh-CN/component/layout#row-attributes',
          style: {
            flexDirection: 'row',
            display: 'flex',
            padding: '10',
            flex: 2,
            backgroundColor: '#E1FFFF'
          },
          children: [
            {
              layout: 'echart',
              label: '柱状图',
              data: {
                x: ['学生', '老师'],
                legend: ['男生', '女生'],
                data: [1, 2, 3, 4]
              },
              style: {
                flexDirection: 'row',
                display: 'flex',
                padding: '10',
                flex: 2,
                backgroundColor: '#E1FFFF'
              },
            }
          ],
        }
      ]*/
      // console.log(treeToArray(layouts))
      this.$nextTick(() => {
        treeToArray(layouts).map((items, indexs) => {
          if (items.componentName.indexOf('echart') !== -1) {
            setTimeout(() => {
              // console.log(document.getElementById(items.componentName))
              console.log(this.$refs);
              console.log(document.getElementById(items.componentName));
              // this[items.componentName] = echarts.init(document.getElementById(items.componentName));
              this[items.componentName] = echarts.init(this.$refs[items.componentName]);
              let option = {
                backgroundColor:'#031d33',
                tooltip: {
                  show: true
                },
                series: [
                  {
                    type: "pie",
                    radius: ["30%", "45%"],
                    center: ["50%", "50%"],
                    hoverAnimation: true,
                    z: 10,
                    itemStyle: {
                      normal: {
                        borderWidth:5,
                        borderColor: "#003359"
                      }
                    },
                    label: {
                      show: false
                    },
                    data: [100,23,43,65,34,74],
                    labelLine: {
                      show: false
                    }
                  }
                ]
              }
              this[items.componentName].setOption(option);
            }, 1)
          }
        });
      })
    },
  }
}

export default echartMixin

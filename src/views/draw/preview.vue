<template>
  <div class="preview-view">
    <form-build :options="pageData"></form-build>
    <div class="btn" @click="changePage">切换页面</div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'Preview',
    data() {
      return {
        pageData: []
      }
    },
    mounted() {
      this.pageData = JSON.parse(sessionStorage.getItem("pageData"));
    },
    methods: {
      changePage() {
        this.pageData = {
          layouts: [{
            tempId: '2',
            layout: 'rowFrame',
            label: '师资力量',
            style: {
              flexDirection: 'row',
              display: 'flex',
              padding: '10',
              flex: 2,
              backgroundColor: '#E1FFFF'
            },
            children: [
              {
                layout: 'rowFrame',
                label: '容器',
                style: {
                  flexDirection: 'column',
                  display: 'flex',
                  padding: '10',
                  flex: 2,
                  backgroundColor: '#E1FFFF'
                },
                children: [
                  {
                    layout: 'rowFrame',
                    label: '容器',
                    style: {
                      flexDirection: 'row',
                      display: 'flex',
                      padding: '10',
                      flex: 2,
                      backgroundColor: '#E1FFFF'
                    },
                    children: [
                      {
                        layout: 'clDis',
                        label: '分布柱状图',
                        type: 'sub',
                        data: {
                          category: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                          legend: ['男生', '女生'],
                          value: [233, 233, 200, 180, 199, 233, 210, 180]
                        },
                        style: {
                          flexDirection: 'row',
                          display: 'flex',
                          padding: '10',
                          flex: 2,
                          backgroundColor: '#E1FFFF',
                          color: 'red'
                        },
                        sql: 'select count(1),businessName,depName from transaction group by businessName,depName',
                        dataModel: '1',
                        category: 'businessName',
                        legend: 'depName',
                      }
                    ],
                  },
                  {
                    layout: 'rowFrame',
                    label: '容器',
                    style: {
                      flexDirection: 'row',
                      display: 'flex',
                      padding: '10',
                      flex: 4,
                      backgroundColor: '#E1FFFF'
                    },
                    children: [
                      {
                        layout: 'clDis',
                        label: '分布柱状图',
                        type: 'sub',
                        data: {
                          category: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                          legend: ['男生', '女生'],
                          value: [233, 233, 200, 180, 199, 233, 210, 180]
                        },
                        style: {
                          flexDirection: 'row',
                          display: 'flex',
                          padding: '10',
                          flex: 2,
                          backgroundColor: '#E1FFFF',
                          color: 'red'
                        },
                        sql: 'select count(1),businessName,depName from transaction group by businessName,depName',
                        dataModel: '1',
                        category: 'businessName',
                        legend: 'depName',
                      }
                    ],
                  },
                  {
                    layout: 'rowFrame',
                    label: '容器',
                    style: {
                      flexDirection: 'row',
                      display: 'flex',
                      padding: '10',
                      flex: 3,
                      backgroundColor: '#E1FFFF'
                    },
                    children: [
                      {
                        layout: 'clDis',
                        label: '分布柱状图',
                        type: 'sub',
                        data: {
                          category: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                          legend: ['男生', '女生'],
                          value: [233, 233, 200, 180, 199, 233, 210, 180]
                        },
                        style: {
                          flexDirection: 'row',
                          display: 'flex',
                          padding: '10',
                          flex: 2,
                          backgroundColor: '#E1FFFF',
                          color: 'red'
                        },
                        sql: 'select count(1),businessName,depName from transaction group by businessName,depName',
                        dataModel: '1',
                        category: 'businessName',
                        legend: 'depName',
                      }
                    ],
                  },
                ],
              },
              {
                layout: 'rowFrame',
                label: '容器',
                style: {
                  flexDirection: 'column',
                  display: 'flex',
                  padding: '10',
                  flex: 4,
                  backgroundColor: '#E1FFFF'
                },
                children: [
                  {
                    layout: 'rowFrame',
                    label: '容器',
                    style: {
                      flexDirection: 'row',
                      display: 'flex',
                      padding: '10',
                      flex: 6,
                      backgroundColor: '#E1FFFF'
                    },
                    children: [
                      {
                        layout: 'clDis',
                        label: '分布柱状图',
                        type: 'sub',
                        data: {
                          category: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                          legend: ['男生', '女生'],
                          value: [233, 233, 200, 180, 199, 233, 210, 180]
                        },
                        style: {
                          flexDirection: 'row',
                          display: 'flex',
                          padding: '10',
                          flex: 2,
                          backgroundColor: '#E1FFFF',
                          color: 'red'
                        },
                        sql: 'select count(1),businessName,depName from transaction group by businessName,depName',
                        dataModel: '1',
                        category: 'businessName',
                        legend: 'depName',
                      }
                    ],
                  },
                  {
                    layout: 'rowFrame',
                    label: '容器',
                    style: {
                      flexDirection: 'row',
                      display: 'flex',
                      padding: '10',
                      flex: 3,
                      backgroundColor: '#E1FFFF'
                    },
                    children: [
                      {
                        layout: 'clDis',
                        label: '分布柱状图',
                        type: 'sub',
                        data: {
                          category: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                          legend: ['男生', '女生'],
                          value: [233, 233, 200, 180, 199, 233, 210, 180]
                        },
                        style: {
                          flexDirection: 'row',
                          display: 'flex',
                          padding: '10',
                          flex: 2,
                          backgroundColor: '#E1FFFF',
                          color: 'red'
                        },
                        sql: 'select count(1),businessName,depName from transaction group by businessName,depName',
                        dataModel: '1',
                        category: 'businessName',
                        legend: 'depName',
                      }
                    ],
                  },
                  {
                    layout: 'rowFrame',
                    label: '容器',
                    style: {
                      flexDirection: 'row',
                      display: 'flex',
                      padding: '10',
                      flex: 3,
                      backgroundColor: '#E1FFFF'
                    },
                    children: [
                      {
                        layout: 'clDis',
                        label: '分布柱状图',
                        type: 'sub',
                        data: {
                          category: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                          legend: ['男生', '女生'],
                          value: [233, 233, 200, 180, 199, 233, 210, 180]
                        },
                        style: {
                          flexDirection: 'row',
                          display: 'flex',
                          padding: '10',
                          flex: 2,
                          backgroundColor: '#E1FFFF',
                          color: 'red'
                        },
                        sql: 'select count(1),businessName,depName from transaction group by businessName,depName',
                        dataModel: '1',
                        category: 'businessName',
                        legend: 'depName',
                      }
                    ],
                  },
                ],
              },
              {
                layout: 'rowFrame',
                label: '容器',
                style: {
                  flexDirection: 'column',
                  display: 'flex',
                  padding: '10',
                  flex: 2,
                  backgroundColor: '#E1FFFF'
                },
                children: [
                  {
                    layout: 'rowFrame',
                    label: '容器',
                    style: {
                      flexDirection: 'row',
                      display: 'flex',
                      padding: '10',
                      flex: 2,
                      backgroundColor: '#E1FFFF'
                    },
                    children: [
                      {
                        layout: 'clDis',
                        label: '分布柱状图',
                        type: 'sub',
                        data: {
                          category: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                          legend: ['男生', '女生'],
                          value: [233, 233, 200, 180, 199, 233, 210, 180]
                        },
                        style: {
                          flexDirection: 'row',
                          display: 'flex',
                          padding: '10',
                          flex: 2,
                          backgroundColor: '#E1FFFF',
                          color: 'red'
                        },
                        sql: 'select count(1),businessName,depName from transaction group by businessName,depName',
                        dataModel: '1',
                        category: 'businessName',
                        legend: 'depName',
                      }
                    ],
                  },
                  {
                    layout: 'rowFrame',
                    label: '容器',
                    style: {
                      flexDirection: 'column',
                      display: 'flex',
                      padding: '10',
                      flex: 7,
                      backgroundColor: '#E1FFFF'
                    },
                    children: [
                      {
                        layout: 'rowFrame',
                        label: '容器',
                        style: {
                          flexDirection: 'row',
                          display: 'flex',
                          padding: '10',
                          flex: 2,
                          backgroundColor: '#E1FFFF'
                        },
                        children: [
                          {
                            layout: 'clDis',
                            label: '分布柱状图',
                            type: 'sub',
                            data: {
                              category: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                              legend: ['男生', '女生'],
                              value: [233, 233, 200, 180, 199, 233, 210, 180]
                            },
                            style: {
                              flexDirection: 'row',
                              display: 'flex',
                              padding: '10',
                              flex: 2,
                              backgroundColor: '#E1FFFF',
                              color: 'red'
                            },
                            sql: 'select count(1),businessName,depName from transaction group by businessName,depName',
                            dataModel: '1',
                            category: 'businessName',
                            legend: 'depName',
                          }
                        ],
                      },
                      {
                        layout: 'rowFrame',
                        label: '容器',
                        style: {
                          flexDirection: 'row',
                          display: 'flex',
                          padding: '10',
                          flex: 2,
                          backgroundColor: '#E1FFFF'
                        },
                        children: [
                          {
                            layout: 'clDis',
                            label: '分布柱状图',
                            type: 'sub',
                            data: {
                              category: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                              legend: ['男生', '女生'],
                              value: [233, 233, 200, 180, 199, 233, 210, 180]
                            },
                            style: {
                              flexDirection: 'row',
                              display: 'flex',
                              padding: '10',
                              flex: 2,
                              backgroundColor: '#E1FFFF',
                              color: 'red'
                            },
                            sql: 'select count(1),businessName,depName from transaction group by businessName,depName',
                            dataModel: '1',
                            category: 'businessName',
                            legend: 'depName',
                          }
                        ],
                      },
                    ],
                  },
                ],
              },
            ]
          }],
          conf: {
            span: 24,
            gutter: 10,
            flexDirection: 'row'
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .preview-view {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    .btn {
      position: absolute;
      z-index: 2;
    }
  }
</style>

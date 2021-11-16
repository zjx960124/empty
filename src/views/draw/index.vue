<template>
  <div class="draw-container">
    <div class="left">
      <div>
        <div class="type-title">模板元件</div>
        <draggable
          class="components-draggable"
          :list="leftComponents"
          :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
          :clone="cloneComponent"
          draggable=".components-item"
          :sort="false"
          @end="onEnd"
        >
          <div
            v-for="(element, index) in leftComponents"
            :key="index"
            class="components-item"
            @click="addComponent(element)"
          >
            <div class="components-body">
              {{ element.label }}
            </div>
          </div>
        </draggable>
      </div>
      <div>
        <div class="type-title">模板组件</div>
        <draggable
          class="components-draggable"
          :list="leftElement"
          :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
          :clone="cloneComponent"
          draggable=".components-item"
          :sort="false"
          @end="onEnd"
        >
          <div
            v-for="(element, index) in leftElement"
            :key="index"
            class="components-item"
            @click="addComponent(element)"
          >
            <div class="components-body">
              {{ element.label }}
            </div>
          </div>
        </draggable>
      </div>
      <div>
        <div class="type-title">模板</div>
        <draggable
          class="components-draggable"
          :list="templateComponents"
          :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
          :clone="cloneComponent"
          draggable=".components-item"
          :sort="false"
          @end="onEnd"
        >
          <div
            v-for="(element, index) in templateComponents"
            :key="index"
            class="components-item"
            @click="addComponent(element)"
          >
            <div class="components-body">
              {{ element.label }}
            </div>
          </div>
        </draggable>
      </div>
    </div>
    <div class="center">
      <!--<div class="action-bar">
      &lt;!&ndash;<el-button icon="el-icon-video-play" type="text" @click="run">
        运行
      </el-button>
      <el-button icon="el-icon-view" type="text" @click="showJson">
        查看json
      </el-button>
      <el-button icon="el-icon-download" type="text" @click="download">
        导出vue文件
      </el-button>
      <el-button class="copy-btn-main" icon="el-icon-document-copy" type="text" @click="copy">
        复制代码
      </el-button>&ndash;&gt;
      &lt;!&ndash;<el-button class="delete-btn" icon="el-icon-delete" type="text" @click="empty">
        清空
      </el-button>&ndash;&gt;
      <el-button type="danger" icon="el-icon-delete" size="small" @click="empty">清空</el-button>
      </div>-->
      <div class="operate-view">
        <el-button type="primary" icon="el-icon-printer" size="small" @click="download">导出</el-button>
        <el-button type="primary" icon="el-icon-printer" size="small" @click="preview">预览</el-button>
        <el-button type="danger" icon="el-icon-delete" size="small" @click="empty">清空</el-button>
      </div>
      <draggable
      class="drawing-board"
      :list="drawingList"
      :animation="340"
      group="componentsGroup"
      style="display: flex; padding: 50px; box-sizing: border-box"
      :style="{flexDirection: formConf.flexDirection}"
    >
      <draggable-item
        v-for="(item, index) in drawingList"
        :key="item.renderKey"
        :drawing-list="drawingList"
        :current-item="item"
        :active-id="activeId"
        :index="index"
        :form-conf="formConf"
        @activeItem="activeFormItem"
        @copyItem="drawingItemCopy"
        @deleteItem="drawingItemDelete"
      />
    </draggable>
    </div>
    <div class="right">
      <attr-panel
        :active-data="activeData"
        :form-conf="formConf"
        :show-field="!!drawingList.length"
      ></attr-panel>
    </div>
    <el-dialog
      title="预览"
      :visible.sync="previewVisible"
      width="80%"
      class="dialog"
      :destroy-on-close="true"
    >
      <form-build :options="formData"></form-build>
      <span slot="footer" class="dialog-footer">
        <el-button @click="previewVisible = false">取 消</el-button>
        <el-button type="primary" @click="previewVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import store from '../../store';
  import draggable from 'vuedraggable';
  import { deepClone, beautifierConf } from '../../utils/index';
  import loadBeautifier from '@/utils/loadBeautifier'
  import DraggableItem from "./draggableItem";
  import AttrPanel from "./attrPanel";
  import {titleCase} from '@/utils/index';
  import {
    makeUpHtml, vueTemplate, vueScript, cssStyle
  } from './generateCode/index'
  import { makeUpJs } from './generateCode/utils'
  import { makeUpCss } from './generateCode/style'
  import { saveAs } from 'file-saver'
  let tempActiveData
  let beautifier
  export default {
    name: "Draw",
    components: {
      AttrPanel,
      DraggableItem,
      draggable
    },
    data() {
      return {
        leftComponents: [
          /*{
            __config__: {
              layout: 'rowFormItem',
              tagIcon: 'row',
              label: '行容器',
              layoutTree: true,
              document: 'https://element.eleme.cn/#/zh-CN/component/layout#row-attributes'
            },
            type: 'default',
            justify: 'start',
            align: 'top'
          },*/
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
            children: [],
          },
          {
            layout: 'elTabs',
            tagIcon: 'el-tabs',
            label: 'tab栏',
            layoutTree: true,
            document: 'https://element.eleme.cn/#/zh-CN/component/layout#row-attributes',
            style: {},
            props: {
              tabPosition: 'left'
            },
            children: [
              {
                layout: 'elTabPane',
                props: {
                  label: '用户管理',
                  name: 'yonghuguanli'
                }
              }
            ],
            type: 'default',
            justify: 'start',
            align: 'top'
          },
          {
            layout: 'elMenu',
            tagIcon: 'el-menu',
            label: '导航菜单',
            layoutTree: true,
            document: 'https://element.eleme.cn/#/zh-CN/component/layout#row-attributes',
            style: {},
            props: {
              defaultActive: "1"
            },
            children: [
              {
                layout: 'elMenuItem',
                tagIcon: 'el-menu-item',
                props: {
                  slot: 'title',
                },
                content: '导航一',
                iconClassName: 'el-icon-menu'
              },
              {
                layout: 'elMenuItem',
                tagIcon: 'el-menu-item',
                props: {
                  slot: 'title',
                },
                content: '导航二',
                iconClassName: 'el-icon-menu'
              },
              {
                layout: 'elMenuItem',
                tagIcon: 'el-menu-item',
                props: {
                  slot: 'title',
                },
                content: '导航三',
                iconClassName: 'el-icon-menu'
              }
            ],
            type: 'default',
            justify: 'start',
            align: 'top'
          },
          {
            layout: 'elForm',
            tagIcon: 'el-form',
            label: '子表单',
            style: {
              flexDirection: 'row',
              display: 'flex',
              padding: '10',
              flex: 2,
              backgroundColor: '#E1FFFF',
              width: '100%',
              height: '100%'
            },
            props: {
            },
            children: [
              {
                layout: 'elInput',
                tagIcon: 'el-input',
                label: '输入框',
                style: {
                  flexDirection: 'row',
                  padding: '10',
                  width: '100%',
                  height: '100%'
                },
                props: {
                  placeholder: '请输入名称',
                  span: 12,
                  value: '1'
                },
              }
            ],
          },
          {
            layout: 'elInput',
            tagIcon: 'el-input',
            label: '输入框',
            style: {
              flexDirection: 'row',
              padding: '10',
              width: '100%',
              height: '100%'
            },
            props: {
              placeholder: '请输入名称',
              span: 12,
              value: '1'
            },
          },
          {
            layout: 'elRadio',
            tagIcon: 'el-radio',
            label: '单选框',
            style: {
              flexDirection: 'row',
              padding: '10',
              width: '100%',
              height: '100%'
            },
            props: {
              placeholder: '请输入名称',
              span: 12,
              value: '1'
            },
          }
          /*{
            layout: 'echart',
            label: '柱状图',
            type: 'bar',
            data: {
              category: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              legend: ['男生', '女生'],
              value: [120, 200, 150, 80, 70, 110, 130]
            },
            style: {
              flexDirection: 'row',
              display: 'flex',
              padding: '10',
              flex: 2,
              backgroundColor: '#E1FFFF'
            },
          },
          {
            layout: 'echart',
            label: '折线图',
            type: 'line',
            data: {
              category: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              legend: ['男生', '女生'],
              value: [120, 200, 150, 80, 70, 110, 130]
            },
            style: {
              flexDirection: 'row',
              display: 'flex',
              padding: '10',
              flex: 2,
              backgroundColor: '#E1FFFF'
            },
          },*/
        ],
        leftElement: [
          {
            layout: 'clSub',
            label: '分布折线图',
            type: 'cChart',
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
          },
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
          },
          {
            layout: 'clPie',
            label: '分布饼图',
            type: 'cChart',
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
          }
        ],
        templateComponents: [
          {
            tempId: '1',
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
          },
        ],
        drawingList: [],
        activeData: {
          layout: 'rowFrame',
          tagIcon: 'row',
          label: '行布局框',
          layoutTree: true,
          document: 'https://element.eleme.cn/#/zh-CN/component/layout#row-attributes',
          style: {
            flexDirection: 'row',
            display: 'flex',
            padding: '10',
            flex: 2,
            backgroundColor: '#E1FFFF',
          },
          children: [],
          type: 'default',
          justify: 'start',
          align: 'top'
        },
        activeId: '',
        formConf: {
          span: 24,
          gutter: 10,
          flexDirection: 'row'
        },
        idGlobal: 0,
        dialogVisible: false,
        showFileName: false,
        operationType: '',
        generateConf: null,
        formData: {
          ref: '',
          hasForm: false,
          style: {},
          props: {},
          className: '',
          formItem: [
            {
              type: 'div',
              className: 'cross-frame',
              style: {
                flex: 1,
                display: 'flex',
                flexDirection: 'row',
                flexWarp: 'wrap',
                boxSizing: 'border-box',
                border: '1px solid blue',
                marginRight: '5px'
              }
            },
            {
              type: 'div',
              className: 'cross-frame',
              style: {
                flex: 1,
                display: 'flex',
                flexDirection: 'row',
                flexWarp: 'wrap',
                boxSizing: 'border-box',
                border: '1px solid blue',
                marginRight: '5px'
              }
            },
            {
              type: 'div',
              className: 'cross-frame',
              style: {
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                flexWarp: 'wrap',
                boxSizing: 'border-box',
                border: '1px solid blue'
              },
              children: [
                {
                  type: 'div',
                  className: 'cross-frame',
                  style: {
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'row',
                    flexWarp: 'wrap',
                    boxSizing: 'border-box',
                    border: '1px solid blue',
                    marginBottom: '5px'
                  },
                },
                {
                  type: 'div',
                  className: 'cross-frame',
                  style: {
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'row',
                    flexWarp: 'wrap',
                    boxSizing: 'border-box',
                    border: '1px solid blue',
                    marginBottom: '5px'
                  },
                },
                {
                  type: 'div',
                  className: 'cross-frame',
                  style: {
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'row',
                    flexWarp: 'wrap',
                    boxSizing: 'border-box',
                    border: '1px solid blue'
                  },
                }
              ]
            },
          ]
        },
        drawerVisible: false,
        previewVisible: false,
      }
    },
    mounted() {
      loadBeautifier(btf => {
        beautifier = btf
      })
      let datas = JSON.parse(JSON.stringify(this.templateComponents));
      this.addComponent(datas.find((item, index) => item.tempId === this.$route.params.id ) || [])
    },
    methods: {
      onEnd(obj) {
        if (obj.from !== obj.to) {
          this.fetchData(tempActiveData)
          this.activeData = tempActiveData
          this.activeId = this.idGlobal
        }
      },
      cloneComponent(origin) {
        const clone = deepClone(origin);
        const config = clone;
        console.log(config)
        config.span = this.formConf.span ;// 生成代码时，会根据span做精简判断
        this.createIdAndKey(clone); // 生成id 和 key
        clone.placeholder !== undefined && (clone.placeholder += config.label)
        tempActiveData = clone;
        return tempActiveData
      },
      createIdAndKey(item) {
        const config = item
        config.formId = ++this.idGlobal
        config.renderKey = `${config.formId}${+new Date()}` // 改变renderKey后可以实现强制更新组件
        if (config.layout === 'colFormItem') {
          item.__vModel__ = `field${this.idGlobal}`
        }
        else if (config.layout === 'rowFormItem' || config.layout === 'rowFrame') {
          !Array.isArray(config.children) && (config.children = [])
          delete config.label // rowFormItem无需配置label属性
        }
        config.componentName = `row${this.idGlobal}`
        if (config.layout === 'echart') {
          config.componentName = 'echart' + config.componentName
        }
        if (Array.isArray(config.children)) {
          config.children = config.children.map(childItem => this.createIdAndKey(childItem))
        }
        return item
      },
      addComponent(item) {
        if (item.length < 1) return false;
        const clone = this.cloneComponent(item)
        this.fetchData(clone)
        this.drawingList.push(clone)
        this.activeFormItem(clone)
      },
      fetchData(component) {
        const { dataType, method, url } = component
        if (dataType === 'dynamic' && method && url) {
          this.setLoading(component, true)
          this.$axios({
            method,
            url
          }).then(resp => {
            this.setLoading(component, false)
            this.setRespData(component, resp.data)
          })
        }
      },
      activeFormItem(currentItem) {
        this.activeData = currentItem;
        this.activeId = currentItem.formId
      },
      drawingItemCopy(item, list) {
        let clone = deepClone(item)
        clone = this.createIdAndKey(clone)
        list.push(clone)
        this.activeFormItem(clone)
      },
      drawingItemDelete(index, list) {
        list.splice(index, 1)
        this.$nextTick(() => {
          const len = this.drawingList.length
          if (len) {
            this.activeFormItem(this.drawingList[len - 1])
          }
        })
      },
      empty() {
        this.$confirm('确定要清空所有组件吗？', '提示', { type: 'warning' }).then(
          () => {
            this.drawingList = []
            this.idGlobal = 100
          }
        )
      },
      /**
       * 预览
       */
      preview() {
        this.formData = {
          layouts: deepClone(this.drawingList),
          conf: this.formConf
        }
        this.$store.commit('setPageData', this.formData);
        // this.$router.push('/preview');
        sessionStorage.setItem("pageData", JSON.stringify(this.formData));
        const routeData = this.$router.resolve({
          name: "preview"
        });
        window.open(routeData.href, "_blank");
        // this.previewVisible = true;
      },
      /**
       * 导出
       */
      download(data) {
        const func = this['execDownload']
        this.generateConf = {
          fileName: 'cs',
          type: 'file'
        }
        func && func(data)
      },
      execDownload(data) {
        const codeStr = this.generateCode();
        const blob = new Blob([codeStr], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, data.fileName);
      },
      generateCode() {
        const { type } = this.generateConf;
        this.AssembleFormData();
        // const script = vueScript(makeUpJs(this.formData, type))
        const html = vueTemplate(makeUpHtml(this.formData, type))
        // const css = cssStyle(makeUpCss(this.formData))
        return beautifier.html(html, beautifierConf.html)
      },
      run() {
        const func = this[`exec${titleCase('run')}`];
        this.generateConf = {fileName: undefined, type: 'file'};
        func && func(data)
      },
      execRun(data) {
        this.AssembleFormData();
        this.drawerVisible = true
      },
      AssembleFormData() {
        this.formData = {
          layouts: deepClone(this.drawingList),
          conf: this.formConf
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .draw-container {
    width: 100%;
    height: 100%;
    display: flex;

    .left {
      flex: 1;
      height: 100%;
      .type-title {
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #333333;
        font-size: 16px;
      }
      .components-draggable{
        padding-bottom: 20px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: flex-start;
        .components-item {
          display: inline-block;
          width: 48%;
          margin: 1%;
          transition: transform 0ms !important;
          .components-body {
            padding: 8px 10px;
            background: #f6f7ff;
            font-size: 12px;
            cursor: move;
            border: 1px dashed #f6f7ff;
            border-radius: 3px;
            .svg-icon{
              color: #777;
              font-size: 15px;
            }
            &:hover {
              border: 1px dashed #787be8;
              color: #787be8;
              .svg-icon {
                color: #787be8;
              }
            }
          }
        }
      }
    }

    .center {
      flex: 6;
      background: antiquewhite;
      height: 100%;
      display: flex;
      flex-direction: column;

      .action-bar{
        position: relative;
        height: 42px;
        text-align: right;
        padding: 0 15px;
        box-sizing: border-box;;
        border: 1px solid #f1e8e8;
        background: #ffffff;
        border-top: none;
        border-left: none;
        width: 100%;
        .delete-btn{
          color: #F56C6C;
          line-height: 1;
          white-space: nowrap;
          cursor: pointer;
          background: #FFF;
          border: 1px solid #DCDFE6;
          -webkit-appearance: none;
          text-align: center;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          outline: 0;
          margin: 0;
          -webkit-transition: .1s;
          transition: .1s;
          font-weight: 500;
          padding: 12px 20px;
          font-size: 14px;
          border-radius: 4px;
          display: inline-block;
        }
      }

      .operate-view {
        height: 42px;
        padding: 0 15px;
        text-align: right;
        border: 1px solid #f1e8e8;
        background: #ffffff;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }

      .drawing-board {
        width: 100%;
        flex: 1;
        ::v-deep .drawing-row-item {
          position: relative;
          cursor: move;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          border: 1px dashed #ccc;
          border-radius: 3px;
          padding: 0 2px;
          margin-bottom: 15px;
          margin-right: 15px;
          .component-name {
            position: absolute;
            top: 0;
            left: 0;
            font-size: 12px;
            color: #bbb;
            display: inline-block;
            padding: 0 6px;
          }
          .drawing-item-copy {
            display: none;
            position: absolute;
            top: -10px;
            width: 22px;
            height: 22px;
            line-height: 22px;
            text-align: center;
            border-radius: 50%;
            font-size: 12px;
            border: 1px solid;
            cursor: pointer;
            z-index: 1;
          }
          .drawing-item-delete {
            display: none;
            position: absolute;
            top: -10px;
            width: 22px;
            height: 22px;
            line-height: 22px;
            text-align: center;
            border-radius: 50%;
            font-size: 12px;
            border: 1px solid;
            cursor: pointer;
            z-index: 1;
          }
          .drag-wrapper .drawing-row-item {
            margin-top: 20px;
          }
        }
        ::v-deep .active-from-item > .drawing-item-copy {
          display: initial;
        }
        ::v-deep .active-from-item > .drawing-item-delete {
          display: initial;
        }
        ::v-deep .drag-wrapper > .drawing-row-item {
          margin-right: 0;
        }
        ::v-deep .drawing-row-item.active-from-item {
          border: 1px dashed #409EFF;
          .drawing-item-copy {
            right: 46px;
            border-color: #409EFF;
            color: #409EFF;
            background: #fff;
          }
          .drawing-item-delete {
            right: 14px;
            border-color: #F56C6C;
            color: #F56C6C;
            background: #fff;
          }
        }
      }
    }

    .right {
      flex: 2;
      height: 100%;
    }

    .dialog {
      font-size: 12px;
      ::v-deep .flex-view {
        height: 80vh;
      }
    }
  }
</style>



<script>
  import draggable from 'vuedraggable'
  import render from './render/render'
  import echartMixin from './build/mixins';

  const components = {
    itemBtns(h, currentItem, index, list) {
      console.log(currentItem, index, list);
      const { copyItem, deleteItem } = this.$listeners;
      return [
        <span class="drawing-item-copy" title="复制" onClick={event => {
        copyItem(currentItem, list); event.stopPropagation()
      }}>
    <i class="el-icon-copy-document" />
        </span>,
        <span class="drawing-item-delete" title="删除" onClick={event => {
        deleteItem(index, list); event.stopPropagation()
      }}>
    <i class="el-icon-delete" />
        </span>
    ]
    },
    vnBtns(h, currentItem, index, list) {
      const { copyItem, deleteItem } = this.$listeners;
      let copyBtn = h('span', {
        class: 'drawing-item-copy',
        props: {
          title: '复制',
        },
        on: {
          click: () => {
            copyItem(currentItem, list);
            event.stopPropagation();
          }
        }
      }, [h('i', {class: 'el-icon-copy-document'}, [])]);
      let deleteBtn = h('span', {
        class: 'drawing-item-delete',
        props: {
          title: '删除',
        },
        on: {
          click: () => {
            deleteItem(index, list);
            event.stopPropagation();
          }
        }
      }, [h('i', {class: 'el-icon-delete'}, [])]);
      return [copyBtn, deleteBtn];
    }
  }
  const layoutt = {
    rowFormItem(h, currentItem, index, list) {
      const { activeItem } = this.$listeners
      const config = currentItem
      const className = this.activeId === config.formId
        ? 'drawing-row-item active-from-item'
        : 'drawing-row-item'
      let child = renderChildren.apply(this, arguments);
      return (
        <el-col span={24}>
        <el-row gutter={0} class={className}
      nativeOnClick={event => { activeItem(currentItem); event.stopPropagation() }}>
    <span class="component-name">{config.componentName}</span>
        <draggable list={config.children || []} animation={340}
      group="componentsGroup" class="drag-wrapper">
        {child}
        </draggable>
      {components.itemBtns.apply(this, arguments)}
    </el-row>
      </el-col>
    )
    },
    rowFrame(h, currentItem, index, list) {
      const { activeItem } = this.$listeners;
      const config = currentItem;
      const className = this.activeId === config.formId
        ? 'drawing-row-item active-from-item'
        : 'drawing-row-item';
      let child = renderChildren.apply(this, arguments);
      let name = h('span', { class: 'component-name' }, config.componentName);
      let draggable = h('draggable', {
        props: {
          animation: 340,
          group: 'componentsGroup',
          list: config.children || []
        },
        attrs: {
          animation: 340,
          group: 'componentsGroup',
          list: config.children || []
        },
        style: {
          width: '100%',
          ...config.style
        },
        class: 'drag-wrapper'
      }, child);
      return h('div', {
        on: {
          click: () => {
            activeItem(currentItem);
            event.stopPropagation();
          }
        },
        style: {
          ...config.style,
          padding: config.style.padding + 'px'
        },
        class: className,
      }, [name, draggable, ...components.vnBtns.apply(this, arguments)]);
      /*return (
        <div style={`flex:${config.style.flex}`}  class={className}
      onClick={event => { activeItem(currentItem); event.stopPropagation() }}>
    <span class="component-name">{config.componentName}</span>
        <draggable list={config.children || []} animation={340}
      group="componentsGroup" style={config.style} class="drag-wrapper">
        {child}
        </draggable>
      {components.itemBtns.apply(this, arguments)}
    </div>
    )*/
    },
    elForm(h, currentItem, index, list) {
      const { activeItem } = this.$listeners;
      const config = currentItem;
      const className = this.activeId === config.formId
        ? 'drawing-row-item active-from-item'
        : 'drawing-row-item';
      let child = renderChildren.apply(this, arguments);
      let name = h('span', { class: 'component-name' }, config.componentName);
      let draggable = h('draggable', {
        props: {
          animation: 340,
          group: 'componentsGroup',
          list: config.children || []
        },
        attrs: {
          animation: 340,
          group: 'componentsGroup',
          list: config.children || []
        },
        style: {
          width: '100%',
          ...config.style
        },
        class: 'drag-wrapper'
      }, [child]);
      let form = h('el-form', {
        attrs: {
        },
        style: {
          width: '100%',
          height: '100%',
          ...config.style
        },
      }, [draggable]);
      return h('div', {
        on: {
          click: () => {
            activeItem(currentItem);
            event.stopPropagation();
          }
        },
        style: {
          ...config.style,
          padding: config.style.padding + 'px'
        },
        class: className,
      }, [name, form, ...components.vnBtns.apply(this, arguments)]);
    },
    elInput(h, currentItem, index, list) {
      const { activeItem } = this.$listeners;
      const config = currentItem;
      const className = this.activeId === config.formId
        ? 'drawing-row-item active-from-item'
        : 'drawing-row-item';
      let child = renderChildren.apply(this, arguments);
      let vNode = h('el-input', {
        props: {
          ...config.props,
        },
        attrs: {
          value: config.props.value
        },
        style: config.style,
        slot: config.slot
      }, child);
      return h('el-form-item', {
        attrs: {
          label: '输入框'
        }
      }, [vNode, ...components.vnBtns.apply(this, arguments)]);
    },
    elRadio(h, currentItem, index, list) {
      const { activeItem } = this.$listeners;
      const config = currentItem;
      const className = this.activeId === config.formId
        ? 'drawing-row-item active-from-item'
        : 'drawing-row-item';
      let child = renderChildren.apply(this, arguments);
      let vNode = h('el-radio', {
        props: {
          ...config.props,
        },
        attrs: {
          value: config.props.value
        },
        style: config.style,
        slot: config.slot
      }, child);
      return h('el-form-item', {
        attrs: {
          label: '输入框'
        }
      }, [vNode, ...components.vnBtns.apply(this, arguments)]);
    },
    echart(h, currentItem, index, list) {
      const config = currentItem;
      const { activeItem } = this.$listeners;
      const className = this.activeId === config.formId
        ? 'drawing-row-item active-from-item'
        : 'drawing-row-item';
      let name = h('span', { class: 'component-name' }, config.componentName);
      return h('div', {
        on: {
          click: () => {
            activeItem(currentItem);
            event.stopPropagation();
          }
        },
          class: className,
          style: {
            ...config.style,
          },
        attrs: {
          id: currentItem.componentName
        },
        ref: currentItem.componentName
        },[name, ...components.vnBtns.apply(this, arguments)]
      )
    },
    elTabs(h, currentItem, index, list) {
      const { activeItem } = this.$listeners;
      const config = currentItem;
      const className = this.activeId === config.formId
        ? 'drawing-row-item active-from-item'
        : 'drawing-row-item';
      let child = renderChildren.apply(this, arguments);
      let vNode = h('el-tabs', {
        props: {
          ...config.props,
        },
        style: config.style,
        slot: config.slot
      }, child);
      return h('div', {
        on: {
          click: () => {
            activeItem(currentItem);
            event.stopPropagation();
          }
        },
        class: className,
      }, [vNode, ...components.vnBtns.apply(this, arguments)]);
    },
    elTabPane(h, currentItem, index, list) {
      return h('el-tab-pane', {
        props: {
          ...currentItem.props,
        },
        style: currentItem.style,
        slot: currentItem.slot
      }, [])
    },
    elMenu(h, currentItem, index, list) {
      const { activeItem } = this.$listeners;
      const config = currentItem;
      const className = this.activeId === config.formId
        ? 'drawing-row-item active-from-item'
        : 'drawing-row-item';
      let child = renderChildren.apply(this, arguments);
      let vNode = h('el-menu', {
        props: {
          ...config.props,
        },
        on: {
        },
        mode: {
          value: config.props.mode
        },
        style: config.style,
        slot: config.slot
      }, child);
      return h('div', {
        on: {
          click: () => {
            activeItem(currentItem);
            event.stopPropagation();
          }
        },
        class: className,
      }, [vNode, ...components.vnBtns.apply(this, arguments)]);
    },
    elMenuItem(h, currentItem, index, list) {
      let i = h('i', {
        class: currentItem.iconClassName
      }, []);
      let span = h('span', {
        props: {
          ...currentItem.props
        }
      }, currentItem.content);
      return h('el-menu-item', {
        props: {
          index: (index + 1).toString()
        }
      }, [i, span])
    },
    clSub(h, currentItem, index, list) {
      const config = currentItem;
      const { activeItem } = this.$listeners;
      return h('cl-sub', {
        props: {
          refName: config.componentName,
          styleOption: config.style,
          chartData: config.data
        }
      })
    },
    clDis(h, currentItem, index, list) {
      const config = currentItem;
      const { activeItem } = this.$listeners;
      const renderKey = config.formId + new Date();
      return h('cl-dis', {
        props: {
          refName: config.componentName,
          styleOption: config.style,
          chartData: config.data,
          sql: config.sql,
          dataModel: config.dataModel,
          category: config.category,
          legend: config.legend
        }
      })
    },
    clPie(h, currentItem, index, list) {
      const config = currentItem;
      const { activeItem } = this.$listeners;
      const renderKey = config.formId + new Date();
      return h('cl-pie', {
        props: {
          refName: config.componentName,
          styleOption: config.style,
          chartData: config.data
        }
      })
    }
  };
  function renderChildren(h, currentItem, index, list) {
    const config = currentItem
    if (!Array.isArray(config.children)) return null
    return config.children.map((el, i) => {
      const layout = layoutt[el.layout]
      if (layout) {
        return layout.call(this, h, el, i, config.children)
      }
      return layoutIsNotFound.call(this)
    })
  }
  function layoutIsNotFound() {
    throw new Error(`没有与${this.currentItem.layout}匹配的layout`)
  }
  export default {
    name: "DraggableItem",
    mixins: [echartMixin],
    components: {
      draggable
    },
    watch: {
      'drawingList': {
        deep:true, //深度监听设置为 true
        handler: function (newV, oldV) {
          this.renderEChart();
        }
      }
    },
    props: [
      'currentItem',
      'index',
      'drawingList',
      'activeId',
      'formConf'
    ],
    render(h) {
      console.log(this.drawingList)
      const layout = layoutt[this.currentItem.layout]
      if (layout) {
        return layout.call(this, h, this.currentItem, this.index, this.drawingList)
      }
      return layoutIsNotFound.call(this)
    }
  }
</script>


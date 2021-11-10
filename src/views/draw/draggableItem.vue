<script>
  import draggable from 'vuedraggable'
  import render from './render/render'
  import echartMixin from './build/mixins';

  const components = {
    itemBtns(h, currentItem, index, list) {
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
            deleteItem(currentItem, list);
            event.stopPropagation();
          }
        }
      }, [h('i', {class: 'el-icon-delete'}, [])]);
      return [copyBtn, deleteBtn];
    }
  }
  const layouts = {
    colFormItem(h, currentItem, index, list) {
      const { activeItem } = this.$listeners
      const config = currentItem
      const child = renderChildren.apply(this, arguments)
      let className = this.activeId === config.formId ? 'drawing-item active-from-item' : 'drawing-item'
      if (this.formConf.unFocusedComponentBorder) className += ' unfocus-bordered'
      let labelWidth = config.labelWidth ? `${config.labelWidth}px` : null
      if (config.showLabel === false) labelWidth = '0'
      return (
        <el-col span={config.span} class={className}
      nativeOnClick={event => { activeItem(currentItem); event.stopPropagation() }}>
    <el-form-item label-width={labelWidth}
      label={config.showLabel ? config.label : ''} required={config.required}>
        <render key={config.renderKey} conf={currentItem} onInput={ event => {
        this.$set(config, 'defaultValue', event)
      }}>
      {child}
    </render>
      </el-form-item>
      {components.itemBtns.apply(this, arguments)}
    </el-col>
    )
    },
    rowFormItem(h, currentItem, index, list) {
      const { activeItem } = this.$listeners
      const config = currentItem
      const className = this.activeId === config.formId
        ? 'drawing-row-item active-from-item'
        : 'drawing-row-item'
      let child = renderChildren.apply(this, arguments)
      if (currentItem.type === 'flex') {
        child = <el-row type={currentItem.type} justify={currentItem.justify} align={currentItem.align}>
          {child}
          </el-row>
      }
      return (
        <el-col span={config.span}>
        <el-row gutter={config.gutter} class={className}
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
    raw(h, currentItem, index, list) {
      const config = currentItem
      const child = renderChildren.apply(this, arguments)
      return <render key={config.renderKey} conf={currentItem} onInput={ event => {
        this.$set(config, 'defaultValue', event)
      }}>
      {child}
    </render>
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
      const layout = layoutt[this.currentItem.layout]
      if (layout) {
        return layout.call(this, h, this.currentItem, this.index, this.drawingList)
      }
      return layoutIsNotFound.call(this)
    }
  }
</script>


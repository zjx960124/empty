const componentObj = {
  'input': function generateInputComponent(h, formData = {}, obj, vm)  {
  const key = obj.key || '';
  let children = [];

  if (obj.children) { // input有子集
    children = obj.children.map((item) => {
      let component
      if (item.type === 'span') {  //复合型输入框情况
        component = h('span', {
          slot: item.slot
        }, [item.text])
      } else {
        let func = componentObj[item.type]
        component = func? func.call(vm, h, formData, item, vm) : null
      }
      return component
    })
  }

  return h('el-input', {
    props: {
      value: key? formData[key] : '',
      ...obj.props
    },
    style: obj.style,
    on: {
      ...translateEvents(obj.events, vm), //时间绑定
      input(val) {
        if (key) {
          formData[key] = val
        }
      }
    },
    slot: obj.slot
  }, children)
   //事件bind
    function translateEvents(events = {}, vm, formData = {}) {
      const result = {}
      for (let event in events) {
        result[event] = events[event].bind(vm, vm, formData);
      }

      return result
    }
},
  'select': function generateSelectComponent(h, formData = {}, obj, vm)  {
    const key = obj.key || '';
    let components = [];

    if (obj.children) {
      components = obj.children.map(item => {
        if (item.type === 'optionGroup') {
          return h('el-option', {
            props: item.props? item.props : item
          }, item.children.map(child => {
            return h('Option', {
              props: child.props ? child.props : child
            })
          }))
        } else {
          return h('el-option', {
            props: item.props? item.props : item
          })
        }
      })
    }

    return h('el-select', {
      props: {
        value: key? formData[key] : '',
        ...obj.props
      },
      style: obj.style,
      on: {
        ...translateEvents(obj.events, vm), //时间绑定
        input(val) {
          if (key) {
            formData[key] = val
          }
        }
      },
      slot: obj.slot
    }, components)
    //事件bind
    function translateEvents(events = {}, vm, formData = {}) {
      const result = {}
      for (let event in events) {
        result[event] = events[event].bind(vm, vm, formData);
      }
      return result
    }
  },
  'radio': function generateRadioComponent(h, formData = {}, obj, vm) {
    let key = obj.key || '';
    let components = [];

    if (obj.children) {
      components = obj.children.map(item => {
        if (item.type === 'optionGroup') {
          return h('el-option', {
            props: item.props? item.props : item
          }, item.children.map(child => {
            return h('Option', {
              props: child.props ? child.props : child
            })
          }))
        } else {
          return h('el-radio', {
            props: item.props? item.props : item
          }, item.text)
        }
      })
    }

    return h('el-radio-group', {
      props: {
        value: key? formData[key] : '',
        ...obj.props
      },
      style: obj.style,
      on: {
        ...translateEvents(obj.events, vm), //时间绑定
        input(val) {
          if (key) {
            formData[key] = val
          }
        }
      },
      slot: obj.slot
    }, components)
    //事件bind
    function translateEvents(events = {}, vm, formData = {}) {
      const result = {}
      for (let event in events) {
        result[event] = events[event].bind(vm, vm, formData);
      }
      return result
    }
  },
  'collapse': function generateCollapseComponent(h, formData = {}, obj, vm)  {
    const key = obj.key || '';
    let children = [];

    if (obj.children) { // input有子集
      children = obj.children.map((item) => {
        let component
        if (item.type === 'span') {  //复合型输入框情况
          component = h('span', {
            slot: item.slot
          }, [item.text])
        } else {
          let func = componentObj[item.type]
          component = func? func.call(vm, h, formData, item, vm) : null
        }
        return component
      })
    }

    return h('el-collapse', {
      props: {
        ...obj.props,
      },
      style: obj.style,
      slot: obj.slot
    }, children)
    //事件bind
    function translateEvents(events = {}, vm, formData = {}) {
      const result = {}
      for (let event in events) {
        result[event] = events[event].bind(vm, vm, formData);
      }

      return result
    }
  },
  'collapse-item': function generateCollapseComponent(h, formData = {}, obj, vm)  {
    const key = obj.key || '';
    let children = [];

    if (obj.children) { // input有子集
      children = obj.children.map((item) => {
        let component
        if (item.type === 'span') {  //复合型输入框情况
          component = h('span', {
            slot: item.slot
          }, [item.text])
        } else {
          // let func = componentObj[item.type]
          // component = func? func.call(vm, h, formData, item, vm) : null
          component = h('div', {}, [item.text])
        }
        return component
      })
    }
    console.log(obj)
    return h('el-collapse-item', {
      props: {
        ...obj.props,
        title: obj.props.title
      },
      domProps: {
        title: obj.title
      },
      style: obj.style,
      slot: obj.slot
    }, children)
  },
  'formItem': function generateFormItemComponent(h, option, component, formData) {
    return h('el-form-item', {
      style: option.style ? option.style : '',
      props: {
        model: option.key,
        label: option.label
      }
    }, [component])
  },
  'col': function generateColComponent(h, option, component, formData) {
    console.log(arguments)
    return h('el-col', {
      props: option.props
    }, [component])
  },
  'events': function generateEventsComponent(h, formData = {}, obj, vm) {
    const components = [];
    if(obj.submit) {
      const submit = h('el-button', {
        props: obj.submit.props,
        style: obj.submit.style,
        class: obj.submit.className,
        on: {
          click() {
            //提交前校验
            console.log(formData)
            vm.$refs[obj.ref].validate((valid) => {
              if (valid) {
                obj.submit.success.call(vm, formData, vm)
              } else {
                obj.submit.fail.call(vm, formData, vm)
              }
            })
          }
        }
      }, [obj.submit.text])

      components.push(submit)
    }
    if (obj.reset) {
      const reset = h('el-button', {
        props: obj.reset.props,
        style: {
          ...obj.reset.style,
        },
        class: obj.reset.className,
        on: {
          click() {
            console.log(formData)
            vm.$refs[obj.ref].resetFields() //重置表单
            obj.reset.success.call(vm, formData, vm);
          }
        }
      }, [obj.reset.text])

      components.push(reset)
    }

    return h('el-col',{
      class: 'vue-events',
      style: {
        ...obj.style
      }
    }, components)
  }
}
export default componentObj




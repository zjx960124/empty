// form-build.js
import componentObj from './build';
import { version } from '../../../../package';
import echarts from 'echarts';
import echartMixin from './mixins';

const formBuild = {
  mixins: [echartMixin],
  props: {
    options: {
      type: Object,
      required: true
    },
  },
  watch: {
    'options': {
      deep:true, //深度监听设置为 true
      handler: function (newV, oldV) {
        this.renderEChart();
      }
    }
  },
  render(h) {
    const options = this.options;
    const layouts = options.layouts;
    const conf = options.conf;
    const childComp = [];
    console.log(layouts);
    const layoutComponents = layouts.map((item, index) => {
      let func = componentObj[item.layout];
      return func ? func.call(this, h, item, conf, conf.gutter, layouts.length === index + 1, this) : null;
    });
    childComp.push(layoutComponents);
    return h('div', {
      attrs: {class: 'flex-view'},
      style: {
        display: 'flex',
        flexDirection: conf.flexDirection
      }
      }, [childComp]);
  },
}

const install = function (Vue, ops = {}) {
  Vue.component('formBuild', formBuild)
}

const API = {
  install,
  version
}

if (typeof window !== 'undefined' && window.vue) {
  install(window.vue)
}

export default API

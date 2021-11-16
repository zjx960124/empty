import ClSub from './sub/sub';
import ClDis from './dis/dis';
import ClPie from './pie/pie';

const components = [
  ClSub,
  ClDis,
  ClPie
];

const install = function(Vue, opts = {}) {

  components.forEach(component => {
    Vue.component(component.name, component);
  });

};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install
}

/* Automatically generated by './build/bin/build-entry.js' */

//import { CustomEventPlugin } from '@sinokit/utils';
import Ellipsis from './ellipsis/index.js';

const components = [
  Ellipsis
];

const install = function(Vue) {
 // Vue.use(CustomEventPlugin);

  components.forEach(component => {
    Vue.component(component.name, component);
  });


};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: '0.2.11',
  install,
  Ellipsis
};

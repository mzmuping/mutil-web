import { reactive, effect } from '../../../lib/vue3';

const observed = (window.observed = reactive({
  count: 0
}));
// const observed2 = (window.observed2 = reactive({
//   num: 0
// }));
// const observed3 = (window.observed3 = reactive({
//   count: 0
// }));
effect(() => {
  console.log('observed.count is: ', observed.count);
});

// effect(() => {
//   console.log('observed2.count is: ', observed2.num);
// });

// effect(() => {
//   console.log('observed3.count is: ', observed3.count);
// });

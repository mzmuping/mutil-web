import { ref, h, reactive } from '../core';
export default {
  render(context) {
    console.log('context==', context);
    let pre = h(
      'div',
      {
        class: 'min-1',
        ...context.style,
      },
      [
        h(
          'div',
          {
            class: 'min-1-1',
          },
          `${JSON.stringify(context.user)}`
        ),
        h(
          'div',
          {
            class: 'min-1-2',
          },
          `姓名：${context.user.name}`
        ),
        h(
          'div',
          {
            class: 'min-1-3',
          },
          `年龄：${context.user.age}`
        ),
      ]
    );

    let next = h(
      'div',
      {
        class: 'min-1',
      },
      [
        h(
          'div',
          {
            class: 'min-2',
          },
          `姓名：${context.user.name}`
        ),
        h(
          'p',
          {
            class: 'min-3',
          },
          `年龄：${context.user.age}`
        ),
      ]
    );

    let res = context.update.value ? next : pre;
    return res;
  },
  setup() {
    const count = ref(1);
    const style = reactive({
      class: 'ssss',
      'data-uid': 'sksks',
    });
    const update = ref(false);
    const user = reactive({
      name: '好运来',
      age: 28,
    });
    user['data-df'] = 'df';
    window.count = count;
    window.user = user;
    window.update = update;
    window.style = style;
    return {
      count,
      user,
      update,
      style,
    };
  },
};

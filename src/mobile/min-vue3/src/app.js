import { ref, h, reactive } from '../core';
export default {
  render(context) {
    console.log('context==', context);
    let pre = h(
      'div',
      {
        class: 'min-1'
      },
      [
        h(
          'div',
          {
            class: 'min-1'
          },
          `姓名：${context.user.name}`
        ),
        h(
          'div',
          {
            class: 'min-1'
          },
          `年龄：${context.user.age}`
        )
      ]
    );

    let next = h(
      'div',
      {
        class: 'min-1'
      },
      [
        h(
          'p',
          {
            class: 'min-1'
          },
          `姓名：${context.user.name}`
        ),
        h(
          'p',
          {
            class: 'min-1'
          },
          `年龄：${context.user.age}`
        )
      ]
    );

    let res = context.update.value ? next : pre;
    return res;
  },
  setup() {
    const count = ref(1);
    const update = ref(false);
    const user = reactive({
      name: '好运来',
      age: 28
    });
    window.count = count;
    window.user = user;
    window.update = update;
    return {
      count,
      user,
      update
    };
  }
};

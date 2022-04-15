import { reactive, ref } from '../core';
import { h } from '../core/h';
export default {
  render(context) {
    let pre = h(
      'div',
      {
        id: 'app-0' + context.state.count,
        class: 'min-vue'
      },
      [
        h(
          'div',
          {
            id: 'app-1',
            class: 'min-vue'
          },
          '1233' + context.state2.num
        ),
        h(
          'div',
          {
            id: 'app-1',
            class: 'min-vue'
          },
          String(context.state.count)
        ),
        h(
          'div',
          {
            id: 'min-1',
            class: 'min-vue'
          },
          [
            h(
              null,
              {
                id: 'min--child-1',
                class: 'min--child-1'
              },
              '测试'
            ),
            h(
              'div',
              {
                id: 'min--child-1',
                class: 'min--child-1'
              },

              'min--child-1' + String(context.state2.obj.obj.count)
            )
          ]
        )
      ]
    );
    let next = h(
      'div',
      {
        id: 'app-' + context.state.count,
        class: 'min-vue'
      },
      [
        h('div', {}, '1233'),
        h(
          'div',
          {
            id: 'app-1',
            class: 'min-vue'
          },
          String(context.state.count)
        ),
        h(
          'div',
          {
            id: 'min-1',
            class: 'min-vue'
          },
          [
            h(null, {}, '理货AA'),
            h(
              'div',
              {
                id: 'min--child-1',
                class: 'min--child-1'
              },
              String(context.state2.obj.obj.count)
            )
          ]
        )
      ]
    );
    console.log(context.sucess.value);
    let rh = context.sucess.value ? pre : next;
    return rh;
  },
  setup() {
    let sucess = ref(true);
    let state = reactive({
      count: 0
    });

    let state2 = reactive({
      num: 0,
      obj: {
        obj: {
          count: 10
        }
      }
    });

    console.log(sucess);
    window.state = state;
    window.state2 = state2;
    window.sucess = sucess;

    return {
      state,
      sucess,
      state2
    };
  }
};

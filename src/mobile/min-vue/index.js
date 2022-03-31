import { reactive, effectWatch } from './core';

const App = {
  render(context) {
    effectWatch(() => {
      document.body.innerHTML = '';
      let div = document.createElement('div');
      div.innerText = context.state.count;
      document.body.append(div);
    });
  },
  setup() {
    const state = reactive({
      count: 0
    });
    window.state = state;
    return { state };
  }
};

App.render(App.setup());

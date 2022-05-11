import { computed, effect, ref } from '../../../lib/vue3';

const count = (window.count = ref(1));
const num = (window.num = ref(1));

const c = (window.c = computed(() => {
    console.log('computed==');
    return count.value + 1;
}));
const c2 = (window.c2 = computed(() => {
    console.log('num=count=');
    return count.value + num.value + 1;
}));
const c3 = (window.c3 = computed({
    get() {
        return num.value + 1;
    },
    set(value) {
        num.value = value;
    },
}));
effect(() => {
    console.log('count.value is', count.value);
});

import { createApp } from 'vue';
// Register IntersectionObserver
const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        let lazyImage = entry.target;
        // 相交率，默认是相对于浏览器视窗
        if (entry.intersectionRatio > 0) {
            lazyImage.src = lazyImage.getAttribute('data-src');
            // 当前图片加载完之后需要去掉监听
            io.unobserve(lazyImage);
        }
    });
});

// Declares what to observe, and observes its properties.
const boxElList = document.querySelectorAll('img');
boxElList.forEach((el) => {
    io.observe(el);
});

/**
 * vue 自定义指令 预加载
 */
const app = createApp({});
app.directive('loayImage', {
    bind: function (el, binding, vnode) {
        console.log(el, binding, vnode);
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                let lazyImage = entry.target;
                // 相交率，默认是相对于浏览器视窗
                if (entry.intersectionRatio > 0) {
                    lazyImage.src = binding.value;
                    // 当前图片加载完之后需要去掉监听
                    io.unobserve(lazyImage);
                }
            });
        });
    },
});

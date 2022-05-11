/**
 * compose内的函数执行顺序为从右向左，
 * 即最右边的函数（最后一个参数）最先执行，
 * 执行完的结果作为参数传递给前一个函数（包裹它的函数），
 * 一直到整个函数执行完毕，return一个函数，
 * 所以compose内部实现的原理类似多米诺骨牌，层层递进的
 * @returns
 */
function compose() {
    let fns = Array.prototype.slice.call(arguments);
    return function (arg) {
        let res = arg;
        for (let i = fns.length - 1; i >= 0; i--) {
            let fn = fns[i];
            res = fn(res);
        }
        return res;
    };
}
/**
 * pipe函数与compose函数十分相近，也是一个函数执行完毕后将结果作为参数传递给另一个函数，
 * 但它们的区别仅在于pipe函数的接收的函数参数，
 * 是从左向右执行的，即第一个参数（函数）执行完毕，
 * 将结果吐出来作为参数传递给第二个函数，也就是pipe的第二个参数，
 * 直到pipe所有参数作为函数都执行完毕，return出一个函数，才算执行完成
 * @returns
 */
function pipe() {
    const fns = Array.prototype.slice.call(arguments);
    const content = this;
    return function () {
        const args1 = Array.prototype.slice.call(arguments);
        let count = 0;
        function next() {
            const args = Array.prototype.slice.call(arguments);
            const fn = fns.shift();
            count = fn.apply(content, args);
            if (fns.length > 0) {
                next(count);
            }
            return count;
        }

        return next.apply(null, args1);
    };
}

function addOne(num) {
    return num + 1;
}

function addTwo(num) {
    return num + 2;
}

function addThree(num) {
    return num + 3;
}

function addFour(num) {
    return num + 4;
}

const fn = pipe(addOne, addTwo, addThree, addFour);
const fn2 = compose(addOne, addTwo, addThree, addFour);

console.log(fn(1));
console.log(fn2(1));

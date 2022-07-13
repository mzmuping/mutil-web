/**
 * 正则表达式
 *
 */
// let hd = 'houdunren';
// console.log(/a|@/.test(hd));

// let tel = '010-999';
// console.log(/^(010|020)-\d{7,8}$/.test(tel));

// 元子表，元祖
// let reg = /[12345]/g;
// let str = '1234545';
// console.log(str.match(reg));

// let url = 'https://www.baidu.com';
// let reg = /http(s?):\/\/\w+\.\w+\.\w+/;
// console.log(reg.test(url));

// let hd = 'qq群:11111111,7777777,9999999999,倒垃圾发达';
// let reg = /(\d+),?/y;
// 80000@qq.com
document.querySelector('[name=email]').addEventListener('change', function () {
  let reg = /^[\w-]+@([\w-]+\.)(com|cn|org)$/i;
  console.log(reg.test(this.value));
});

let myobj = {
  ways: {
    google: {
      icon: 'https://static.kesiongames.com/google-pay.jpg',
      code: 'google_pay',
      name: 'google',
    },
    apple: {
      icon: 'https://www.baidu.com',
      code: 'apple_pay',
      name: 'ApplePay',
    },
    'Ngân hàng trực tuyến': [
      {
        icon: 'https://gfggfwq-resources.oss-cn-hongkong.aliyuncs.com/google-pay.jpg',
        code: 'upay_ATM',
        name: 'ATM',
      },
      {
        icon: 'https://static.kesiongames.com/google-pay.jpg',
        code: 'upay_VISA',
        name: 'visa',
      },
    ],
  },
};
console.log(Object.keys(myobj.ways));

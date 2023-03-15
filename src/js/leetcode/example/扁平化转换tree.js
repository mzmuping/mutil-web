let arr = [
  { id: 1, name: '部门1', pid: 0 },
  { id: 2, name: '部门2', pid: 1 },
  { id: 3, name: '部门3', pid: 1 },
  { id: 4, name: '部门4', pid: 3 },
  { id: 5, name: '部门5', pid: 4 },
  { id: 6, name: '部门6', pid: 0 },
  { id: 7, name: '部门7', pid: 6 },
  { id: 8, name: '部门8', pid: 7 },
  { id: 9, name: '部门9', pid: 8 },
  { id: 10, name: '部门10', pid: 9 },
];
let arr2 = [
  { id: 1, name: '部门1', pid: 0 },
  { id: 2, name: '部门2', pid: 1 },
  { id: 3, name: '部门3', pid: 1 },
  { id: 4, name: '部门4', pid: 3 },
  { id: 5, name: '部门5', pid: 4 },
  { id: 6, name: '部门6', pid: 0 },
  { id: 7, name: '部门7', pid: 6 },
  { id: 8, name: '部门8', pid: 7 },
  { id: 9, name: '部门9', pid: 8 },
  { id: 10, name: '部门10', pid: 9 },
];
/** 扁平化转换tree
 * id 与pid 是上下级关系
 * pid 是属于id下的

 */
const getArraytoTree = (arr) => {
  const saveMap = new Map();
  const result = [];

  arr.forEach((element) => {
    saveMap.set(element.id, element);
    const parent = saveMap.get(element.pid);
    if (!parent) {
      result.push(element);
    } else {
      !parent.children && (parent.children = []);
      parent.children.push(element);
    }
  });

  return result;
};

/** 递归方式 */
const fnAarrayToTree = (arr, pid = 0) => {
  const result = [];
  if (!arr.length) return;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].pid === pid) {
      arr[i].children = fnAarrayToTree(arr, arr[i].id);
      result.push(arr[i]);
    }
  }
  return result;
};

const treeData = getArraytoTree(arr);
const treeData2 = fnAarrayToTree(arr2);
console.log('扁平化转换tree=====', treeData);
console.log('扁平化转换treetreeData2=====', treeData2);

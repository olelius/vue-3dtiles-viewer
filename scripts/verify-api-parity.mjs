import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

const vue2Index = read('src/vue2/index.js');
const vue3Component = read('src/vue3/ThreeTilesViewer.vue');
const vue3Index = read('src/vue3/index.js');

const requiredMethods = [
  'resetCamera',
  'getBoundingSphere',
  'hideByGlobalIds',
  'showByGlobalIds',
  'highlightByGlobalIds',
  'clearHighlight'
];

const failures = [];

for (const method of requiredMethods) {
  if (!vue2Index.includes(`${method}(`)) {
    failures.push(`Vue2 入口缺少方法：${method}`);
  }
  if (!vue3Component.includes(`const ${method} =`) && !vue3Component.includes(`${method}()`) && !vue3Component.includes(`${method}:`)) {
    failures.push(`Vue3 组件缺少方法定义：${method}`);
  }
  if (!new RegExp(`expose\\([\\s\\S]*\\b${method}\\b[\\s\\S]*\\)`).test(vue3Component)) {
    failures.push(`Vue3 expose 缺少方法：${method}`);
  }
}

if (!new RegExp('expose\\([\\s\\S]*\\bviewer\\b[\\s\\S]*\\)').test(vue3Component)) {
  failures.push('Vue3 expose 缺少内部 viewer 调试入口');
}

if (!vue2Index.includes('ThreeTilesViewer.install')) {
  failures.push('Vue2 入口缺少 install 方法');
}

if (!vue3Index.includes('ThreeTilesViewer.install')) {
  failures.push('Vue3 入口缺少 install 方法');
}

if (failures.length > 0) {
  console.error(`API 一致性检查失败：\n- ${failures.join('\n- ')}`);
  process.exit(1);
}

console.log('API 一致性检查通过：Vue2 和 Vue3 暴露方法一致。');

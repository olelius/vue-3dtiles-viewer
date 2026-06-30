# vue-3dtiles-viewer

3D Tiles 查看器组件，支持 Vue2 和 Vue3。

## ✨ 特性

- 🎯 渲染 3D Tiles 模型
- 🖱️ 点击构件获取 GlobalId
- 👁️ 批量显隐构件
- 🎨 批量高亮构件（业务高亮与点击高亮分离）
- ⚡ 性能优化（GlobalId → Mesh 映射表）
- 🔧 支持 Vue2 和 Vue3

## 📦 安装

```bash
# 从本地安装
npm install file:../vue-3dtiles-viewer

# 从 Git 安装
npm install git+https://github.com/olelius/vue-3dtiles-viewer.git#v1.0.1

# 安装 peer 依赖
npm install three@0.167.0 3d-tiles-renderer@0.4.28
```

推荐在业务项目中一次性显式安装组件和 peer 依赖：

```bash
npm install git+https://github.com/olelius/vue-3dtiles-viewer.git#v1.0.1 three@0.167.0 3d-tiles-renderer@0.4.28
```

如果需要完全锁定测试版本，不希望 npm 自动升级到 `three@0.167.1` 这类补丁版本，请在业务项目的 `package.json` 中使用不带 `^` 的版本号：

```json
{
  "dependencies": {
    "vue-3dtiles-viewer": "git+https://github.com/olelius/vue-3dtiles-viewer.git#v1.0.1",
    "three": "0.167.0",
    "3d-tiles-renderer": "0.4.28"
  }
}
```

### 安装说明

- `git+https://...#v1.0.1` 会从 GitHub 拉取 Git 标签，通常比普通 npm 包安装慢；网络到 GitHub 不稳定时，安装耗时几分钟是正常现象。
- `three` 和 `3d-tiles-renderer` 是本组件的 `peerDependencies`。npm 7+ 可能会尝试自动安装缺失的 peer 依赖，但自动解析出的版本不一定是本项目验证过的版本。
- 如果业务项目中已经安装了满足范围的 `three`（例如 `>=0.158.0`），npm 通常会复用已有版本，不会主动覆盖 `package.json` 中的直接依赖声明。
- 如果业务项目中的 `three` 版本不满足范围，npm 可能报 peer dependency 冲突，或调整 `package-lock.json` 的依赖解析结果。
- 如果只想安装组件包、忽略 peer 依赖自动安装和冲突处理，可以使用：

```bash
npm install git+https://github.com/olelius/vue-3dtiles-viewer.git#v1.0.1 --legacy-peer-deps
```

使用 `--legacy-peer-deps` 后，需要业务项目自己确保已经安装可兼容的 `three` 和 `3d-tiles-renderer`，否则运行时可能报模块缺失或 API 不兼容。

## 🚀 使用

### Vue2 项目

**1. 配置 vue.config.js：**

```javascript
module.exports = {
  transpileDependencies: [
    'vue-3dtiles-viewer'
  ]
};
```

**2. 使用组件：**

```vue
<template>
  <div class="app">
    <ThreeTilesViewer
      ref="viewer"
      :tileset-url="tilesetUrl"
      @select="handleSelect"
      @ready="handleReady"
    />
    <button @click="hideSelected">隐藏选中</button>
  </div>
</template>

<script>
import ThreeTilesViewer from 'vue-3dtiles-viewer/vue2';

export default {
  components: { ThreeTilesViewer },
  data() {
    return {
      tilesetUrl: '/tiles/tileset.json',
      selectedIds: []
    };
  },
  methods: {
    handleSelect(feature) {
      console.log('选中:', feature.globalId);
      this.selectedIds.push(feature.globalId);
    },
    handleReady() {
      console.log('加载完成');
    },
    hideSelected() {
      this.$refs.viewer.hideByGlobalIds(this.selectedIds);
    }
  }
};
</script>

<style>
.app { width: 100vw; height: 100vh; }
</style>
```

### Vue3 项目

**1. 使用组件：**

```vue
<template>
  <div class="app">
    <ThreeTilesViewer
      ref="viewer"
      :tileset-url="tilesetUrl"
      @select="handleSelect"
      @ready="handleReady"
    />
    <button @click="hideSelected">隐藏选中</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ThreeTilesViewer from 'vue-3dtiles-viewer/vue3';

const viewer = ref(null);
const tilesetUrl = '/tiles/tileset.json';
const selectedIds = ref([]);

const handleSelect = (feature) => {
  console.log('选中:', feature.globalId);
  selectedIds.value.push(feature.globalId);
};

const handleReady = () => {
  console.log('加载完成');
};

const hideSelected = () => {
  viewer.value.hideByGlobalIds(selectedIds.value);
};
</script>

<style>
.app { width: 100vw; height: 100vh; }
</style>
```

## 📖 API

### Props

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `tilesetUrl` | `String` | 是 | tileset.json 的路径 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `select` | `{ globalId, name, type }` | 点击构件时触发 |
| `ready` | - | 模型加载完成时触发 |
| `error` | `{ url, error }` | 加载错误时触发 |

### Methods

| 方法名 | 参数 | 说明 |
|--------|------|------|
| `resetCamera()` | - | 重置相机到模型中心视角 |
| `hideByGlobalIds(globalIds)` | `string[]` | 批量隐藏构件 |
| `showByGlobalIds(globalIds)` | `string[]` | 批量显示构件 |
| `highlightByGlobalIds(globalIds)` | `string[]` | 批量高亮构件（橙色） |
| `clearHighlight()` | - | 清除批量高亮 |

## 🔧 依赖版本

本组件基于以下版本开发和测试：
- `three@0.167.0`
- `3d-tiles-renderer@0.4.28`

支持版本范围：
- `three >= 0.158.0`
- `3d-tiles-renderer >= 0.3.0`

## ⚡ 性能优化

组件内部使用 **GlobalId → Mesh 映射表**优化批量操作性能：
- 10,000 mesh 场景，单次批量操作 < 1ms
- 适合频繁调用场景

## 📝 分发模式

本包采用 **dist 构建产物分发模式**：
- `core` 入口由 Rollup 构建为 CommonJS 和 ES Module
- `vue2` 入口由 vue-cli-service 构建为库产物
- `vue3` 入口由 Vite 构建为库产物
- 使用者项目按 peerDependencies 安装 `three` 和 `3d-tiles-renderer`，无需编译组件源码

Vue2 产物会内置 `3d-tiles-renderer`，避免 Vue2/Webpack 项目通过 CommonJS `require()` 解析该 ESM 包时失败。

## ✅ 验证状态

- Core/Vue2 构建已验证：`npm run build:core`、`npm run build:vue2`
- Vue2 独立消费方构建已验证：`vue2-test-project` 执行 `npm run build`
- Vue3 独立消费方验证单独进行，不纳入本次 1.0.1 文档收尾结论

## 🌐 浏览器兼容性

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

不支持 IE11。

## 📄 许可证

MIT

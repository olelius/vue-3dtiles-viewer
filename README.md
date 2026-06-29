# vue-3dtiles-viewer

3D Tiles 查看器组件，支持 Vue2 和 Vue3。

## 特性

- ✅ 渲染 3D Tiles 模型
- ✅ 点击构件获取 GlobalId
- ✅ 批量显隐构件
- ✅ 批量高亮构件（业务高亮与点击高亮分离）
- ✅ 性能优化（GlobalId → Mesh 映射表）
- ✅ 支持 Vue2 和 Vue3

## 安装

```bash
# 从 Git 安装
npm install git+https://github.com/yourname/vue-3dtiles-viewer.git#v1.0.0

# 安装 peer 依赖
npm install three@0.167.0 3d-tiles-renderer@0.4.28
```

## 使用

### Vue2 项目

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
    <button @click="highlightWalls">高亮墙体</button>
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
      console.log('选中构件:', feature.globalId);
      this.selectedIds.push(feature.globalId);
    },
    
    handleReady() {
      console.log('模型加载完成');
    },
    
    hideSelected() {
      this.$refs.viewer.hideByGlobalIds(this.selectedIds);
    },
    
    highlightWalls() {
      const wallIds = ['id1', 'id2', 'id3'];
      this.$refs.viewer.highlightByGlobalIds(wallIds);
    }
  }
};
</script>

<style>
.app {
  width: 100vw;
  height: 100vh;
}
</style>
```

### Vue3 项目

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
    <button @click="highlightWalls">高亮墙体</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ThreeTilesViewer from 'vue-3dtiles-viewer/vue3';

const viewer = ref(null);
const tilesetUrl = '/tiles/tileset.json';
const selectedIds = ref([]);

const handleSelect = (feature) => {
  console.log('选中构件:', feature.globalId);
  selectedIds.value.push(feature.globalId);
};

const handleReady = () => {
  console.log('模型加载完成');
};

const hideSelected = () => {
  viewer.value.hideByGlobalIds(selectedIds.value);
};

const highlightWalls = () => {
  const wallIds = ['id1', 'id2', 'id3'];
  viewer.value.highlightByGlobalIds(wallIds);
};
</script>

<style>
.app {
  width: 100vw;
  height: 100vh;
}
</style>
```

## API

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

## 依赖版本

本组件基于以下版本开发和测试：
- `three@0.167.0`
- `3d-tiles-renderer@0.4.28`

如果你的项目使用其他版本，欢迎反馈兼容性问题。

## 性能优化

组件内部使用 GlobalId → Mesh 映射表优化批量操作性能：
- 10,000 mesh 场景，单次批量操作 < 1ms
- 适合频繁调用场景

## 浏览器兼容性

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

不支持 IE11。

## 许可证

MIT

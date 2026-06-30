# Changelog

## [1.0.2] - 2026-06-30

### Changed
- 将推荐分发方式调整为 GitHub Release `.tgz` 附件安装。
- README 补充 `.tgz` 安装、Gitea Release 同类分发方式和 peer 依赖说明。
- 包版本更新为 `1.0.2`。

## [1.0.1] - 2026-06-30

### Fixed
- 修复 Vue2/Webpack 消费方通过 CommonJS 入口解析 `3d-tiles-renderer` ESM 包失败的问题。
- 调整 Vue2 入口构建，新增 `dist/vue2/index.esm.js` 作为 ES Module 入口。
- 补充 `./src/*` 导出，保留源码调试和临时验证入口。
- 对齐核心查看器行为，修复模型朝向、包围球、点击拾取和构件状态刷新相关问题。

### Changed
- 包版本更新为 `1.0.1`。
- README 明确说明 dist 构建产物分发模式和 peer 依赖安装方式。

### Verified
- 已验证 Core/Vue2 构建：`npm run build:core`、`npm run build:vue2`。
- 已验证 Vue2 独立消费方构建：`vue2-test-project` 执行 `npm run build`。
- Vue3 独立消费方构建尚未在本版本收尾中验证，后续单独处理。

## [1.0.0] - 2026-06-29

### Added
- 初始版本发布
- 支持 Vue2 和 Vue3
- 核心功能：
  - 渲染 3D Tiles 模型
  - 点击构件获取 GlobalId
  - 批量显隐构件（hideByGlobalIds / showByGlobalIds）
  - 批量高亮构件（highlightByGlobalIds / clearHighlight）
  - 相机重置（resetCamera）
- 性能优化：GlobalId → Mesh 映射表
- 高亮分离：点击高亮与业务高亮互不干扰
- 测试版本：three@0.167.0 + 3d-tiles-renderer@0.4.28

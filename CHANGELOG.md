# Changelog

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
- 高亮分离：点击高亮（浅蓝色）与业务高亮（橙色）互不干扰
- 测试版本：three@0.167.0 + 3d-tiles-renderer@0.4.28

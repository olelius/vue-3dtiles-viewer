<template>
  <div ref="container" class="tiles-viewer"></div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { TilesViewer } from '../core';

export default {
  name: 'ThreeTilesViewer',
  
  props: {
    tilesetUrl: {
      type: String,
      required: true
    }
  },

  emits: ['select', 'ready', 'error'],

  setup(props, { emit, expose }) {
    const container = ref(null);
    const viewer = ref(null);

    onMounted(() => {
      viewer.value = new TilesViewer({
        container: container.value,
        tilesetUrl: props.tilesetUrl,
        onSelect: (feature) => {
          emit('select', feature);
        },
        onReady: () => {
          emit('ready');
        },
        onError: (error) => {
          emit('error', error);
        }
      });
    });

    onBeforeUnmount(() => {
      if (viewer.value) {
        viewer.value.destroy();
      }
    });

    const resetCamera = () => {
      if (viewer.value) {
        viewer.value.resetCamera();
      }
    };

    const hideByGlobalIds = (globalIds) => {
      if (viewer.value) {
        viewer.value.hideByGlobalIds(globalIds);
      }
    };

    const showByGlobalIds = (globalIds) => {
      if (viewer.value) {
        viewer.value.showByGlobalIds(globalIds);
      }
    };

    const highlightByGlobalIds = (globalIds) => {
      if (viewer.value) {
        viewer.value.highlightByGlobalIds(globalIds);
      }
    };

    const clearHighlight = () => {
      if (viewer.value) {
        viewer.value.clearHighlight();
      }
    };

    expose({
      resetCamera,
      hideByGlobalIds,
      showByGlobalIds,
      highlightByGlobalIds,
      clearHighlight
    });

    return {
      container
    };
  }
};
</script>

<style scoped>
.tiles-viewer {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>

<template>
  <div ref="container" class="tiles-viewer"></div>
</template>

<script>
import { TilesViewer } from '../core';

export default {
  name: 'ThreeTilesViewer',
  
  props: {
    tilesetUrl: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      viewer: null
    };
  },

  mounted() {
    this.viewer = new TilesViewer({
      container: this.$refs.container,
      tilesetUrl: this.tilesetUrl,
      onSelect: (feature) => {
        this.$emit('select', feature);
      },
      onReady: () => {
        this.$emit('ready');
      },
      onError: (error) => {
        this.$emit('error', error);
      }
    });
  },

  beforeDestroy() {
    if (this.viewer) {
      this.viewer.destroy();
    }
  },

  methods: {
    resetCamera() {
      if (this.viewer) {
        this.viewer.resetCamera();
      }
    },

    getBoundingSphere() {
      if (this.viewer) {
        return this.viewer.getBoundingSphere();
      }
      return null;
    },

    hideByGlobalIds(globalIds) {
      if (this.viewer) {
        this.viewer.hideByGlobalIds(globalIds);
      }
    },

    showByGlobalIds(globalIds) {
      if (this.viewer) {
        this.viewer.showByGlobalIds(globalIds);
      }
    },

    highlightByGlobalIds(globalIds) {
      if (this.viewer) {
        this.viewer.highlightByGlobalIds(globalIds);
      }
    },

    clearHighlight() {
      if (this.viewer) {
        this.viewer.clearHighlight();
      }
    }
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

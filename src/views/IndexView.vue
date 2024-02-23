<script setup>
import { ref, defineAsyncComponent } from 'vue'
const buildComponent = defineAsyncComponent(() => import('../components/BuildComponent.vue'))
const runComponent = defineAsyncComponent(() => import('../components/RunComponent.vue'))
const activeName = ref('build')
</script>
<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <el-tabs v-model="activeName" class="demo-tabs">
          <el-tab-pane label="构建SpringBoot镜像" name="build" />
          <el-tab-pane label="运行容器" name="run" />
        </el-tabs>
      </div>
    </template>
    <div v-show="activeName == 'build'">
      <buildComponent />
    </div>
    <div v-show="activeName == 'run'">
      <runComponent />
    </div>
  </el-card>
</template>
<style scoped>
/**
不使用tab标签页内容，只使用tab标签页标头，覆盖tab组件样式让tab组件能够无缝贴在card组件中
*/
::v-deep .el-card__header {
  padding: 0px 3px;
  border-bottom: 1px solid var(--el-card-border-color);
  box-sizing: border-box;
  height: 43px;
}

::v-deep .el-tabs__header {
  padding: 0;
  position: relative;
  bottom: -5px;
}
</style>
<style>
.dockerfile_content {
  background-color: #e9edf1;
  padding: 10px 5px;
  margin-bottom: 20px;
}

.dockerfile_content span {
  font-family: Consolas, Monaco, Andale Mono, Ubuntu Mono, monospace;
  font-size: 13.6px;
  font-weight: 400;
  line-height: 1.4em;
}

.dockerfile_content .annotation {
  color: #999999;
}

.dockerfile_content .parameter {
  color: #e0425c;
}

.dockerfile_content .value {
  color: #676767;
  
}
</style>

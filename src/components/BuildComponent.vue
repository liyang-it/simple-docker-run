<script setup>
import { reactive, computed } from 'vue'
// springboot表单
const form = reactive({
  JERNAME: "demo.jar",
  JARWORKDIR: "E:/jar",
  FROM: "openjdk:8-jdk-alpine",
  WORKDIR: "/app",
  EXPOSE: "8080",
  VERSION: "0.0.1",
  JARRUNS: [
    { "run": "-Xmx512m" },
    { "run": "-Xms128m" }
  ]
})

// 添加Jvm命令
function addRun() {
  form.JARRUNS.push({ "run": "" })
}
// 删除Jvm命令
function delRun(index) {
  if (form.JARRUNS.length >= 1) {
    const array = form.JARRUNS
    form.JARRUNS = array.slice(0, index).concat(array.slice(index + 1))
  }
}
const dockerFileConter = computed(() => {
  // 使用数组方式拼接字符串，不使用 += 方式拼接
  const htmlArray = []
  htmlArray.push(`<span class="annotation"># Dockerfile配置属性</span><br/><br/>`)

  // JDK 版本
  htmlArray.push(`<p><span class="annotation"># 使用指定JDK版本作为基础镜像</span></p>`)
  htmlArray.push(`<p><span class="parameter">FROM</span>  <span class="value">${form.FROM}</span></p><br/>`)

  // 版本号标签
  htmlArray.push(`<p><span class="annotation"># 定义版本号标签</span></p>`)
  htmlArray.push(`<p><span class="parameter">LABEL</span>  <span class="value">version=${form.VERSION}</span></p><br/>`)

  // 工作目录
  htmlArray.push(`<p><span class="annotation"># 设置工作目录,jar程序,以及程序运行期间所产生的文件都在容器这个目录内</span></p>`)
  htmlArray.push(`<p><span class="parameter">WORKDIR</span>  <span class="value">${form.WORKDIR}</span></p><br/>`)

  // jar文件复制到容器
  htmlArray.push(`<p><span class="annotation"># 将Dockerfile文件在同一目录下的jar包复制到容器的/app目录下</span></p>`)
  htmlArray.push(`<p><span class="parameter">COPY</span>  <span class="value">${form.JERNAME}  ${form.WORKDIR}/${form.JERNAME}</span></p><br/>`)

  // 程序端口
  htmlArray.push(`<p><span class="annotation"># 暴露应用程序的端口,与YML server.port 一致</span></p>`)
  htmlArray.push(`<p><span class="parameter">EXPOSE</span>  <span class="value">${form.EXPOSE}</span></p><br/>`)

  // 程序运行命令
  if (form.JARRUNS.length === 0) {
    htmlArray.push(`<p><span class="annotation"># 启动应用程序</span></p>`)
    htmlArray.push(`<p><span class="parameter">ENTRYPOINT</span>  <span class="value">["java", "-jar", "${form.WORKDIR}/${form.JERNAME}"]</span></p>`)
  } else {
    htmlArray.push(`<p><span class="annotation"># 启动应用程序</span></p>`)
    const runs = []
    for (let i = 0, size = form.JARRUNS.length; i < size; i++) {
      runs.push(`"${form.JARRUNS[i].run}", `)
    }
    htmlArray.push(`<p><span class="parameter">ENTRYPOINT</span>  <span class="value">["java", ${runs.join("")} "-jar", "${form.WORKDIR}/${form.JERNAME}"]</span></p>`)
  }

  return htmlArray.join("")
})
</script>
<template>
  <div>
    <el-form :model="form" label-width="138px">
      <!-- <el-form-item label="jar路径">
        <el-tooltip class="box-item" effect="dark" content="jar所在的宿主机路径" placement="top-start">
          <el-input v-model="form.JARWORKDIR" />
        </el-tooltip>
      </el-form-item> -->
      <el-form-item label="jar文件">
        <el-tooltip class="box-item" effect="dark" content="jar完整名称，jar文件与Dockerfile文件在同一目录" placement="top-start">
          <el-input v-model="form.JERNAME" />
        </el-tooltip>
      </el-form-item>
      <el-form-item label="FROM(JDK版本)">
        <el-radio-group v-model="form.FROM" class="ml-4">
          <el-radio label="openjdk:8-jdk-alpine">OpenJdk8</el-radio>
          <el-radio label="openjdk:17-jdk-alpine">OpenJdk17</el-radio>
          <el-radio label="openjdk:21-jdk-alpine">OpenJdk21</el-radio>
          <el-tooltip class="box-item" effect="dark" content="指定jar运行的jdk版本" placement="top-start">
            <el-input v-model="form.FROM" />
          </el-tooltip>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="镜像版本">
        <el-input v-model="form.VERSION" />
      </el-form-item>
      <el-form-item label="容器工作目录">
        <el-tooltip class="box-item" effect="dark" content="程序运行期间所产生的文件都在容器这个目录内" placement="top-start">
          <el-input v-model="form.WORKDIR" />
        </el-tooltip>
      </el-form-item>
      <el-form-item label="暴露应用程序的端口">
        <el-tooltip class="box-item" effect="dark" content="与YML server.port 一致" placement="top-start">
          <el-input v-model="form.EXPOSE" />
        </el-tooltip>
      </el-form-item>
      <el-form-item label="jar运行参数">
        <el-tooltip class="box-item" effect="dark" content="jar运行参数, -Xms等" placement="top-start">
          <el-table :data="form.JARRUNS" style="width: 100%" border
            :header-cell-style="{ background: '#eee', color: '#606266' }" size="small">
            <el-table-column prop="run" label="jvm参数" width="180">
              <template #default="scope">
                <el-input size="small" v-model="scope.row.run" />
              </template>
            </el-table-column>
            <el-table-column width="180">
              <template #header>
                操作<el-button size="small" type="info" style="margin-left: 5px;" @click="addRun()">添加</el-button>
              </template>
              <template #default="scope">
                <el-button size="small" type="danger" @click="delRun(scope.$index)">Delete</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tooltip>
      </el-form-item>
    </el-form>
    <h2>Dockerfile配置内容</h2>
    <pre class="dockerfile_content" v-html="dockerFileConter" />
    <h2>构建镜像命令</h2>
    <div class="dockerfile_content">
      <p><span class="annotation"># 在Dockerfile文件同级目录下，打开终端执行构建命令</span></p>
      <p><span class="annotation"># 构建镜像名称为: docker-demo</span></p>
      docker build -t docker-demo:{{ form.VERSION }} .
    </div>
  </div>
</template>
<style></style>
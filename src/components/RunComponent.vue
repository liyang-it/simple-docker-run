<script setup>
import { reactive, computed} from 'vue'

// springboot表单
const form = reactive({
  NAME: "run-docker-demo",
  image: "docker-demo:0.0.1",
  PORTS: [
    { 'local': "8080", "container": "8080", "agreement": ['TCP'] }
  ],
  MOUNTS: [],
  COMMAND: "",
  entrypoint: "",
  net: "bridge",
  restart: "no",
  minMemory: "",
  maxMemory: "512",
  cpus: "2"

})

// 添加端口
function addPort() {
  form.PORTS.push({ 'local': "", "container": "", "agreement": ['TCP'] })
}
// 删除端口
function delPort(index) {
  if (form.PORTS.length >= 1) {
    const array = form.PORTS
    form.PORTS = array.slice(0, index).concat(array.slice(index + 1))
  }
}
// 添加挂载
function addMount() {
  form.MOUNTS.push({ 'local': "", "container": "" })
}
// 删除挂载
function delMount(index) {
  if (form.MOUNTS.length >= 1) {
    const array = form.MOUNTS
    form.MOUNTS = array.slice(0, index).concat(array.slice(index + 1))
  }
}

// 不换行
const dockerFileConter = computed(() => {
  // 使用数组方式拼接字符串，不使用 += 方式拼接
  const htmlArray = []
  htmlArray.push(`<span class="annotation"># Docker run 命令 不换行</span><br/>`)



  const ports = []
  const mounts = []
  let restart = ""
  let maxMemory = ""
  let cpu = ""
  let net = ""
  let name = ""
  let images = ""

  // 端口
  for (let i = 0, size = form.PORTS.length; i < size; i++) {
    if (form.PORTS[i].local.length !== 0 && form.PORTS[i].container.length !== 0) {
      // tcp还是udp
      if (form.PORTS[i].agreement.length === 0) {
        // 两个都没有选择默认 tcp
        ports.push(`-p ${form.PORTS[i].local}:${form.PORTS[i].container}/tcp `)
      } else {
        for (let a = 0; a < form.PORTS[i].agreement.length; a++) {
          if (form.PORTS[i].agreement[a] === 'TCP' || form.PORTS[i].agreement[a] === 'tcp') {
            ports.push(`-p ${form.PORTS[i].local}:${form.PORTS[i].container}/tcp `)
          } else {
            ports.push(`-p ${form.PORTS[i].local}:${form.PORTS[i].container}/udp `)
          }
        }
      }
    }
  }

  // 挂载
  for (let i = 0, size = form.MOUNTS.length; i < size; i++) {
    if (form.MOUNTS[i].local.length !== 0 && form.MOUNTS[i].container.length !== 0) {
      mounts.push(`-v ${form.MOUNTS[i].local}:${form.MOUNTS[i].container} `)
    }
  }
  // 重启规则
  restart = `--restart=${form.restart} `


  // 最大内存
  maxMemory = `--memory ${form.maxMemory}m `

  // CPU
  cpu = `--cpus=${form.cpus} `

  // 网络模式
  net = `--net=${form.net} `

  // 容器名称
  name = `--name ${form.NAME} `

  // 镜像
  images = ` ${form.image}`

  // run
  htmlArray.push(`<p><span class="parameter">docker run -d </span> <span class="value">${ports.join("")}${mounts.join("")}${restart}${maxMemory}${cpu}${net}${name}${images} </span></p>`)
  return htmlArray.join("")
})
// 换行
const dockerFileLineConter = computed(() => {
  // 使用数组方式拼接字符串，不使用 += 方式拼接
  const htmlArray = []
  htmlArray.push(`<span class="annotation"># Docker run 命令 换行</span><br/>`)

  // 第一行run
  htmlArray.push('<span class="parameter">docker run  \\<br/>')
  htmlArray.push('<span class="value">-d  \\<br/>')

  // 端口
  for (let i = 0, size = form.PORTS.length; i < size; i++) {
    if (form.PORTS[i].local.length !== 0 && form.PORTS[i].container.length !== 0) {
      // tcp还是udp
      if (form.PORTS[i].agreement.length === 0) {
        // 两个都没有选择默认 tcp
        htmlArray.push(`<span class="value">-p ${form.PORTS[i].local}:${form.PORTS[i].container}/tcp \\<br/>`)
      } else {
        for (let a = 0; a < form.PORTS[i].agreement.length; a++) {
          if (form.PORTS[i].agreement[a] === 'TCP' || form.PORTS[i].agreement[a] === 'tcp') {
            htmlArray.push(`<span class="value">-p ${form.PORTS[i].local}:${form.PORTS[i].container}/tcp \\<br/>`)
          } else {
            htmlArray.push(`<span class="value">-p ${form.PORTS[i].local}:${form.PORTS[i].container}/udp \\<br/>`)
          }
        }
      }

    }
  }

  // 挂载
  for (let i = 0, size = form.MOUNTS.length; i < size; i++) {
    if (form.MOUNTS[i].local.length !== 0 && form.MOUNTS[i].container.length !== 0) {
      htmlArray.push(`<span class="value">-v ${form.MOUNTS[i].local}:${form.MOUNTS[i].container} \\<br/>`)
    }
  }

  // 重启规则
  htmlArray.push(`<span class="value">--restart=${form.restart} \\<br/>`)

  // 最小内存
  // htmlArray.push(`<span class="value">--memory-reservation="${form.minMemory}m" \\<br/>`)

  // 最大内存
  htmlArray.push(`<span class="value">--memory ${form.maxMemory}m \\<br/>`)

  // CPU
  htmlArray.push(`<span class="value">--cpus=${form.cpus} \\<br/>`)

  // 网络模式
  htmlArray.push(`<span class="value">--net=${form.net} \\<br/>`)

  // 容器名称
  htmlArray.push(`<span class="value">--name ${form.NAME} \\<br/>`)

  // 镜像
  htmlArray.push(`<span class="value"> ${form.image}<br/>`)

  return htmlArray.join("")
})
</script>
<template>
  <div>
    <el-form :model="form" label-width="200px" :options="editorOption" >
      <el-form-item label="容器运行名称">
        <el-tooltip class="box-item" effect="dark" content="容器名称" placement="top-start">
          <el-input v-model="form.NAME" />
        </el-tooltip>
      </el-form-item>
      <el-form-item label="镜像名称">
        <el-tooltip class="box-item" effect="dark" content="运行的镜像名称" placement="top-start">
          <el-input v-model="form.image" />
        </el-tooltip>
      </el-form-item>
      <el-form-item label="端口映射">
        <el-table :data="form.PORTS" style="width: 100%" border
          :header-cell-style="{ background: '#eee', color: '#606266' }" size="small">
          <el-table-column prop="local" label="宿主机端口" width="180">
            <template #default="scope">
              <el-input size="small" v-model="scope.row.local" />
            </template>
          </el-table-column>
          <el-table-column prop="container" label="容器端口" width="180">
            <template #default="scope">
              <el-input size="small" v-model="scope.row.container" />
            </template>
          </el-table-column>
          <el-table-column prop="xieyi" label="协议" width="180">
            <template #default="scope">
              <el-checkbox-group size="small" v-model="scope.row.agreement">
                <el-checkbox-button key="TCP" label="TCP">TCP</el-checkbox-button>
                <el-checkbox-button key="UDP" label="UDP">UDP</el-checkbox-button>
              </el-checkbox-group>
            </template>
          </el-table-column>
          <el-table-column width="180">
            <template #header>
              操作<el-button size="small" type="info" style="margin-left: 5px;" @click="addPort()">添加</el-button>
            </template>
            <template #default="scope">
              <el-button size="small" type="danger" @click="delPort(scope.$index)">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="挂载映射">
        <el-table :data="form.MOUNTS" style="width: 100%" border
          :header-cell-style="{ background: '#eee', color: '#606266' }" size="small">
          <el-table-column prop="local" label="宿主机目录" width="180">
            <template #default="scope">
              <el-input size="small" v-model="scope.row.local" />
            </template>
          </el-table-column>
          <el-table-column prop="container" label="容器目录" width="180">
            <template #default="scope">
              <el-input size="small" v-model="scope.row.container" />
            </template>
          </el-table-column>

          <el-table-column width="180">
            <template #header>
              操作<el-button size="small" type="info" style="margin-left: 5px;" @click="addMount()">添加</el-button>
            </template>
            <template #default="scope">
              <el-button size="small" type="danger" @click="delMount(scope.$index)">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="重启规则">
        <el-radio-group v-model="form.restart">
          <el-radio label="no" size="small">不重启</el-radio>
          <el-radio label="unless-stopped" size="small">除非显式停止容器，否则总是重启容器</el-radio>
          <el-radio label="on-failure:5" size="small">失败后重启(重启5次)</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="网络模式">
        <el-radio-group v-model="form.net">
          <el-radio label="bridge" size="small">独立网卡(容器内无法访问宿主机内网，只能公网地址)</el-radio>
          <el-radio label="host" size="small">使用宿主机网络(端口映射失效,容器程序会直接占用宿主机端口)</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- <el-form-item label="容器分配最小内存(单位mb)">
        <el-input v-model="form.minMemory" />
      </el-form-item> -->
      <el-form-item label="容器分配最大内存(单位mb)">
        <el-input v-model="form.maxMemory" />
      </el-form-item>
      <el-form-item label="容器分配CPU核数">
        <el-input v-model="form.cpus" />
      </el-form-item>
    </el-form>

    <h2>Docker run命令</h2>
    <a class="description" href="https://blog.csdn.net/qq_40739917/article/details/135400392"
      target="_blank">更多Docker命令</a>
     <div class="dockerfile_main">
      <!-- <el-button type="info" size="small" class="dockerfile_copy">复制</el-button> -->
      <pre class="dockerfile_content" v-html="dockerFileConter" />
     </div> 
     <div  class="dockerfile_main">
      <!-- <el-button type="info" size="small" class="dockerfile_copy">复制</el-button> -->
      <pre class="dockerfile_content" v-html="dockerFileLineConter" />
     </div>

  </div>
</template>
<style scoped>
.description {
  color: #42b883;
}
</style>
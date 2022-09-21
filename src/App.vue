<template>
  <div id="app">
    <div id="load"
         style="opacity: 1;">
      <div class="load_img">
        <!-- 加载动画 -->
        <img class="jzxz1"
             src="./assets/jzxz1.png">
        <img class="jzxz2"
             src="./assets/jzxz2.png">
      </div>
    </div>
    <div class="ctop">
      <router-link to="/back"><el-link class="link" type="primary">后台数据管理</el-link></router-link>
      <!-- <a href="#/back">25243534235234</a> -->
      <router-view></router-view>
      <img src="./assets/title1.png"
           alt="">
      <img id="gif"
           src="./assets/header.gif"
           alt="">
    </div>
    <div class="col cleft">
      <div class="cards">
        <div class="title">
          <img src="./assets/ksh33.png"
               alt="">
          <span>卡片式数据展示</span>
          <el-dropdown @command="handleCommandFrist">
            <span class="el-dropdown-link">
              {{ spanname1 }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for='item in all'
                                :key="item.id"
                                :command='item.value'>{{ item.name }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="cardmain">
          <div class="card">
            <h3>污染总计(吨)</h3>
            <p>{{ total }}</p>
          </div>
          <div class="card">
            <h3>已预警公司数</h3>
            <p>{{ business }}</p>
            <div class="speed"
                 id="show00"></div>
          </div>
          <div class="card">
            <h3>异常数据数</h3>
            <p>{{ abnormal }}</p>
          </div>
        </div>
      </div>
      <div class="sort">
        <div class="title">
          <span>Top5公司排名</span>
          <img src="./assets/ksh33.png"
               alt="">
        </div>
        <div class="sortmain">
          <span class="span">污染排放总量排行榜</span>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{ spanname2 }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown"
                              v-for='item in all'
                              :key="item.id">
              <el-dropdown-item v-for='item in all'
                                :key="item.id"
                                :command='item.value'>{{ item.name }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div class="box"
               v-for='(item,index) in sortmain'
               :key="item.id">
            <el-tooltip class="item"
                        effect="dark"
                        :content="item.business"
                        placement="right">
              <button>公司{{ index+1 }}</button>
            </el-tooltip>
            <div class="prog"
                 :style="{ width: item.stylelength}"></div>
            <div class="txt">{{ Math.floor(item.busin_total / 1000) }}千吨</div>
          </div>
        </div>
      </div>
      <div class="more">
        <div class="title">
        <!-- <el-button type="primary" icon="el-icon-edit" circle></el-button> -->
          <span>对比及其他</span>
          <img src="./assets/ksh33.png"
               alt="">
        </div>
        <div class="moremain">
          <el-tabs id="ccc" type="border-card"
                   v-model="activeName"
                   @tab-click="handleTabClick">
            <el-tab-pane id="inccc" label="公司间对比"
                         name="frist">
              <div id="show4" style="padding-top: 2%; height: 32vh; width: 28vw;"></div>
            </el-tab-pane>
            <el-tab-pane id="finded inccc" label="污水扩散示意图"
                         name="second">
              <div id="show5" style="padding-top: 2%; height: 27vh; width: 28vw;"></div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <div class="col cmiddle">
      <div class="presee">
        <div class="title">
          <span>企业排污违法概率预测</span>
          <img src="./assets/ksh33.png"
               alt="">
        </div>
        <div class="preseemain">
          <div class="innerleft">
            <div class="jilian">
            <span style="color: white;">实时数据概率评估 </span>
              <el-cascader v-model="value"
                         :options="options1"
                         :props="{ expandTrigger: 'hover' }"
                         @change="middleHandleChange"
                         clearable
                         id="jilian"></el-cascader>
            </div>
            <div id="show3"></div>
          </div>
          <div class="innerright">
            <!-- <div style="font-size: calc(100vw * 27 / 1980);margin-bottom: 2%;">公司排污风险评估</div> -->
            <div>
              <span style="color: white;">公司排污风险评估 </span>
              <el-cascader v-model="value"
                         :options="otheroptions"
                         :props="{ expandTrigger: 'hover' }"
                         @change="middleTwoHandleChange"
                         clearable
                         id="jilian"></el-cascader>
            </div>
            <div class="nowid">
              <div>当前公司ID为 <span> {{ singleId1 }} </span></div>
              <div class="zhuangtai">预警状态：<el-tag :type='singleLastShow'
                      effect="dark"
                      class="btn-show"
                      size="medium"
                      @click="dialogFormVisible = true"
                      style="width:15%; height:90%;font-size:calc(100vw * 16 / 1980);padding-top:0.7%;">{{ jishu }} <i class="el-icon-view"></i></el-tag></div>
              <div class="text">
                <span>预测建议：</span>
                <el-popover placement="top-start" title="预测建议" width="250" trigger="hover" :content="jianyi">
                  <el-button slot="reference">{{ jianyi }}</el-button>
                </el-popover>
              </div>
              <div class="text">
                <span>法律条文：</span>
                <el-popover placement="top-start" title="法律条文" width="250" trigger="hover" :content="falv">
                  <el-button slot="reference">{{ falv }}</el-button>
                </el-popover>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="nowdata">
        <div class="title">
          <span>实时信息展示</span>
          <img src="./assets/ksh33.png"
               alt="">
        </div>
        <div ref="monitor" class="monitor">
          <dv-scroll-board :config="config1"  style="width: 100%;" @click="getMethod" />
        </div>
      </div>
    </div>
    <div class="col cright">
      <div class="single">
        <div class="title">
          <span>单公司数据展示</span>
          <img src="./assets/ksh33.png"
               alt="">
        </div>
        <div class="singlemain">
          <div class="block">
            <el-cascader v-model="value"
                         :options="options"
                         :props="{ expandTrigger: 'hover' }"
                         @change="handleChange"
                         clearable
                         id="jilian"></el-cascader>
            <div class="show show2"
                 id="show2"></div>
            <div class="nowid">
              当前公司ID为 <span> {{ singleId }} </span>
            <el-dialog title="本公司的排污简明及举措" :visible.sync="dialogFormVisible">
              <div>
    <el-row :gutter="15">
      <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
        <el-col :span="24">
          <el-row gutter="15">
            <el-col :span="23">
              <el-form-item label="公司ID" prop="field102">
                <el-input id="innerimportant" v-model="formData.field102" placeholder="不可更改" readonly clearable :style="{width: '100%'}">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="23">
              <el-form-item label="所有数据展示" prop="field104">
                <el-table :data="tableData" height="250" border style="width: 100%">
                  <el-table-column prop="rtime" label="时间" width="280">
                  </el-table-column>
                  <el-table-column prop="outfall_id" label="排污口ID" width="280">
                  </el-table-column>
                  <el-table-column prop="pollu_id" label="污染物种类" width="180">
                  </el-table-column>
                  <el-table-column prop="type" label="异常类型" width="180">
                  </el-table-column>
                  <el-table-column prop="business_id" label="公司ID" width="280">
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否预警" prop="field106">
            <el-radio-group v-model="formData.field106" size="medium">
              <el-radio v-for="(item, index) in field106Options" :key="index" :label="item.value"
                :disabled="item.disabled">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="评分" prop="field109">
            <el-rate v-model="formData.field109"></el-rate>
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item label="整改建议" prop="field105">
            <el-input v-model="formData.field105" type="textarea" placeholder="请输入整改建议"
              :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
            </el-dialog>

            </div>
            <div class="show show1"
                 id="show9"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import 'echarts-gl'
export default {
  data () {
    return {
      jianyi: '',
      falv: '',
      otheroptions: [],
      tableData: [],
      formData: {
        field102: 423,
        field103: 423,
        field104: undefined,
        field106: 2,
        field109: 0,
        field105: undefined
      },
      rules: {
        field102: [{
          required: true,
          message: '不可更改',
          trigger: 'blur'
        }],
        field103: [{
          required: true,
          message: '不可更改',
          trigger: 'blur'
        }],
        field104: [{
          required: true,
          message: '请输入排污简明',
          trigger: 'blur'
        }],
        field106: [{
          required: true,
          message: '是否预警不能为空',
          trigger: 'change'
        }],
        field109: [{
          required: true,
          message: '评分不能为空',
          trigger: 'change'
        }],
        field105: [{
          required: true,
          message: '请输入整改建议',
          trigger: 'blur'
        }]
      },
      field106Options: [{
        label: '是',
        value: 1
      }, {
        label: '否',
        value: 0
      }],
      jishu: '',
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      config1: {
        header: ['时间', '公司ID', '排污口ID', '污染物ID', '总量-t', '浓度-mg/L'],
        data: [],
        rowNum: 7, // 表格行数
        headerHeight: 35,
        headerBGC: 'rgba(0,0,0,0)', // 表头
        oddRowBGC: 'rgba(0,0,0,0)', // 奇数行
        evenRowBGC: '#0A2732', // 偶数行
        index: true,
        columnWidth: [50],
        hoverPause: true,
        waitTime: 900,
        align: ['center']
      },
      stylelength: [],
      spanname1: '',
      spanname2: '',
      initdata: [0, 1, 4657],
      singleId: '',
      singleId1: '',
      singleALL: [],
      singleALLShow: [],
      singleLastShow: [],
      random: [],
      all: [],
      sortmain: [],
      value: [],
      table: false,
      total: 0,
      business: 0,
      abnormal: 0,
      activeName: 'frist',
      options: [],
      options1: []
    }
  },
  created () {
    this.showCard('w00000')
    this.handleCommand('w00000')
    this.middleTwoHandleChange(['172905310800276000'])
    this.showJl()
    this.showAnotherJl()
    this.showDb()
    this.showAllp()
    this.deletXz()
    this.handleChange(['172800010800132000 ', '861530565307315 ', 'w01018'])
    this.middleHandleChange(['172800010800132000 ', '861530565307315 ', 'w01018'])
    this.singleAnothor(['172800010800132000 ', '861530565307315 ', 'w01018'])
  },
  mounted () {
    // this.nowdatatest()
    this.nowdata()
    this.initecharts1()
    this.initecharts2()
    this.initecharts3()
    this.initecharts4()
    this.initecharts5()
    this.initecharts6()
    this.recentReportList()
    this.setFontSize()
  },
  methods: {
    gotoback () {
      this.$router.push('@/components/backset.vue')
    },
    // 一个转化的方法
    showname (value) {
      if (value === 'w00000') {
        return '污水'
      } else if (value === 'w01018') { return '化学需氧量' } else if (value === 'w21001') { return '总氮' } else if (value === 'w21003') { return '氨氮' } else if (value === 'w21011') { return '总磷' }
    },
    // 这是级联器的读取
    async showAnotherJl () {
      await this.$axios.get('coms').then(res => {
        if (res.data.code === 200 && res.data.message === '成功') {
          this.otheroptions = res.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    async showJl () {
      await this.$axios.get('outs').then(res => {
        if (res.data.code === 200 && res.data.message === '成功') {
          this.options = res.data.data
          this.options1 = res.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 这是卡片式展示
    async showCard (pno) {
      await this.$axios.get('count', { params: { pno: pno } }).then(res => { // 这里使用了ES6的语法
        if (res.data.code === 200 && res.data.message === '成功') {
          this.total = res.data.data[0].total
          this.business = res.data.data[0].business
          this.abnormal = res.data.data[0].abnormal
          this.spanname1 = this.showname(pno)
          this.initecharts1(this.business)
        }
      }).catch(err =>
        console.log(err) // 请求失败返回的数据
      )
    },
    // 这是卡片式展示的选择器
    handleCommandFrist (command) {
      this.showCard(command)
    },
    // 这是排名的展示
    async handleCommand (command) {
      // this.$message('click on item ' + command)
      this.$axios.get('rank', { params: { pno: command } }).then(res => {
        if (res.data.code === 200 && res.data.message === '成功') {
          this.spanname2 = this.showname(command)
          this.sortmain = res.data.data
          for (const index in res.data.data) {
            this.sortmain[index].stylelength = (((res.data.data[index].busin_total / res.data.data[0].busin_total).toFixed(2)) * 50 + '%')
          }
        }
      })
    },
    // 这是随机公司展示
    async showDb () {
      await this.$axios.get('random').then(res => {
        if (res.data.code === 200 && res.data.message === '成功') {
          this.random = res.data.data
          var arr1 = []
          var arr2 = []
          for (let index = 0; index < this.random[0].length; index++) {
            arr1.push(Math.sqrt(Math.sqrt(this.random[0][index])))
          }
          for (let index = 0; index < this.random[1].length; index++) {
            arr2.push(Math.sqrt(Math.sqrt(this.random[1][index])))
          }
          arr1.splice(5, 1)
          arr2.splice(5, 1)
          console.log(arr1, arr2)
          var max = []
          for (let index = 0; index < arr1.length; index++) {
            if (arr1[index] < arr2[index]) {
              max.push(arr2[index])
            } else {
              max.push(arr1[index])
            }
          }
          var maxshow = [
            { text: '污水', max: 1000000 },
            { text: '化学需氧量', max: 100000 },
            { text: '总氮', max: 10000 },
            { text: '氨氮', max: 1000 },
            { text: '总磷', max: 1000 }
          ]
          console.log(maxshow)
          this.initecharts2(arr1, arr2)
        }
      })
    },
    // 这是展示所有污染物
    async showAllp () {
      if (this.all.length === 0) {
        this.all.push('暂无数据')
      }
      await this.$axios.get('allpollu').then(res => {
        if (res.data.code === 200 && res.data.message === '成功') {
          this.all = []
          this.all = res.data.data
        }
      })
    },
    // 这是中间第一个级联器选择
    async middleHandleChange (value) {
      await this.$axios.get('prob', { params: { bno: value[0], ono: value[1], pno: value[2] } }).then(res => {
        if (res.data.code === 200 && res.data.message === '成功') {
          console.log(res.data.data)
          this.initecharts5(res.data.data.glList, res.data.data.nowtime)
        }
      })
    },
    // 这是中间第二个级联器选择
    async middleTwoHandleChange (value) {
      await this.$axios.get('detail', { params: { bno: value[0] } }).then(res => {
        if (res.data.code === 200 && res.data.message === '成功') {
          console.log(res.data.data)
          this.tableData = res.data.data.detail
          this.singleId1 = value[0]
          this.formData.field102 = value[0]
          this.jishu = res.data.data.status
          if (res.data.data.status === '正常') {
            this.singleLastShow = 'success'
            this.jianyi = '贵公司经数据分析尚未发现存在违法行为的可能，请继续保持良好状态，积极抵制违法排污行为的发生。'
            this.falv = '暂不需要'
          } else if (res.data.data.status === '预警') {
            this.singleLastShow = 'warning'
            this.jianyi = '根据模型检测分析，发现贵公司有违法行为的可能，请及时进行自我排查。此为预警警告，请调整生产及排污模式。'
            this.falv = '《中华人民共和国环境保护法》第四十二条   排放污染物的企业事业单位，应当建立环境保护责任制度，明确单位负责人和相关人员的责任。重点排污单位应当按照国家有关规定和监测规范安装使用监测设备，保证监测设备正常运行，保存原始监测记录。'
          } else if (res.data.data.status === '异常') {
            this.singleLastShow = 'danger'
            this.jianyi = '经模型检测发现贵公司存在违法行为，请该公司查看是否有故意干预环境监测活动的正常开展，导致监测数据失真的行为；或是凭空编造虚假监测数据的行为，如有，请做相应整改；或是存在私加排污口等偷排污染物等违法行为。对此，我们已将你记录在案，请立即停产整顿。'
            this.falv = '《中华人民共和国环境保护法》第六十五条  环境影响评价机构、环境监测机构以及从事环境监测设备和防治污染设施维护、运营的机构，在有关环境服务活动中弄虚作假，对造成的环境污染和生态破坏负有责任的，除依照有关法律法规规定予以处罚外，还应当与造成环境污染和生态破坏的其他责任者承担连带责任。 '
          }
        }
      })
    },
    // 这是监听级联器选择 饼形图
    async handleChange (value) {
      await this.$axios.get('pollu', { params: { bno: value[0], ono: value[1] } }).then(res => {
        if (res.data.code === 200 && res.data.message === '成功') {
          this.singleALL = res.data.data
          this.initecharts4(this.singleALL)
        }
      })
      this.singleAnothor(value)
      this.singleId = value[0]
    },
    // 这是近两年数据
    async singleAnothor (value) {
      await this.$axios.get('whole', { params: { bno: value[0], ono: value[1], pno: value[2] } }).then(res => {
        if (res.data.code === 200 && res.data.message === '成功') {
          this.singleALLShow = res.data.data
          this.initecharts6(this.singleALLShow, this.showname(value[2]))
        }
      })
    },
    // 状态展示
    async singleLast (value) {
      await this.$axios.get('warn', { params: { bno: value[0], ono: value[1], pno: value[2] } }).then(res => {
        if (res.data.code === 200 && res.data.message === '成功') {
          console.log(res)
          if (res.data.data.warning === 'level0') {
            this.singleLastShow = 'success'
            this.jishu = '0'
          } else if (res.data.data.warning === 'level1') {
            this.singleLastShow = 'primary'
            this.jishu = '1'
          } else if (res.data.data.warning === 'level2') {
            this.singleLastShow = 'warning'
            this.jishu = '2'
          } else if (res.data.data.warning === 'level3') {
            this.singleLastShow = 'danger'
            this.jishu = '3'
          }
        }
      })
    },
    // 修改px到rem
    fontSize (res) {
      // const docEl = document.documentElement
      const clientWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth
      if (!clientWidth) return
      const fontSize = 100 * (clientWidth / 23329)
      return res * fontSize
    },
    // 修改表格行数
    reline () {
      // var height = document.querySelector('.monitor')
      console.log(this.$refs.monitor.$el.offsetHeight)
      // return Math.floor(height / 23)
    },
    // 这是实时数据展示
    async nowdata () {
      await this.$axios.get('realtime').then(res => {
        if (res.data.code === 200 && res.data.message === '成功') {
          var nowdatalist = []
          nowdatalist = res.data.data
          // this.nowdatalist = this.nowdatalist.map((item) => {
          //   item.push("<i style='color:#08C8B7' slot='reference' class='el-show el-icon-view'></i>")
          // })
          nowdatalist.forEach(item => {
            item.push("<i style='color:#08C8B7; cursor: pointer;' slot='reference' id='el -show' class='el-icon-view'></i>")
          })
          this.config1 = {
            header: ['时间', '公司ID', '排污口ID', '污染物ID', '总量-t', '浓度-mg/L', '详情'],
            data: nowdatalist,
            rowNum: 6, // 表格行数
            headerHeight: 35,
            headerBGC: 'rgba(0,0,0,0)', // 表头
            oddRowBGC: 'rgba(0,0,0,0)', // 奇数行
            evenRowBGC: '#0A2732', // 偶数行
            index: false,
            columnWidth: [this.fontSize(150), this.fontSize(140), this.fontSize(130), this.fontSize(100), this.fontSize(80), this.fontSize(100), this.fontSize(70)],
            hoverPause: true,
            waitTime: 900,
            align: ['center', 'center', 'center', 'center', 'center', 'center', 'center']
          }
        }
      })
    },
    async nowdatatest () {
      await this.$axios.get('testMax').then(res => {
        if (res.data.code === 200 && res.data.message === '成功') {
          var nowdatalist = []
          nowdatalist = res.data.data
          console.log(nowdatalist)
          var arr1 = [100, 100, 100, 100, 100]
          var arr2 = [100, 100, 100, 100, 100]
          this.initecharts2(arr1, arr2, nowdatalist)
        }
      })
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleTabClick (tab, event) {
      console.log(tab, event)
    },
    handleClick (row) {
      console.log(row)
    },
    // 打开相应公司的实际内容
    getMethod (value) {
      setTimeout(() => {
        this.open1(value)
      }, 500)
    },
    // 这是实时信息的扩展展示
    open1 (value) {
      const h = this.$createElement
      this.$notify({
        title: '你打开的是',
        message: h('p', null, [
          h('span', null, '时间 '),
          h('i', { style: 'color: teal' }, value.row[0]),
          h('br'),
          h('span', null, '公司ID '),
          h('i', { style: 'color: teal' }, value.row[1]),
          h('br'),
          h('span', null, '排污口ID '),
          h('i', { style: 'color: teal' }, value.row[2])
        ]),
        duration: 2700
      })
    },
    // 删除加载动画
    deletXz () {
      var speed = 1000
      var num = 10
      var st = setInterval(function () {
        num--
        document.getElementById('load').style.opacity = num / 10
        if (num <= 0) { clearInterval(st) }
      }, speed)
      setTimeout(function () {
        document.getElementById('load').remove()
      }, 1100)
    },
    // 卡片式的图
    initecharts1 (business) {
      var mycharts00 = echarts.init(document.getElementById('show00'))
      var option00 = {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}个'
        },
        series: [
          {
            name: '公司个数',
            type: 'gauge',
            radius: '100%',
            grid: {
              top: '5px',
              left: '5px',
              right: '5px',
              bottom: '0px',
              containLabel: true
            },
            progress: {
              show: true
            },
            axisLine: {
              show: true,
              // 属性lineStyle控制线条样式
              lineStyle: {
                width: 10,
                color: [[1, '#EDEFF2']]
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            pointer: {
              show: true,
              length: '90%'
            },
            detail: {
              valueAnimation: true,
              formatter: '{value}',
              color: '#fff',
              offsetCenter: [0, 20],
              fontSize: 10
            },
            data: [
              {
                value: business
              }
            ]
          }
        ]
      }
      mycharts00.setOption(option00)
      setTimeout(function () {
        window.onresize = function () {
          mycharts00.resize()
        }
      }, 200)
    },
    // 公司对比图
    initecharts2 (arr1, arr2) {
      var mycharts4 = echarts.init(document.getElementById('show4'))
      var option4

      option4 = {
        title: {
          top: 5,
          text: '公司对比',
          left: 'left',
          textStyle: {
            color: '#eee'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          top: 5,
          right: 20,
          data: ['公司1号', '公司2号'],
          itemGap: 18,
          textStyle: {
            color: '#fff',
            fontSize: 14
          }
        },
        radar: [{
          indicator: [
            { name: '化学需氧量', max: 30 },
            { name: '污水', max: 30 },
            { name: '总氮', max: 30 },
            { name: '氨氮', max: 30 },
            { name: '总磷', max: 30 }
          ],
          // indicator: max,
          radius: '55%',
          center: ['40%', '40%']
        }
        ],
        series: [
          {
            type: 'radar',
            // tooltip: {
            //   trigger: 'item'
            // },
            areaStyle: {},
            symbol: 'circle', // 设置图形标记 （拐点）
            symbolSize: 5,
            data: [
              {
                value: arr1,
                name: '公司1号'
              },
              {
                value: arr2,
                name: '公司2号'
              }
            ]
          }
        ]
      }
      mycharts4.setOption(option4)
      setTimeout(function () {
        window.onresize = function () {
          mycharts4.resize()
        }
      }, 200)
    },
    // 污水扩撒图
    initecharts3 () {
      var mycharts5 = echarts.init(document.getElementById('show5'))
      var option5
      option5 = {
        backgroundColor: 'rgba(0,0,0,0)',
        legend: {
          data: ['总氮', '污水', '总磷', '氨氮', '化学需氧量'],
          textStyle: {
            color: '#fff',
            fontSize: 14
          }
        },
        singleAxis: {
          top: 10,
          bottom: -5,
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          type: 'time',
          axisPointer: {
            animation: true,
            label: {
              show: true
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              type: 'dashed',
              opacity: 0.2
            }
          }
        },
        series: [
          {
            type: 'themeRiver',
            emphasis: {
              itemStyle: {
                shadowBlur: 20,
                shadowColor: 'rgba(0, 0, 0, 0.8)'
              }
            },
            data: [
              ['2015/11/08', 10, '总氮'],
              ['2015/11/09', 15, '总氮'],
              ['2015/11/10', 35, '总氮'],
              ['2015/11/11', 38, '总氮'],
              ['2015/11/12', 22, '总氮'],
              ['2015/11/13', 16, '总氮'],
              ['2015/11/14', 7, '总氮'],
              ['2015/11/15', 2, '总氮'],
              ['2015/11/16', 17, '总氮'],
              ['2015/11/17', 33, '总氮'],
              ['2015/11/18', 40, '总氮'],
              ['2015/11/19', 32, '总氮'],
              ['2015/11/20', 26, '总氮'],
              ['2015/11/21', 35, '总氮'],
              ['2015/11/22', 40, '总氮'],
              ['2015/11/23', 32, '总氮'],
              ['2015/11/24', 26, '总氮'],
              ['2015/11/25', 22, '总氮'],
              ['2015/11/26', 16, '总氮'],
              ['2015/11/27', 22, '总氮'],
              ['2015/11/28', 10, '总氮'],
              ['2015/11/08', 35, '总磷'],
              ['2015/11/09', 36, '总磷'],
              ['2015/11/10', 37, '总磷'],
              ['2015/11/11', 22, '总磷'],
              ['2015/11/12', 24, '总磷'],
              ['2015/11/13', 26, '总磷'],
              ['2015/11/14', 34, '总磷'],
              ['2015/11/15', 21, '总磷'],
              ['2015/11/16', 18, '总磷'],
              ['2015/11/17', 45, '总磷'],
              ['2015/11/18', 32, '总磷'],
              ['2015/11/19', 35, '总磷'],
              ['2015/11/20', 30, '总磷'],
              ['2015/11/21', 28, '总磷'],
              ['2015/11/22', 27, '总磷'],
              ['2015/11/23', 26, '总磷'],
              ['2015/11/24', 15, '总磷'],
              ['2015/11/25', 30, '总磷'],
              ['2015/11/26', 35, '总磷'],
              ['2015/11/27', 42, '总磷'],
              ['2015/11/28', 42, '总磷'],
              ['2015/11/08', 21, '氨氮'],
              ['2015/11/09', 25, '氨氮'],
              ['2015/11/10', 27, '氨氮'],
              ['2015/11/11', 23, '氨氮'],
              ['2015/11/12', 24, '氨氮'],
              ['2015/11/13', 21, '氨氮'],
              ['2015/11/14', 35, '氨氮'],
              ['2015/11/15', 39, '氨氮'],
              ['2015/11/16', 40, '氨氮'],
              ['2015/11/17', 36, '氨氮'],
              ['2015/11/18', 33, '氨氮'],
              ['2015/11/19', 43, '氨氮'],
              ['2015/11/20', 40, '氨氮'],
              ['2015/11/21', 34, '氨氮'],
              ['2015/11/22', 28, '氨氮'],
              ['2015/11/23', 26, '氨氮'],
              ['2015/11/24', 37, '氨氮'],
              ['2015/11/25', 41, '氨氮'],
              ['2015/11/26', 46, '氨氮'],
              ['2015/11/27', 47, '氨氮'],
              ['2015/11/28', 41, '氨氮'],
              ['2015/11/08', 10, '化学需氧量'],
              ['2015/11/09', 15, '化学需氧量'],
              ['2015/11/10', 35, '化学需氧量'],
              ['2015/11/11', 38, '化学需氧量'],
              ['2015/11/12', 22, '化学需氧量'],
              ['2015/11/13', 16, '化学需氧量'],
              ['2015/11/14', 7, '化学需氧量'],
              ['2015/11/15', 2, '化学需氧量'],
              ['2015/11/16', 17, '化学需氧量'],
              ['2015/11/17', 33, '化学需氧量'],
              ['2015/11/18', 40, '化学需氧量'],
              ['2015/11/19', 32, '化学需氧量'],
              ['2015/11/20', 26, '化学需氧量'],
              ['2015/11/21', 35, '化学需氧量'],
              ['2015/11/22', 40, '化学需氧量'],
              ['2015/11/23', 32, '化学需氧量'],
              ['2015/11/24', 26, '化学需氧量'],
              ['2015/11/25', 22, '化学需氧量'],
              ['2015/11/26', 16, '化学需氧量'],
              ['2015/11/27', 22, '化学需氧量'],
              ['2015/11/28', 10, '化学需氧量'],
              ['2015/11/08', 10, '污水'],
              ['2015/11/09', 15, '污水'],
              ['2015/11/10', 35, '污水'],
              ['2015/11/11', 38, '污水'],
              ['2015/11/12', 22, '污水'],
              ['2015/11/13', 16, '污水'],
              ['2015/11/14', 7, '污水'],
              ['2015/11/15', 2, '污水'],
              ['2015/11/16', 17, '污水'],
              ['2015/11/17', 33, '污水'],
              ['2015/11/18', 40, '污水'],
              ['2015/11/19', 32, '污水'],
              ['2015/11/20', 26, '污水'],
              ['2015/11/21', 35, '污水'],
              ['2015/11/22', 4, '污水'],
              ['2015/11/23', 32, '污水'],
              ['2015/11/24', 26, '污水'],
              ['2015/11/25', 22, '污水'],
              ['2015/11/26', 16, '污水'],
              ['2015/11/27', 22, '污水'],
              ['2015/11/28', 10, '污水']
            ]
          }
        ]
      }

      mycharts5.setOption(option5)
      setTimeout(function () {
        window.onresize = function () {
          mycharts5.resize()
        }
      }, 200)
    },
    // 污染物对比
    initecharts4 (data) {
      var mycharts3 = echarts.init(document.getElementById('show2'))
      const option3 = {
        title: {
          text: '污染物对比',
          left: 25,
          top: 20,
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          bottom: '5%',
          left: 'center',
          textStyle: {
            color: '#fff'
          },
          itemStyle: {
            borderWidth: 1
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} 吨 ({d}%)'
        },
        toolbox: {
          show: true,
          right: 10,
          top: 15,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: false },
            saveAsImage: { show: true }
          }
        },
        color: ['#91CC75', '#7ED3F4', '#5470C6', '#ffb300', '#ff6e00'],
        series: [
          {
            name: '该口污染物排放量对比',
            type: 'pie',
            radius: ['40%', '65%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 1
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: data
          }
        ]
      }
      mycharts3.setOption(option3)
      setTimeout(function () {
        window.onresize = function () {
          mycharts3.resize()
        }
      }, 200)
    },
    // 模型异常检测
    initecharts5 (data, time) {
      var mycharts2 = echarts.init(document.getElementById('show3'))
      const option2 = {
        title: {
          bottom: 0,
          text: time,
          // subtext: '实时实时概率评估',
          itemGap: -50,
          left: 'center',
          textStyle: {
            color: '#eee'
          },
          subtextStyle: {
            color: '#eee'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        graphic: {
          type: 'text',
          left: 10,
          top: '70%',
          style: {
            text: '成交量'
          }
        },

        legend: {
          top: '6%',
          left: '6%',
          textStyle: {
            color: '#fff',
            fontSize: 14
          },
          itemStyle: {
            borderWidth: 1
          }
        },
        color: ['#91CC75', '#7ED3F4', '#5470C6', '#ffb300', '#ff6e00'],
        series: [
          {
            name: '模型异常检测',
            type: 'pie',
            radius: [20, 89],
            center: ['38%', '54%'],
            roseType: 'area',
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#0a4550',
              borderWidth: 1
            },
            label: {
              show: true, // 展示label
              formatter: '{d}', // 指示线外显示百分比数
              position: 'inner',
              textStyle: {
                fontSize: 10,
                color: '#fff'
              }
            },
            labelLine: {
              show: false,
              length: 0, // 第一段长度
              length2: 0// 第二段长度 设置0不显示第二段
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '22',
                fontWeight: 'bold',
                color: '#00d8ff'
              }
            },
            data: data
          }
        ]
      }
      mycharts2.setOption(option2)
      setTimeout(function () {
        window.onresize = function () {
          mycharts2.resize()
        }
      }, 200)
    },
    // 近两年展示
    initecharts6 (datashow, name) {
      var mycharts9 = echarts.init(document.getElementById('show9'))
      var option9
      option9 = {
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%']
          }
        },
        title: {
          left: 'center',
          top: 20,
          textStyle: {
            color: '#fff'
          },
          text: '该排污口历史排污展示'
        },
        toolbox: {
          right: 10,
          top: 15,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: datashow[0]
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%']
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 10
          },
          {
            start: 0,
            end: 10
          }
        ],
        series: [
          {
            name: name + ' （吨）',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',
            itemStyle: {
              color: 'rgb(255, 70, 131)'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(255, 158, 68)'
                },
                {
                  offset: 1,
                  color: 'rgb(255, 70, 131)'
                }
              ])
            },
            data: datashow[1]
          }
        ]
      }
      mycharts9.setOption(option9)
      setTimeout(function () {
        window.onresize = function () {
          mycharts9.resize()
        }
      }, 200)
    },
    clearFilter () {
      this.$refs.filterTable.clearFilter()
    },
    resetDateFilter () {
      this.$refs.filterTable.clearFilter('sort')
    },
    formatter (row, column) {
      return row.address
    },
    filterTag (value, row) {
      return row.tag === value
    },
    filterHandler (value, row, column) {
      const property = column.property
      return row[property] === value
    }
  }
}
</script>

<style lang="less" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: url('./assets/bj.png') no-repeat;
  margin: 0;
  padding: 0;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  /* 加载旋转动画 */
  #load {
    width: 100%;
    height: 100%;
    position: absolute;
    background: url('./assets/data08.png') no-repeat #061537;
    background-size: cover;
    top: 0;
    left: 0;
    opacity: 1;
    z-index: 999;
    .load_img {
      position: absolute;
      left: calc(50% - 182px);
      top: calc(50% - 182px);
      img {
        position: absolute;
        left: 0;
        top: 0;
      }
      .jzxz1 {
        animation: xz1 8s infinite linear;
      }
      .jzxz2 {
        animation: xz2 7s infinite linear;
      }
    }
  }
  @keyframes xz1 {
    from {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes xz2 {
    from {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(-180deg);
    }
    to {
      transform: rotate(-360deg);
    }
  }
  .col {
    float: left;
    height: 90%;
    text-align: center;
  }
  .ctop {
    height: 10%;
    position: relative;
    overflow: hidden;
    img {
      position: absolute;
      height: 100%;
      width: 50%;
      top: 1%;
      left: 26.5%;
    }
    .link{
      position: absolute;
      left: 25px;
      top: 15px;
      font-size: calc(100vw * 20 /1380);
    }
    #gif {
      height: 370%;
      width: 76%;
      top: -95%;
      left: 14%;
    }
  }
  .cleft {
    width: 27%;
    .cards {
      width: 100%;
      height: 25%;
      background: url('./assets/bor1_4.png') no-repeat;
      background-size: 100% 100%;
      z-index: -1;
      content: '';
      .title {
        width: 100%;
        height: 30%;
        position: relative;
        span {
          position: absolute;
          top: 15%;
          left: 10%;
          color: #fff;
          font-size:calc(100vw * 26 / 1920);
          line-height: 135%;
        }
        img {
          width: 100%;
          position: absolute;
          left: 0;
          bottom: 0;
        }
        .el-dropdown {
          position: absolute;
          left: 55%;
          top: 2%;
          width: 50%;
          height: 50%;
        }
        .el-dropdown-link {
          position: absolute;
          left: -30%;
          bottom: 10%;
          width: 140%;
          height: 20%;
          font-size: calc(100vw * 22 / 1920); ;
          line-height: 200%;
          cursor: pointer;
          color: #40e6ff;
        }
      }
      .cardmain {
        width: 100%;
        height: 73%;
        display: flex;
        justify-content: center;
        align-items: center;
        .card {
          width: 32%;
          height: 80%;
          float: left;
          background: url('./assets/ksh40.png') no-repeat;
          background-size: 100% 100%;
          padding-bottom: 10px;
          margin-right: 5px;
          h3 {
            color: #fff;
            font-size:calc(100vw * 22 / 1920);
            padding: 6% 0 0 6%;
            height: 40px;
            margin: 0 5% 0 0;
          }
          p {
            height: 30%;
            line-height: 100%;
            color: #20dbfd;
            text-shadow: 0 0 25px #00d8ff;
            font-size: calc(100vw * 28 / 1920);
            font-family: 'yjsz';
            text-align: center;
            margin-top: 8%;
          }
        }
      }
      .card:nth-child(2n) {
        position: relative;
        width: 43%;
        p {
          width: 80px;
          height: 50px;
          margin-left: 3%;
          padding-left: 0px;
        }
        .speed {
          position: absolute;
          top: 36%;
          right: 5%;
          height: 60%;
          width: 57%;
        }
      }
      .card:nth-child(3) {
        width: 27%;
        .speed {
          top: 45px;
          right: 14px;
        }
      }
    }
    .sort {
      overflow: hidden;
      width: 100%;
      height: 35%;
      .title {
        width: 100%;
        height: 10%;
        position: relative;
        span {
          position: absolute;
          left: 3%;
          bottom: 4%;
          color: #fff;
          font-size:calc(100vw * 26 / 1920);
          line-height: 19px;
        }
        img {
          width: 110%;
          position: absolute;
          left: 0;
          bottom: -35%;
        }
      }
      .sortmain {
        padding-top: 5%;
        width: 100%;
        height: 100%;
        color: #d3dce6;
        font-size:calc(100vw * 23 / 1920);
        .span{
          width: 100%;
          height: 100%;
          color: #d3dce6;
          font-size:calc(100vw * 26 / 1980);
        }
        .el-dropdown{
          height: 10%;
          width: 40%;
          .el-dropdown-link{
          position: absolute;
          left: -30%;
          bottom: 75%;
          width: 140%;
          height: 20%;
          font-size: calc(100vw * 22 / 1920); ;
          line-height: 200%;
          cursor: pointer;
          color: #40e6ff;
        }
        }
        .box {
          display: flex;
          height: 12%;
          width: 100%;
          margin-top: 1.22%;
          div {
            float: left;
          }
          .item {
            height: 100%;
            width: 20%;
            float: left;
            padding-left: 5px;
            text-align: center;
            background-color: #01070e;
            border: none;
            color: #00d8ff;
            font-size:calc(100vw * 20 / 1920);
            line-height: 22px;
            margin: 0.0625rem;
          }
          .prog {
            margin-left: 0px;
            margin-top: 1%;
            margin-right: 2%;
            width: 50%;
            height: 70%;
            background-color: rgb(204, 17, 17);
            border-radius: 10px;
          }
        }
        .box:nth-child(4) .prog {
          width: 46%;
          background-color: rgb(248, 90, 16);
        }
        .box:nth-child(5) .prog {
          width: 38%;
          background-color: rgb(248, 194, 16);
        }
        .box:nth-child(6) .prog {
          width: 36%;
          background-color: rgb(248, 194, 16);
        }
        .box:nth-child(7) .prog {
          width: 28%;
          background-color: rgb(101, 248, 16);
        }
      }
    }
    .more {
      width: 100%;
      height: 40%;
      .title {
        width: 100%;
        height: 10%;
        position: relative;
        span {
          position: absolute;
          top: 16%;
          left: 5%;
          color: #fff;
          font-size:calc(100vw * 26 / 1980);
          line-height: 20px;
        }
        img {
          width: 100%;
          position: absolute;
          left: 0;
          bottom: -16%;
        }
      }
      .moremain {
        background-color: rgba(12, 34, 34, 0);
        width: 100%;
        height: 100%;
        /deep/ #ccc{
          width: 100%;
          height: 100%;
          #inccc{
            border: none;
            width: 100%;
            height: 100%;
            position: relative;
            #show4{
              border: none;
             height: 26vh;
    width: 27vw;
              padding-bottom: 10%;
              background-color: rgba(0,0,0,0) !important;
            }
            #show5{
              height: 26vh;
    width: 27vw;
              position: absolute;
              background-color: rgba(0,0,0,0) !important;
            }
          }
        }
      }
    }
    .card:nth-child(1) {
      width: 135px;
    }
    .card:nth-child(3) {
      width: 100px;
    }
    .card:nth-child(2) {
      width: 180px;
    }
  }
  .cmiddle {
    width: 45%;
    // background-color: #594daa;
    .presee {
      width: 100%;
      height: 50%;
      background-color: rgba(0,0,0,0);
      background: url('./assets/bor1_6.png') no-repeat;
      background-size: 100% 100%;
      z-index: -1;
      content: '';
      padding-top: 20px;
      .title {
        width: 100%;
        height: 16%;
        position: relative;
        overflow: hidden;
        span {
          position: absolute;
          top: 25%;
          left: 5%;
          color: #fff;
          font-size:calc(100vw * 28 / 1980);
          line-height: 135%;
        }
        img {
          width: 106%;
          position: absolute;
          left: 2%;
          bottom: 0;
        }
      }
      .preseemain {
        width: 100%;
        height: 88%;
        display: flex;
        .innerleft{
          width: 50%;
          height: 97%;
          float: left;
          .jilian{
            height: 13%;
            padding-top: 2%;
            margin-bottom: 2%;
          }
          #show3{
            width: 100%;
            height: 75%;
          }
        }
        .innerright{
          width: 50%;
          height: 97%;
          float: left;
          color: aliceblue;
          font-size: calc(100vh * 40 /1980);
          /deep/ .el-input__inner {
            margin: 2% 0;
          }
          .nowid {
            position: relative;
            height: 18%;
            width: 100%;
            line-height: 180%;
            color: rgb(7, 164, 192);
            font-size: calc(100vw * 24 / 1980);
            div{
              margin: 4% 0;
            }
            .zhuangtai{
              color: #03d5fa;
              text-shadow: 0 0 25px #00d8ff;
            }
            .text{
              width: 96%;
              overflow: hidden;
              color: #ffffff;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              span {
              font-weight: bold;
              color: #03d5fa;
              text-shadow: 0 0 25px #00d8ff;
              }
              /deep/ .el-button{
                    display: inline-block;
                    line-height: 1;
                    width: 70%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    cursor: pointer;
                    background: rgba(0,0,0,0);
                    border: 1px solid #000000;
                    color: #3BA2FF;
                    -webkit-appearance: none;
                    text-align: center;
                    box-sizing: border-box;
                    outline: 0;
                    margin: 4% 0;
                    padding: 0;
                    transition: .1s;
                    font-weight: 500;
                    font-size: calc(100vw * 25/1980);
                    border-radius: 4px;
              }
            }
            span {
              font-weight: bold;
              color: #03d5fa;
              text-shadow: 0 0 25px #00d8ff;
            }
            .btn-show {
              cursor: pointer;
              width: 20% !important;
              height: 55% !important;
              color: aliceblue;
            }
          }
          .jianyi{
            float: left;
            width: 90%;
            margin-top: 8%;
            font-size: calc(100vw * 25 / 1980);
            height: 100%;
          }
        }
      }
    }
    .nowdata {
      width: 100%;
      height: 50%;
      // background-color: #100c2a;
      .title {
        width: 100%;
        height: 50px;
        padding-top: 5px;
        position: relative;
        span {
          position: absolute;
          top: 18%;
          left: 5%;
          color: #fff;
          font-size:calc(100vw * 30 / 1980);
          line-height: 30px;
        }
        img {
          width: 100%;
          position: absolute;
          left: 0;
          bottom: 0;
        }
      }
      /* 滚动 */
      .monitor {
        height: 100%;
        width: 100%;
        .dv-scroll-board{
          color:rgb(228, 228, 228);
          /deep/ .header{
            color: #00A8F3;
            /deep/ .header-item{
              font-size: 1em;
              text-align: center;
              white-space: nowrap;
              color:#FFF !important;
            }
          }
          /deep/ .rows{
            .row-item{
              text-align: center;
              line-height: 2rem;
              .ceil{
                font-size: 1em;
                i{
                  font-size: 0.5em;
                }
              }
              .ceil:nth-child(2){
                font-size: 1.1em;
                width: 25%;
              }
            }
          }
        }
        .test{
          width: 10px;
          background-size: 10% 10%;
          word-break:keep-all;/* 不换行 */
          white-space:nowrap;/* 不换行 */
        }
      }
    }
  }
  .cright {
    .btn-show{
      cursor: pointer;
    }
    overflow: hidden;
    width: 28%;
    .single {
      width: 100%;
      height: 100%;
      .title {
        width: 100%;
        height: 50px;
        padding-top: 5px;
        position: relative;
        span {
          position: absolute;
          top: 12px;
          left: 10px;
          color: #fff;
          font-size:calc(100vw * 30 / 1980);
          line-height: 30px;
        }
        img {
          width: 125%;
          position: absolute;
          left: 0;
          bottom: 0;
        }
      }
      .singlemain {
        padding-top: 2%;
        width: 100%;
        height: 92%;
        color: #3bdefa;
        // background: url('./assets/bor1_2.png') no-repeat;
        background-size: 100% 100%;
        .block {
          height: 100%;
          #jilian {
            float: center;
            margin-right: 20px;
          }
        }
        .show {
          background: url('./assets/bor1_6.png') no-repeat;
          background-size: 100% 100%;
        }
        .nowid {
          height: 5%;
          width: 100%;
          font-size:calc(100vw * 21 / 1980);
          span {
            color: #03d5fa;
            text-shadow: 0 0 25px #00d8ff;
          }
          .btn-show {
            color: aliceblue;
          }
        }
        .show2 {
          height: 35%;
          width: 100%;
          margin-top: 20px;
        }
        .show1 {
          height: 50%;
          width: 100%;
        }
      }
    }
  }
  /deep/ .el-tabs__content {
    background-color: rgba(225, 25, 25, 0);
    height: 100%;
    padding: 0;
  }
  /deep/ .el-tabs {
    background-color: rgba(211, 36, 36, 0);
    border: 1px solid #030d18;
    .el-tabs__item{
      margin-right: 2px;
    }
  }
  /deep/ .el-tabs__nav-scroll {
    background-color: #030d18;
    border: 1px solid #030d18;
  }
  /deep/ .is-top {
    background-color: #030d18;
    font-size: 16px;
    color: #20dbfd;
    border: 1px solid #030d18;
  }
  /deep/ .el-input__inner {
    background-color: #00050b;
    border: #00d8ff solid 1px;
  }
  /deep/ .el-dropdown-link {
    margin-left: 20px;
    cursor: pointer;
    color: #409eff;
  }
  /deep/ #innerimportant {
    background-color: #ffffff;
    border: 1px solid #DCDFE6;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
}
.el-rate {
  display: inline-block;
  vertical-align: text-top;
}
/deep/ .is-active {
  color: #117fec !important;
  border-color: #409EFF !important;
}
#app .cleft .cards .title .el-dropdown-link {
  width: 125px;
  left: 0px;
}
#app .cleft .cards .sort .sortmain .box .item {
  height: 100%;
  width: 22%;
  float: left;
  padding-left: 5px;
  color: #00d8ff;
  font-size: 18px;
  line-height: 20px;
  margin: 0.0625rem;
}
</style>

<template>
<div id="app">
  <router-link to="/" style="text-decoration:none;"> <el-button type="primary" round>返回大屏</el-button></router-link>
  <div style="height:350px; width:300px; margin:20px auto;">
    <i>批量增加数据，以单excal文件上传</i>
    <div class="button_group" style="margin-bottom: 5%">
      <el-upload class="upload-demo" drag action="" :on-change="handleChange"
    :on-exceed="handleExceed"
    :on-remove="handleRemove"
    :file-list="fileListUpload"
    :limit="limitUpload"
    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
    :auto-upload="false">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传xlx/xlsx文件，且不超过20M<el-button type="primary" @click="resend" round>一键清洗重渲染</el-button></div>
      </el-upload>
    </div>
  </div>
  <div id="show"></div>
  <div style="width:100%; height:5%; font-size:30px; text-align: center;">全部数据展示</div>
   <el-table
    :data="tableData"
    height="500"
    border
    style="width: 70%; margin: 60px auto;">
    <el-table-column fixed prop="rtime" label="时间" width="250"> </el-table-column>
    <el-table-column prop="business_id" label="公司ID" width="220"> </el-table-column>
    <el-table-column prop="outfall_id" label="排污口ID" width="220"> </el-table-column>
    <el-table-column prop="pollu_id" label="污染物ID" width="120"> </el-table-column>
    <el-table-column prop="pollu_pl" label="污染物总量-t" width="200"> </el-table-column>
    <el-table-column prop="pollu_am" label="污染物浓度-mg/L" width="220"> </el-table-column>
    <el-table-column fixed="right"  width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="middle">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-tooltip placement="top" content="回到顶部">
      <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="0" transition-name="fade"/>
    </el-tooltip>

</div>
</template>

<script>
import * as echarts from 'echarts'
import BackToTop from '../../node_modules/element-ui/packages/backtop/index.js'
export default {
  name: 'Back',
  components: { BackToTop },
  data () {
    return {
      length: 0,
      list: [],
      fileListUpload: [],
      fileTemp: [],
      disbtn: false,
      myBackToTopStyle: {
        right: '50px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        borderRadius: '4px',
        lineHeight: '45px', // 请保持与高度一致以垂直居中
        background: '#e7eaf1'// 按钮的背景颜色
      },
      tableData: []
    }
  },
  created () {
    this.middleTwoHandleChange()
    this.getdata()
  },
  mounted () {
    this.initshow([[26079, 17035], [32053, 23027], [-5947, -5992]])
  },
  methods: {
    handleChange (file, fileList) {
      this.fileTemp = file.raw
      this.doBegin()
    },
    doBegin () {
      if ((this.fileTemp.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') || (this.fileTemp.type === 'application/vnd.ms-excel')) {
        this.disbtn = true
        this.importfxx(this.fileTemp)
        this.$message({
          message: '本地文件上传成功',
          type: 'success'
        })
        this.length = 1
      } else {
        this.$message({
          type: 'warning',
          message: '附件格式错误，请删除后重新上传！'
        })
        this.length = 1
      }
    },
    fixdata (data) { // 文件流转BinaryString
      var o = ''
      var l = 0
      var w = 10240
      for (; l < data.byteLength / w; ++l) { o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w))) }
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
      return o
    },
    // 日期格式转化
    turndata (serial, format) {
      var utcdays = Math.floor(serial - 25569)
      var utcvalue = utcdays * 86400
      var dateinfo = new Date(utcvalue * 1000)
      var fractionalday = serial - Math.floor(serial) + 0.0000001
      var totalseconds = Math.floor(86400 * fractionalday)
      var seconds = totalseconds % 60
      totalseconds -= seconds
      var hours = Math.floor(totalseconds / (60 * 60))
      var minutes = Math.floor(totalseconds / 60) % 60
      var d = new Date(dateinfo.getFullYear(), dateinfo.getMonth(), dateinfo.getDate(), hours, minutes, seconds)
      // 得到Date()对象后，便可进行日期格式化了！
      var add0 = (m) => m < 10 ? '0' + m : m
      var YYYY = d.getFullYear()
      var MM = add0(d.getMonth() + 1)
      var DD = add0(d.getDate())
      var hh = add0(d.getHours())
      var mm = add0(d.getMinutes())
      var ss = add0(d.getSeconds())
      return `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`
    },
    // Excel 转化
    importfxx (obj) {
      const _this = this
      // 通过DOM取文件数据
      this.file = obj
      var rABS = false // 是否将文件读取为二进制字符串
      var f = this.file
      var reader = new FileReader()
      // if (!FileReader.prototype.readAsBinaryString) {
      FileReader.prototype.readAsBinaryString = function (f) {
        var binary = ''
        var rABS = false // 是否将文件读取为二进制字符串
        var pt = this
        console.log(pt)
        var wb // 读取完成的数据
        var outdata
        var reader = new FileReader()
        reader.onload = function (e) {
          var bytes = new Uint8Array(reader.result)
          var length = bytes.byteLength
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i])
          }
          var XLSX = require('xlsx')
          if (rABS) {
            wb = XLSX.read(btoa(this.fixdata(binary)), { // 手动转化
              type: 'base64'
            })
          } else {
            wb = XLSX.read(binary, {
              type: 'binary'
            })
          }
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])// outdata就是你想要的东西
          // console.log(outdata[0].rtime)
          console.log(_this.turndata(outdata[0].rtime, '-'))
          outdata.forEach(item => {
            item.rtime = _this.turndata(item.rtime, '-')
          })
          console.log(outdata)
          localStorage.setItem('excal', JSON.stringify(outdata))
          this.da = [...outdata]
          const arr = []
          this.da.map(v => {
            const obj = {}
            obj.name = v['姓名']
            obj.age = v['年龄']
            arr.push(obj)
            _this.list = [...arr]
            _this.disbtn = false
          })
        }
        reader.readAsArrayBuffer(f)
      }
      if (rABS) {
        reader.readAsArrayBuffer(f)
      } else {
        reader.readAsBinaryString(f)
      }
    },
    handleRemove (file, fileList) {
      this.fileTemp = null
      this.length = 0
    },
    // 删除数据条
    async handleClick (row) {
      console.log(row)
      console.log(row.business_id)
      await this.$axios.get('delete', { params: { rtime: row.rtime, business_id: row.business_id, outfall_id: row.outfall_id, pollu_am: row.pollu_am, pollu_id: row.pollu_id, pollu_pl: row.pollu_pl } }).then(res => { // 这里使用了ES6的语法
        if (res.data.code === 200 && res.data.message === '成功') {
          this.$message({
            message: '恭喜你，该条数据删除成功！',
            type: 'success'
          })
          this.middleTwoHandleChange()
        } else {
          this.$message.error('错了哦，删除无效！')
        }
      }).catch(err =>
        console.log(err) // 请求失败返回的数据
      )
    },
    // 导入所有数据
    async middleTwoHandleChange () {
      await this.$axios.get('manage').then(res => {
        if (res.data.code === 200 && res.data.message === '成功') {
          this.tableData = res.data.data.alldata
        }
      })
    },
    // 数据传至数据库
    async resend () {
      if (this.length) {
        var outdata = JSON.parse(localStorage.getItem('excal'))
        localStorage.removeItem('excal')
        console.log(outdata)
        this.$message({
          message: '传至云端，开始清洗',
          type: 'success'
        })
        await this.$axios.post('upload', outdata, { headers: { 'Content-type': 'application/json; charset=utf-8' } }).then(res => {
          // this.$message({
          //   message: '恭喜你，该文件添加至数据库成功！',
          //   type: 'success'
          // })
          if (res.data.code === 200 && res.data.message === '成功') {
            this.$message({
              message: '恭喜你，该文件添加至数据库成功！',
              type: 'success'
            })
            this.middleTwoHandleChange()
            setTimeout(() => {
              this.$message({
                message: '清洗完成',
                type: 'success'
              })
              this.getdata()
            }, 2000)
          } else {
            this.$message.error('出错了，格式有误，添加无效！')
          }
        })
      } else {
        this.$message.error('没有文件上传个啥？？')
      }
    },
    // 获取表的数据
    async getdata () {
      // var data1 = [[27244, 21476], [35364, 30142], [-8120, -8396]]
      // [[173770,2321],[549325,4849],[380404,2528]]
      await this.$axios.get('cnt').then(res => {
        if (res.data.code === 200 && res.data.message === '成功') {
          console.log(res.data.data)
          var data = res.data.data
          var temp = data[2][0]
          data[2][0] = -temp
          var temp1 = data[2][1]
          data[2][1] = -temp1
          for (let index = 0; index < data.length; index++) {
            var temp2 = data[index][1] * 100
            data[index][1] = temp2
          }
          console.log(data)
          this.initshow(data)
        } else {
          this.$message.error('出错了！')
        }
      })
    },
    // 表的渲染
    initshow (data) {
      var show = document.getElementById('show')
      var myChart = echarts.init(show)
      var option1
      option1 = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: (value) => {
            console.log(value)
            value.forEach(item => {
              if (item.name === '实时数据') {
                return item.data / 100
              } else {
                return item.data
              }
            })
          }
        },
        legend: {
          data: ['正常', '超标', '全部']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'value',
            axisLabel: {
              formatter: (value) => {
                if (value < 0) return -value // 这里是针对取负值
                else return value
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'category',
            axisTick: {
              show: false
            },
            data: ['历史数据', '实时数据']
          }
        ],
        series: [
          {
            name: '正常',
            type: 'bar',
            label: {
              show: true,
              formatter: (value) => {
                if (value.name === '实时数据') {
                  return value.data / 100
                } else {
                  return value.data
                }
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: data[0]

          },
          {
            name: '全部',
            type: 'bar',
            stack: 'Total',
            label: {
              show: true,
              formatter: (value) => {
                if (value.name === '实时数据') {
                  return value.data / 100
                } else {
                  return value.data
                }
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: data[1]
          },
          {
            name: '超标',
            type: 'bar',
            stack: 'Total',
            label: {
              show: true,
              formatter: (value) => {
                if (value.name === '实时数据') {
                  return -(value.data / 100)
                } else {
                  return -value.data
                }
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: data[2]
          }
        ]
      }
      option1 && myChart.setOption(option1)
    }
  }
}
</script>

 <style lang="less" scope>
#app{
  height: 100%;
  overflow-x: hidden;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  #show{
    height: 500px;
    width: 500px;
    margin: 50px auto;
  }
}
</style>

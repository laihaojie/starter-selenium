const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { parseTime } = require('./utils')
const path = require('path')
const del = require('./utils/del')
const appHandle = require('./src/app/index.js')

const app = express()

//读取json配置
app.use(bodyParser.json({ limit: '1mb' }))
app.use(bodyParser.urlencoded({
  extended: true
}))

// 跨域
app.use(cors())



app.get('/', async function (req, res) {
  return res.send('Hello World')
})

app.get('/app', async function (req, res) {
  appHandle()
  res.send('app')
})

process.on('uncaughtException', err => {
  console.log('uncaughtException', err)

  return
})

process.on('unhandledRejection', err => {
  console.log('unhandledRejection', err)

  return
})

app.listen(3199, '0.0.0.0')

const heathTime = 60 * 1000
setInterval(async () => {
  const res = await fetch('http://127.0.0.1:3199').then(r => r.text())
  console.log(parseTime(new Date(), ''), res)
}, heathTime)

setInterval(async () => {
  const tempDir = path.join(path.parse(process.cwd()).root, 'Program Files (x86)')
  del.deleteScopedDirs(tempDir)
}, 1000 * 60 * 60 * 24)

console.log('http://127.0.0.1:3199')

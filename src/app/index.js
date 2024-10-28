const createDriver = require('../../utils/create')
const waitTime = 100000000
// const waitTime = 5000

async function main() {

  const url = 'https://www.baidu.com'
  const dro = await createDriver()

  await dro.get(url)
  
  await new Promise(resolve => setTimeout(resolve, waitTime))

  await dro.close()

}

module.exports = main

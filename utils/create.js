const path = require('path')
const fs = require('fs')
const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
let chrome = require('selenium-webdriver/chrome');

const executablePath = path.join(process.cwd(), 'bin/chromedriver/chromedriver.exe')
const chromeBinaryPath = path.join(process.cwd(), 'bin/chrome/chrome.exe')

let service = new chrome.ServiceBuilder(executablePath)
let options = new chrome.Options();
options.setBinaryPath(chromeBinaryPath)
// options.addArguments('--headless')

async function createDriver() {
  if (!fs.existsSync(executablePath)) {
    throw new Error('chromedriver.exe 不存在 请查看readme.md说明')
  }
  if (!fs.existsSync(chromeBinaryPath)) {
    throw new Error('chrome.exe 不存在 请查看readme.md说明')
  }

  let driver = await new Builder()
    .setChromeService(service)
    .setChromeOptions(options)
    .forBrowser(Browser.CHROME).build();

  return driver;
}

module.exports = createDriver;
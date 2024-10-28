const chalk = require('chalk')

function log(message) {
  console.log(chalk.bold.yellow(''.padStart(10, '-')) + chalk.bold.green(message) + chalk.bold.yellow(''.padStart(10, '-')) + '\n')
}

module.exports = log
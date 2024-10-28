const fs = require('fs')
const path = require('path')

function deleteScopedDirs(directory) {

    fs.readdir(directory, (err, files) => {
        if (err) {
            console.log('无法读取目录', err)
            return;
        }

        files.forEach(file => {
            const filePath = path.join(directory, file)

            fs.stat(filePath, (error, stats) => {
                if (error) {
                    console.log('获取文件信息出错', error)
                    return
                }

                if (stats.isDirectory() && file.startsWith('scoped_dir')) {
                    deleteScopedDirs(filePath)

                    fs.rmdir(filePath, { recursive: true, force: true }, (err) => {
                        if (err) {
                            console.log('删除文件夹出错', err)
                        }
                        else {
                            console.log('文件夹已成功删除', filePath)
                        }
                    })
                }
            })
        })
    })
}

module.exports = {
    deleteScopedDirs
}
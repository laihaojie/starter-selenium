/**
 * 
 * @param {*} time 
 * @param {String} cFormat 
 * @returns 
 */

function parseTime(time, cFormat) {
    if (arguments.length === 0 || !time) time = new Date('1970')
    if (time.length === 6 && (/^[0-9]+$/.test(time))) time = time.replace(/(?<=\d{4})/, '-')
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date = new Date();
    if (typeof time === 'object') {
        date = time
    }
    else {
        if ((typeof time == 'string')) {
            if ((/^[0-9]+$/.test(time)) && time.length > 9) {
                time = parseInt(time)
            }
            else {
                time = time.replace(/-/gm, '/')
            }
        }

        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        date = new Date(time)
    }

    if (date == 'Invalid Date') {
        if (/\d{4}/.test(time.slice(0, 4))) {
            date = new Date(time.slice(0, 4) || '1970')
        } else {
            date = new Date('1970')
        }
    }

    date = new Date(date.getTime() + 1000)

    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay(),
    }
    const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
        const value = formatObj[key]
        if (key === 'a') return ['日', '一', '二', '三', '四', '五', '六'][value]
        return value.toString().padStart(2, '0')
    })
    return time_str
}

async function parseRes(res) {
    const text = await res.text()
    let result;
    let code = 1
    try {
        result = JSON.parse(text)
    } catch (error) {
        code = 2
    }
    const returnData = {
        data: result
    }
    return returnData
}

module.exports = {
    parseTime,
    parseRes,
}
document.addEventListener("DOMContentLoaded", function (event) {
    const stdoutEl = document.getElementById('stdout')
    const stdinEl = document.getElementById('stdin')
    let history = JSON.parse(localStorage.getItem('hist_v1') || '[]')
    let historyIndex
    const resetHistoryIndex = () => historyIndex = history.length
    resetHistoryIndex()
    const historyPush = (cmd) => {
        historyIndex = history.push(cmd)
        if (history.length > 100) {
            history = history.slice(-100)
        }
        localStorage.setItem('hist_v1', JSON.stringify(history))
    }
    const hndlrs = {
        'Enter': () => processCmd(),
        'ArrowUp': (e) => {
            historyIndex -= 1
            if (historyIndex < 0) { historyIndex = 0; return }
            stdinEl.value = history[historyIndex]
            e.preventDefault()
        },
        'ArrowDown': (e) => {
            historyIndex += 1
            if (historyIndex >= history.length) { historyIndex = history.length; return }
            stdinEl.value = history[historyIndex]
            e.preventDefault()
        },
        'KeyC': (e) => { if (e.ctrlKey) { resetHistoryIndex(); stdinEl.value = '' } }
    }
    stdinEl.addEventListener('keydown', e => {
        hndlrs[e.code] && hndlrs[e.code](e)
        if (!(e.code in hndlrs)) {
            resetHistoryIndex()
        }
    })
    const el = (descr, html) => {
        const [elName, className] = descr.split('.')
        const created = document.createElement(elName)
        if (className) { created.className = className }
        created.dataset.timestamp = (+new Date()).toString()
        created.innerHTML = html
        // const last = stdoutEl.lastChild
        stdoutEl.appendChild(created)
        created.scrollIntoView({ block: 'start', behavior: 'smooth' })
    }
    function appendTable(obj) {
        const entries = Object.entries(obj).map(([k, v]) => [k].concat(v))
        const transp = entries[0].map((col, i) => entries.map(row => row[i]))
        const tableHtml = `<table>${transp.map((row, i) =>
            `<tr>${row.map(cell =>
                i === 0 ? `<th>${cell}</th>` : `<td>${cell}</td>`).join('')}</tr>`).join('')}</table>`
        el('div.table', tableHtml)
    }
    function appendValue(val, className) {
        el('div.' + className, val)
    }
    function processCmd() {
        const text = stdinEl.value
        el('div.cmd', text)
        historyPush(text)
        stdinEl.value = ''
        ws.send(text)
    }
    function appendScalar(v, type, indent = 0) {
        if (type === '') { v = null }
        if (type === 'single' || type === 'real') { v = v && v.replace(/e$/, '') }
        if (type === 'double' || type === 'float') { v = v && v.replace(/f$/, '') }
        const knownTypes = [
            'bool', 'byte', 'short', 'int', 'long', 'symbol', 'char', 'guid', 'real', 'float', 'single', 'double',
            'date', 'minute', 'second', 'time', 'timestamp', 'datetime',
            'l', ''
        ]
        if (knownTypes.includes(type)) {
            return appendValue(' '.repeat(indent) + v, type)
        }
        appendValue(`${' '.repeat(indent)}(${type}): ${v}`, 'unknown')
    }
    function appendKv(entry, indent = 0) {
        const [k, v] = entry
        el('div.entry', `${' '.repeat(indent)}<span class="symbol">${k}</span>: ${v}`)
    }
    const ws = new WebSocket(`ws://${location.hostname}:5100`)
    ws.onmessage = function incoming(e) {
        console.log(e.data)
        try {
            const resp = JSON.parse(e.data)
            if (resp.type === 'err') { return appendValue(resp.data, 'err') }
            const [tp1, tp2] = resp.type
            if (tp2 === 'table') { return appendTable(resp.data) }
            if (tp1 === 's') { return appendScalar(resp.data, tp2) }
            if (tp1 === 'v') {
                if (tp2 === 'char') {
                    return appendValue(resp.data, 'string')
                }
                appendValue('[', 'bracket')
                resp.data.forEach(v => appendScalar(v, tp2, 2))
                appendValue(']', 'bracket')
                return
            }
            if (tp2 === 'dict') {
                appendValue('{', 'bracket')
                Object.entries(resp.data).forEach(e => appendKv(e, 2))
                appendValue('}', 'bracket')
                return
            }
            appendValue(`(${resp.type}): ${JSON.stringify(resp.data, null, 2)}`, 'unknown')
        } catch (e) {
            appendValue(e.message, 'err')
        }
        console.log()
    }
});
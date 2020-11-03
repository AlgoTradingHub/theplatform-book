document.addEventListener("DOMContentLoaded", function (event) {
    let stdin = document.querySelector("#stdin");
    let stdout_pre = document.querySelector("#stdout-pre");
    let stdout = document.querySelector("#stdout");

    document.onclick = function () {
        stdin.focus();
    }

    let history = JSON.parse(localStorage.getItem('hist_v1') || '[]')
    let historyIndex
    const resetHistoryIndex = () => historyIndex = history.length - 1
    resetHistoryIndex()

    const historyPush = (cmd) => {
        historyIndex = history.push(cmd)
        // if (history.length > 100) {
        //     history = history.slice(-100)
        // }
        // localStorage.setItem('hist_v1', JSON.stringify(history))
    }

    const hndlrs = {
        'Enter': () => processCmd(),
        'ArrowUp': (e) => {
            historyIndex -= 1
            if (historyIndex < 0) { historyIndex = 0; return }
            stdin.value = history[historyIndex]
            e.preventDefault()
        },
        'ArrowDown': (e) => {
            historyIndex += 1
            if (historyIndex >= history.length) { historyIndex = history.length - 1; return }
            stdin.value = history[historyIndex]
            e.preventDefault()
        },
        'KeyC': (e) => { if (e.ctrlKey) { resetHistoryIndex(); stdin.value = '' } }
    }

    stdin.addEventListener('keydown', e => {
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
        stdoutEl.appendChild(created)
        created.scrollIntoView({ block: 'start', behavior: 'smooth' })
    }

    stdin.focus();

    const ws = new WebSocket(`ws://${location.hostname}:5100`)
    ws.onmessage = function incoming(e) {
        if (e.data.trim() != "") {
            stdout.innerHTML += e.data + "\r\no)";
            Prism.highlightAll();
            stdout_pre.scrollTop = stdout_pre.scrollHeight;
        }
    }

    function processCmd() {
        let text = stdin.value;
        stdin.value = '';
        stdout.innerHTML += text + "\r\n";
        ws.send(text);
        historyPush(text);
    }
});
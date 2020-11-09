document.addEventListener("DOMContentLoaded", function (event) {
    let stdin = document.querySelector("#stdin");
    let stdout_pre = document.querySelector("#stdout-pre");
    let stdout = document.querySelector("#stdout");
    let status = document.querySelector("#status");

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
        'NumpadEnter': () => processCmd(),
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
        let code = e.keyCode === 13 ? 'Enter' : e.keyCode;
        hndlrs[code] && hndlrs[code](e)
        if (!(code in hndlrs)) {
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

    const ws = (location.protocol === 'https:') ?
        // secure SSL websockets
        new WebSocket(`wss://${location.hostname}/ws`)
        :
        new WebSocket(`ws://${location.hostname}:45101`)
        ;

    ws.onopen = function (e) {
        status.innerHTML = "connected"
        ws.send("ps1[]");
    };

    ws.onclose = function (event) {
        status.innerHTML = "disconnected"
        stdin.disabled = true
    };

    ws.onerror = function (error) {
        status.innerHTML = error.message
        stdin.disabled = true
    };

    ws.onmessage = function incoming(e) {
        stdin.disabled = false
        if (e.data.trim() != "") {
            processMsg(e.data)
        }
    }

    function processMsg(msg) {
        stdout.innerHTML += msg + "\r\no)";
        Prism.highlightAll();
        stdout_pre.scrollTop = stdout_pre.scrollHeight;
    }

    function processCmd() {
        let text = stdin.value;
        stdin.value = '';
        stdout.innerHTML += text + "\r\n";
        ws.send(text);
        historyPush(text);
    }
});

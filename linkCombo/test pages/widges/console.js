;
(function() {
    var DEBUG = true;
    var showMsg = true;
    var maxMsgcount = 24;
    var msgCount = 0;
    if (!DEBUG) {
        return;
    }

    setTimeout(function() {
        if (!showMsg) {
            showMsg = true;
            addMsg(["show-----"], 'log');
        }
    }, 10000);

    var _console = window.console;
    var container = null;

    function init() {
        container = document.createElement('div');
        container.className = '__console';
        document.body.appendChild(container);
    }
    var _msg = [];

    function addMsg(msg, level) {
        msgCount++;
        if(msgCount > maxMsgcount){
            msgCount = 0;
            container.innerHTML = '';
        }
        var strMsg = '';
        for (var i = 0; i < msg.length; i++) {
            strMsg += msg[i];
            strMsg += ' ';
        }
        if (!showMsg) {
            _msg.push(strMsg);
            return;
        } else {
            addEle(strMsg, level)
        }
        if (_msg.length !== 0) {
            var m;
            while (m = _msg.shift()) {
                addEle(m, '');
            }
        }
    }

    function getFunctionName(func) {
        if (typeof func == 'function' || typeof func == 'object') {
            var name = ('' + func).match(/function\s*([\w\$]*)\s*\(/);
        }
        return name && name[1];
    }

    function addEle(msg, level) {
        var ele = document.createElement('div');
        ele.className = level;
        ele.innerHTML = msg;
        container.appendChild(ele);
        container.scrollTop = container.scrollHeight;
    }

    window.console = {
        log: function() {
            addMsg(arguments, 'log');
            if (_console) {
                _console.log.apply(_console, arguments);
            }
        },
        error: function() {
            addMsg(arguments, 'error');
            if (_console) {
                _console.log.apply(_console, arguments);
            }
        },
        debug: function() {
            addMsg(arguments, 'debug');
            if (_console) {
                _console.log.apply(_console, arguments);
            }
        },
        info: function() {
            addMsg(arguments, 'info');
            if (_console) {
                _console.log.apply(_console, arguments);
            }
        }
    }
    init();
})();

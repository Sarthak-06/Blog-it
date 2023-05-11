"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IPCClient = void 0;
const http = require("http");
class IPCClient {
    constructor(handlerName) {
        this.handlerName = handlerName;
        const ipcHandlePath = process.env['VSCODE_GIT_IPC_HANDLE'];
        if (!ipcHandlePath) {
            throw new Error('Missing VSCODE_GIT_IPC_HANDLE');
        }
        this.ipcHandlePath = ipcHandlePath;
    }
    call(request) {
        const opts = {
            socketPath: this.ipcHandlePath,
            path: `/${this.handlerName}`,
            method: 'POST'
        };
        return new Promise((c, e) => {
            const req = http.request(opts, res => {
                if (res.statusCode !== 200) {
                    return e(new Error(`Bad status code: ${res.statusCode}`));
                }
                const chunks = [];
                res.on('data', d => chunks.push(d));
                res.on('end', () => c(JSON.parse(Buffer.concat(chunks).toString('utf8'))));
            });
            req.on('error', err => e(err));
            req.write(JSON.stringify(request));
            req.end();
        });
    }
}
exports.IPCClient = IPCClient;
//# sourceMappingURL=ipcClient.js.map
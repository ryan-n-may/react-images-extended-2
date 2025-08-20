"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debuginfo = void 0;
const showLogs = true;
function debuginfo(message) {
    if (showLogs)
        console.log(message);
}
exports.debuginfo = debuginfo;

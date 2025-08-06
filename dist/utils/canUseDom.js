"use strict";
// Return true if window + document
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = !!(typeof window !== 'undefined'
    && window.document
    && window.document.createElement);

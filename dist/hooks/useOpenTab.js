"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOpenTab = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ComponentState_1 = require("../ComponentState");
const LightboxFullScreenPage_1 = require("../pages/LightboxFullScreenPage");
const useNewTab_1 = require("./useNewTab");
const useOpenTab = (lightboxState) => {
    const { open: openNewTab } = (0, useNewTab_1.useNewTab)();
    const callbackMethods = (0, ComponentState_1.useCallbackMethods)();
    const handleTabOpen = () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            yield openNewTab((0, jsx_runtime_1.jsx)(ComponentState_1.LightboxProvider, { initialState: lightboxState, children: (0, jsx_runtime_1.jsx)(LightboxFullScreenPage_1.LightboxFullScreenPage, {}) }));
            (_a = callbackMethods.onClose) === null || _a === void 0 ? void 0 : _a.call(callbackMethods); // close main component when new tab opened
        }
        catch (error) {
            console.error("Error opening new tab:", error);
        }
    });
    return {
        open: handleTabOpen,
    };
};
exports.useOpenTab = useOpenTab;

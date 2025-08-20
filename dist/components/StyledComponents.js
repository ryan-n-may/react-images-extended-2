"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FigureContainerFullScreen = exports.ImageSpinnerWrapper = exports.ImageContainer = exports.ImageComponent = exports.ReaderModeImageFullscreen = exports.ImageFullscreen = exports.HeaderPiP = exports.PageCount = exports.HeaderGroup = exports.Header = exports.NoGradientThumbnail = exports.PinnedThumbnail = exports.RightGradientThumbnail = exports.LeftGradientThumbnail = exports.VerticalThumbnailScroller = exports.ThumbnailScroller = exports.ThumnailBar = exports.CollapsedControls = exports.Thumbnail = exports.Portal = exports.HiddenPortal = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const constants_1 = require("../utils/constants");
// Portal Components
const HiddenPortal = (props) => ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "fixed inset-0 w-screen h-screen flex items-center justify-center invisible bg-transparent", style: { zIndex: -constants_1.MODAL_Z_INDEX } }, props)));
exports.HiddenPortal = HiddenPortal;
const Portal = (props) => ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "fixed inset-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-90", style: { zIndex: constants_1.MODAL_Z_INDEX } }, props)));
exports.Portal = Portal;
const Thumbnail = (_a) => {
    var { active } = _a, props = __rest(_a, ["active"]);
    return ((0, jsx_runtime_1.jsx)("img", Object.assign({ className: `w-12 h-12 relative object-cover rounded-md border-2 cursor-pointer ${active ? "border-white" : "border-transparent"}`, style: { zIndex: constants_1.FOOTER_Z_INDEX } }, props)));
};
exports.Thumbnail = Thumbnail;
// Control Components
const CollapsedControls = (props) => ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "bg-neutral-900 bg-opacity-90 p-2 relative rounded-lg gap-1 flex items-center justify-between flex-wrap min-w-0" }, props)));
exports.CollapsedControls = CollapsedControls;
const ThumnailBar = (props) => ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "bg-neutral-900 bg-opacity-90 p-2 relative rounded-lg gap-1 flex items-center justify-between flex-wrap min-w-0", style: { zIndex: constants_1.HEADER_Z_INDEX } }, props)));
exports.ThumnailBar = ThumnailBar;
const ThumbnailScroller = (props) => ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "flex items-center justify-center gap-1 min-w-0", style: { zIndex: constants_1.HEADER_Z_INDEX } }, props)));
exports.ThumbnailScroller = ThumbnailScroller;
const VerticalThumbnailScroller = (props) => ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "flex flex-col items-center justify-center gap-2 min-w-0 h-full overflow-y-auto", style: { zIndex: constants_1.HEADER_Z_INDEX } }, props)));
exports.VerticalThumbnailScroller = VerticalThumbnailScroller;
const LeftGradientThumbnail = (props) => {
    var _a;
    const fractionalScale = ((_a = props.progressiveScale) !== null && _a !== void 0 ? _a : 100) / 100;
    return ((0, jsx_runtime_1.jsx)("img", Object.assign({ className: `w-12 h-12 relative object-cover rounded-md cursor-pointer shadow-md opacity-75 transform-gpu`, style: {
            opacity: fractionalScale,
        } }, props)));
};
exports.LeftGradientThumbnail = LeftGradientThumbnail;
const RightGradientThumbnail = (props) => {
    var _a;
    const fractionalScale = ((_a = props.progressiveScale) !== null && _a !== void 0 ? _a : 100) / 100;
    return ((0, jsx_runtime_1.jsx)("img", Object.assign({ className: `w-12 h-12 relative object-cover rounded-md cursor-pointer shadow-md opacity-75 transform-gpu`, style: {
            opacity: fractionalScale,
        } }, props)));
};
exports.RightGradientThumbnail = RightGradientThumbnail;
const PinnedThumbnail = (props) => ((0, jsx_runtime_1.jsx)("div", { className: "rounded-md border-2 border-white", children: (0, jsx_runtime_1.jsx)("img", Object.assign({ className: `w-12 h-12 relative object-cover rounded-md cursor-pointer shadow-md opacity-100 transform-gpu` }, props)) }));
exports.PinnedThumbnail = PinnedThumbnail;
const NoGradientThumbnail = (props) => ((0, jsx_runtime_1.jsx)("div", { className: "rounded-md border-2 border-white", children: (0, jsx_runtime_1.jsx)("img", Object.assign({ className: `w-12 h-12 relative object-cover rounded-md cursor-pointer shadow-md opacity-100 transform-gpu` }, props)) }));
exports.NoGradientThumbnail = NoGradientThumbnail;
const Header = (props) => ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "relative gap-2 flex items-center justify-center flex-wrap min-w-0", style: Object.assign({ zIndex: constants_1.HEADER_Z_INDEX }, props.style) }, props)));
exports.Header = Header;
const HeaderGroup = (props) => ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "bg-neutral-900 bg-opacity-90 p-2 relative rounded-lg gap-1 flex items-center justify-between flex-wrap min-w-0", style: Object.assign({ zIndex: constants_1.HEADER_Z_INDEX }, props.style) }, props)));
exports.HeaderGroup = HeaderGroup;
const PageCount = (props) => ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "text-white p-2 relative rounded-lg gap-1 flex items-center justify-between flex-wrap min-w-0", style: Object.assign({ zIndex: constants_1.HEADER_Z_INDEX }, props.style) }, props)));
exports.PageCount = PageCount;
const HeaderPiP = (props) => ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "bg-gray-100 bg-opacity-90 p-1 relative rounded-lg gap-0.5 flex items-center justify-between min-w-0 flex-shrink", style: Object.assign({ zIndex: constants_1.HEADER_Z_INDEX }, props.style) }, props)));
exports.HeaderPiP = HeaderPiP;
// Image Components
const ImageFullscreen = (props) => ((0, jsx_runtime_1.jsx)("img", Object.assign({ className: "relative w-full h-full overflow-auto", style: { zIndex: constants_1.IMAGE_Z_INDEX } }, props)));
exports.ImageFullscreen = ImageFullscreen;
const ReaderModeImageFullscreen = (props) => ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex w-full h-full gap-2" }, props.manipulation, { children: [(0, jsx_runtime_1.jsx)("img", Object.assign({ index: 1, className: "relative w-full h-full overflow-auto block", style: { zIndex: constants_1.IMAGE_Z_INDEX } }, props.image1)), (0, jsx_runtime_1.jsx)("img", Object.assign({ index: 2, className: "relative w-full h-full overflow-auto block", style: { zIndex: constants_1.IMAGE_Z_INDEX } }, props.image2))] })));
exports.ReaderModeImageFullscreen = ReaderModeImageFullscreen;
const ImageComponent = (props) => ((0, jsx_runtime_1.jsx)("img", Object.assign({ className: "relative overflow-auto block", style: { zIndex: constants_1.IMAGE_Z_INDEX } }, props)));
exports.ImageComponent = ImageComponent;
const ImageContainer = (props) => ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "relative w-full h-full flex items-center justify-center overflow-scroll", style: { zIndex: constants_1.IMAGE_Z_INDEX } }, props)));
exports.ImageContainer = ImageContainer;
const ImageSpinnerWrapper = (props) => ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "flex items-center justify-center w-screen h-screen" }, props)));
exports.ImageSpinnerWrapper = ImageSpinnerWrapper;
const FigureContainerFullScreen = (props) => ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "h-[80vh] w-full p-4 box-border flex flex-col items-center justify-center" }, props)));
exports.FigureContainerFullScreen = FigureContainerFullScreen;

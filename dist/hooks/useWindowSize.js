"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWindowSize = void 0;
const react_1 = require("react");
function useWindowSize() {
    const [size, setSize] = (0, react_1.useState)({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    (0, react_1.useEffect)(() => {
        const handleResize = () => {
            setSize({ width: window.innerWidth, height: window.innerHeight });
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return size;
}
exports.useWindowSize = useWindowSize;

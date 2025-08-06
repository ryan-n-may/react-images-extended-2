"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FigureContainerFullScreen = exports.ImageSpinnerWrapper = exports.ImageContainer = exports.ImageComponent = exports.ImageFullscreen = exports.HeaderPiP = exports.Header = exports.ThumnailBar = exports.CollapsedControls = exports.Thumbnail = exports.Component = exports.Portal = exports.PiPPortal = exports.HiddenPortal = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
const constants_1 = require("../utils/constants");
const react_1 = require("@chakra-ui/react");
exports.HiddenPortal = styled_components_1.default.div `
  position: fixed;
  inset: 0;
  z-index: -${constants_1.MODAL_Z_INDEX};
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: hidden;
`;
exports.PiPPortal = styled_components_1.default.div `
  position: fixed;
  inset: 0;
  z-index: ${constants_1.MODAL_Z_INDEX};
  background-color: rgba(0, 0, 0, 0);
`;
exports.Portal = styled_components_1.default.div `
  position: fixed;
  inset: 0;
  z-index: ${constants_1.MODAL_Z_INDEX};
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`;
exports.Component = (0, styled_components_1.default)(react_1.VStack) `
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 10px;
`;
exports.Thumbnail = styled_components_1.default.img `
  width: 50px;
  height: 50px;
  position: relative;
  object-fit: cover;
  border-radius: 0.375rem; /* same as Chakra's "md" */
  border: 2px solid ${({ active }) => (active ? 'white' : 'transparent')};
  cursor: pointer;
  z-index: ${constants_1.FOOTER_Z_INDEX};
`;
exports.CollapsedControls = (0, styled_components_1.default)(react_1.HStack) `
  background-color: rgb(196, 196, 196);
  border-radius: 0.5rem;
`;
exports.ThumnailBar = (0, styled_components_1.default)(react_1.HStack) `
  background-color: #f5f5f5;
  padding: 0.5rem;
  position: relative;
  border-radius: 0.5rem;
  gap: 0.25rem;
  align-items: center;
  justify-content: space-between;
  z-index: ${constants_1.HEADER_Z_INDEX};
  min-width: 0;
  flex-wrap: wrap;
`;
exports.Header = (0, styled_components_1.default)(react_1.HStack) `
  background-color: #f5f5f5;
  padding: 0.5rem;
  position: relative;
  border-radius: 0.5rem;
  gap: 0.25rem;
  align-items: center;
  justify-content: space-between;
  z-index: ${constants_1.HEADER_Z_INDEX};
  min-width: 0;
  flex-wrap: wrap;

  /* For very small containers, stack buttons vertically */
  @container (max-width: 250px) {
    flex-direction: column;
    gap: 0.125rem;
    padding: 0.25rem;
  }

  /* For medium small containers, reduce spacing */
  @container (max-width: 400px) {
    gap: 0.125rem;
    padding: 0.25rem;

    & button {
      min-width: 24px;
      min-height: 24px;
      padding: 0.125rem;
    }
  }
`;
exports.HeaderPiP = (0, styled_components_1.default)(react_1.HStack) `
  background-color: #f5f5f5;
  padding: 0.25rem;
  position: relative;
  border-radius: 0.5rem;
  gap: 0.125rem;
  align-items: center;
  justify-content: space-between;
  z-index: ${constants_1.HEADER_Z_INDEX};
  min-width: 0;
  flex-shrink: 1;

  /* Ensure buttons are small and compact */
  & button {
    min-width: 20px !important;
    min-height: 20px !important;
    width: 20px !important;
    height: 20px !important;
    padding: 0 !important;
    font-size: 12px !important;

    & svg {
      width: 12px !important;
      height: 12px !important;
    }
  }

  /* Hide less critical buttons when space is very limited */
  @container (max-width: 200px) {
    & button:not(:first-child):not(:last-child):not([data-critical='true']) {
      display: none;
    }
  }
`;
exports.ImageFullscreen = styled_components_1.default.img `
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
  z-index: ${constants_1.IMAGE_Z_INDEX};
`;
exports.ImageComponent = styled_components_1.default.img `
  position: relative;
  overflow: auto;
  display: block;
  z-index: ${constants_1.IMAGE_Z_INDEX};
`;
exports.ImageContainer = styled_components_1.default.div `
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: scroll;
  z-index: ${constants_1.IMAGE_Z_INDEX};
`;
exports.ImageSpinnerWrapper = styled_components_1.default.div `
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vh;
  height: 100vh;
`;
exports.FigureContainerFullScreen = styled_components_1.default.div `
  height: 80vh;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* optional: center content vertically */
`;

import styled from 'styled-components';
import { HEADER_Z_INDEX, FOOTER_Z_INDEX, MODAL_Z_INDEX, IMAGE_Z_INDEX } from '../utils/constants';
import { HStack, VStack } from '@chakra-ui/react';

export const HiddenPortal = styled.div`
  position: fixed;
  inset: 0;
  z-index: -${MODAL_Z_INDEX};
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: hidden;
`;

export const PiPPortal = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${MODAL_Z_INDEX};
  background-color: rgba(0, 0, 0, 0);
`;

export const Portal = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${MODAL_Z_INDEX};
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Component = styled(VStack)`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 10px;
`;

export const Thumbnail = styled.img<{ active: boolean }>`
  width: 50px;
  height: 50px;
  position: relative;
  object-fit: cover;
  border-radius: 0.375rem; /* same as Chakra's "md" */
  border: 2px solid ${({ active }) => (active ? 'white' : 'transparent')};
  cursor: pointer;
  z-index: ${FOOTER_Z_INDEX};
`;

export const CollapsedControls = styled(HStack)`
  background-color: rgb(196, 196, 196);
  border-radius: 0.5rem;
`;

export const ThumnailBar = styled(HStack)`
  background-color: #f5f5f5;
  padding: 0.5rem;
  position: relative;
  border-radius: 0.5rem;
  gap: 0.25rem;
  align-items: center;
  justify-content: space-between;
  z-index: ${HEADER_Z_INDEX};
  min-width: 0;
  flex-wrap: wrap;
`;

export const Header = styled(HStack)`
  background-color: #f5f5f5;
  padding: 0.5rem;
  position: relative;
  border-radius: 0.5rem;
  gap: 0.25rem;
  align-items: center;
  justify-content: space-between;
  z-index: ${HEADER_Z_INDEX};
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

export const HeaderPiP = styled(HStack)`
  background-color: #f5f5f5;
  padding: 0.25rem;
  position: relative;
  border-radius: 0.5rem;
  gap: 0.125rem;
  align-items: center;
  justify-content: space-between;
  z-index: ${HEADER_Z_INDEX};
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

export const ImageFullscreen = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
  z-index: ${IMAGE_Z_INDEX};
`;

export const ImageComponent = styled.img`
  position: relative;
  overflow: auto;
  display: block;
  z-index: ${IMAGE_Z_INDEX};
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: scroll;
  z-index: ${IMAGE_Z_INDEX};
`;

export const ImageSpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vh;
  height: 100vh;
`;

export const FigureContainerFullScreen = styled.div`
  height: 80vh;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* optional: center content vertically */
`;

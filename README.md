# React Images Extended

This is a fork of () with the following changes made

- Updated to the lateat typescript version. 
- Updated to the latest version of react.
- Converted to use functional components.
- Added picture-in-picture mode.
- Added controls including image inversion.

To do: 
- Make this package fully themeable with chakra themes.
- Add extensibility with custom controls that gain access to the lightbox state.

### Why this fork ?
I needed to replicate the functionality of the original package, but improve maintainability and modernise the implementation.

### Quick start


```bash
npm install --save react-images-extended-2
```
or
```bash
yarn add react-images-extended-2
```

Minimal example code:
```jsx
import { JSX } from 'react';
import { Lightbox, IImage } from 'react-images-extended-2';

export function DocumentPreview(props: { documents?: string[] }): JSX.Element {
  const images: Array<IImage> = props.documents.map((item: string) => ({
    src: item
  }));
  return <Lightbox images={images} showThumbnails />;
}

```

## Options 

Property	|	Type		|	Default		|	Description
:-----------------------|:--------------|:--------------|:--------------------------------
images	|	`Array<IImage>`	|	false	|	Images to be displayed in the courassel.
customControls | `Array<ICustomControl>;` | optional | Allows configuring custom controls.
showCloseButton | boolean | optional | Show or hide the close button "X".
showThumbnails | boolean | optional | show or hide the thumbnails at the bottom of the display.
displayMode | ILightboxDisplayMode | optional | determines the starting display mode of the image viewer.
initialPipWidth | number | 300px | determines the starting width of the resizable PiP.
initialPipHeight | number | 800px | determines the starting height of the resizable PiP.
onClickImage | `() => void`  | optional  | Callback triggered when an image is cliked.
onClickNext | `() => void`  | optional  | Callback triggered when navigating to the next image.
onClickPrev | `() => void`  | optional  | Callback triggered when navigating to the previous image.
onClickThumbnail | `() => void`  | optional  | Callback triggered when navigating to the thumbnail image.
onClose | `() => void`  | optional  | Callback triggered when closing the image viewer. 
onRotateLeft | `() => void`  | optional  | Callback triggered when rotating the image left.
onRotateRight | `() => void`  | optional  | Callback triggered when rotating the image right.
onZoomIn | `() => void`  | optional  | Callback triggered when zooming in.
onZoomOut | `() => void`  | optional  | Callback triggered when zooming out.
onSave | `(currentImage: number, state: {zoom: number, rotation: number}) => void` | optional | Callback triggered when saving an image.


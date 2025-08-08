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

```jsx
import { Lightbox, IImage } from 'react-images-extended-2';

export function Sample (props: { images: Array<IImage> }) {
  ...
  return (
    <Lightbox
      images={props.images}
      showThumbnails
    />
  );
}
```

## Options ( NOT UPDATED YET )

Property	|	Type		|	Default		|	Description
:-----------------------|:--------------|:--------------|:--------------------------------
backdropClosesModal	|	bool	|	false	|	Allow users to exit the lightbox by clicking the backdrop
closeButtonTitle | string | ' Close (Esc) ' | Customize close esc title
enableKeyboardInput | bool  | true  | Supports keyboard input - <code>esc</code>, <code>arrow left</code>, and <code>arrow right</code>
currentImage  | number  | 0 | The index of the image to display initially
customControls | array | undefined | An array of elements to display as custom controls on the top of lightbox
images  | array | undefined | Required. Array of image objects See image options table below
imageCountSeparator  | String  | ' of ' | Customize separator in the image count
isOpen  | bool  | false | Whether or not the lightbox is displayed
leftArrowTitle | string | ' Previous (Left arrow key) ' | Customize of left arrow title
onClickPrev | func | undefined | Fired on request of the previous image
onClickNext | func | undefined | Fired on request of the next image
onClose | func | undefined | Required. Handle closing of the lightbox
onClickImage | func | undefined | Handle click on image
onClickThumbnail | func | undefined | Handle click on thumbnail
onSave | func | undefined | Show save button and handle click / params : currentImageIndex, {rotation, zoom}
preloadNextImage | bool | true | Based on the direction the user is navigating, preload the next available image
rightArrowTitle | string | ' Next (Right arrow key) ' | Customize right arrow title
rotatable | bool | false | Show rotate buttons
showCloseButton | bool  | true | Optionally display a close "X" button in top right corner
showImageCount | bool  | true | Optionally display image index, e.g., "3 of 20"
width | number  | 1024 | Maximum width of the carousel; defaults to 1024px
spinner | func | DefaultSpinner | Spinner component class
spinnerColor | string | 'white' | Color of spinner
spinnerSize | number | 100 | Size of spinner
preventScroll | bool | true | Determines whether scrolling is prevented via [react-scrolllock](https://github.com/jossmac/react-scrolllock)
zoomable | bool | false | Show zoom buttons

## Images object

Property	|	Type		|	Default		|	Description
:-----------------------|:--------------|:--------------|:--------------------------------
src  | string | undefined | Required
srcSet  | array of strings | undefined | Optional
caption  | string | undefined | Optional
alt  | string | undefined | Optional
initialZoom  | number | 1 | Optional
initialRotation  | number | 0 | Optional

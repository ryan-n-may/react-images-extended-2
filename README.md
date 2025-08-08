# React Images Extended

This is a fork of an old and unsupported package, modernised and added features included.  I will update the documentation when I have time. 

![downloads](https://img.shields.io/npm/dt/react-images-extended.svg 'NpmJS total downloads')

A simple, responsive lightbox React JS component for displaying an array of images with zooming and rotating capabilities.
This is a fork of [jossmac/react-images](https://github.com/jossmac/react-images)

### Why this fork ?
I needed something like jossmac's react-images but with extended features like zooming and rotating, with the ability to save selelcted zoom level (scaling) and rotation angle via API, and re-apply them initially on get.


### Quick start


```bash
npm install --save react-images-extended
```
or
```bash
yarn add react-images-extended
```

```jsx
import React from 'react';
import Lightbox from 'react-images';

export default class Sample extends React.Component {
  ...
  render() {
    return (
      <Lightbox
        images={[{ src: 'http://example.com/img1.jpg' }, { src: 'http://example.com/img2.jpg' }]}
        isOpen={this.state.lightboxIsOpen}
        onClickPrev={this.gotoPrevious}
        onClickNext={this.gotoNext}
        onClose={this.closeLightbox}
        rotatable={true}
        zoomable={true}
        onSave={(currentImageIndex, params) => console.log('currentImageIndex, currentImageSrc, params : ', currentImageIndex, this.props.images[currentImageIndex].src, params)}
      />
    );
  }
}
```


## Demo & Examples

Live demo: [react-images-extended.surge.sh](https://react-images-extended.surge.sh)

To build the examples locally, run:

```
yarn install
yarn start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.

### Using srcSet

Example using srcSet:
```jsx
<Lightbox
  images={LIGHTBOX_IMAGE_SET}
  ...
/>

const LIGHTBOX_IMAGE_SET = [
  {
    src: 'http://example.com/example/img1.jpg',
    caption: 'A forest'
    srcSet: [
      'http://example.com/example/img1_1024.jpg 1024w',
      'http://example.com/example/img1_800.jpg 800w',
      'http://example.com/example/img1_500.jpg 500w',
      'http://example.com/example/img1_320.jpg 320w',
    ],
  },
  {
    src: 'http://example.com/example/img2.jpg',
    srcSet: [
      'http://example.com/example/img2_1024.jpg 1024w',
      'http://example.com/example/img2_800.jpg 800w',
      'http://example.com/example/img2_500.jpg 500w',
      'http://example.com/example/img2_320.jpg 320w',
    ],
  }
];

```

## Options

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

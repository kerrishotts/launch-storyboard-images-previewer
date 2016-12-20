# Launch Storyboard Image Previewer Utility

> Author: Kerri Shotts (kerrishotts@gmail.com)
>
> Version: 0.3
>
> License: MIT

[Run it now](https://cdn.rawgit.com/kerrishotts/launch-storyboard-images-previewer/0.3-release/index.html) -- for the impatient... ;-) Do read the docs before using, though.

This utility is intended to be used in conjunction with the new launch storyboard images feature released with `cordova-ios@4.3.1`. This utility provides a simple and fast way to preview your images on all supported iOS devices, which means you can quickly verify that your images appear correctly centered and that no important detail is lost due to cropping.

This tool does **not** help you design your launch images, nor does it guarantee a pixel-perfect representation of how they will appear on a physical device. This tool is only intended to provide a rough guideline as to where the images will be cropped on specific devices.

## Supported Browsers

This utility requires that the browser support ES2015 and the `FileReader` API. The browser must also support the modern flexbox module (unprefixed).

This utility has been tested on:

* Safari 10

* Mozilla Firefox 49.0.1

* Chrome 54.0.2840.59

## Installation

* Run from `rawgit.com`: https://cdn.rawgit.com/kerrishotts/launch-storyboard-images-previewer/0.3-release/index.html

* Clone this repo, and:

    * Start a local HTTP server, or 
    
    * Navigate your browser to `file:///path/to/where/you/cloned/the/repo/index.html`
    
> **NOTE:*** This utility does not upload your files anywhere. You can review the source code if you are concerned.

## Usage

The viewport is split into two halves. The left pane is where you select your source images, and the right pane is where the device previews are rendered.

### Image Source Pane 

The image source pane displays every possible variation of device idiom, scale, and size class. Typically, however, you'll only use a few of these, leaving the others blank.

To select an image for a particular set of traits, locate the cell and click the `Choose File` button (or equivalent in your browser). Select the file that matches the traits. The Device Preview pane will update to reflect your selected image.

Note that you must provide an `any any` image for any particular idiom and scale. If you do not, the cells below will be grayed-out and the preview will not render any of their selected images. This matches iOS' behavior, even if it is a bit unintuitive.

### Device Preview Pane

The device preview pane shows all supported devices in their possible orientations as well as the various multi-tasking viewports that may be available. The device preview renders images at roughly a 10% scale.

## Caveats

* Images are downsampled to fit within the previews, and as such, you should not rely on them for pixel-perfect rendering. Depending on your browser and system configuration, the images may be somewhat pixelated or blurry.

* iOS is supposed to select the image that best fits the device. This utility attempts to duplicate that algorithm, but it may be flawed in that it is limited by my own knowledge of how iOS does it. As such, it is possible that there are some edge cases that I haven't considered.

* The coding here is incredibly naive. It makes no attempt to be optimized for any particular form factor, doesn't provide accessibility, and may not run well on your machine (lots of downscaling going on!). Ideally that will change in the future, but for now, consider this "proof of concept" quality.

## Examples

* Voice Memos: [Single image, single-color background, centered logo and text](https://cdn.rawgit.com/kerrishotts/launch-storyboard-images-previewer/0.3-release/index.html?at2x-universal-anyany=examples/material-voice-memos/Default@2x~universal~anyany.png)
* Logology: [Single image, Two-color background, centered text](https://cdn.rawgit.com/kerrishotts/launch-storyboard-images-previewer/0.3-release/index.html?at2x-universal-anyany=examples/logology/Default@2x~universal~anyany.png)
* Cordova Robot: [Multi image, singe-color background, centered logo and text](https://cdn.rawgit.com/kerrishotts/launch-storyboard-images-previewer/0.3-release/index.html?at2x-universal-comany=examples/cordova-robot/Default@2x~universal~comany.png&at2x-universal-comcom=examples/cordova-robot/Default@2x~universal~comcom.png&at3x-universal-anyany=examples/cordova-robot/Default@3x~universal~anyany.png&at3x-universal-comany=examples/cordova-robot/Default@3x~universal~comany.png&at3x-universal-anycom=examples/cordova-robot/Default@3x~universal~anycom.png&at2x-universal-anyany=examples/cordova-robot/Default@2x~universal~anyany.png)

## Attributions and Acknowledgements

* Cordova Robot from http://cordova.apache.org/artwork/
* Voice Memo uses [Google's Material Icons](https://design.google.com/icons/), and is based on the example provided by https://developers.google.com/web/updates/2015/10/splashscreen?hl=en
* Size class information from http://www.sizeclasses.com
* [Tyler Howarth's excellent article covering viewport sizes and size classes](https://medium.design/regular-and-compact-ios-display-size-breakdown-for-designers-d3ff3044e06e#.xg73rh9wx)
* [File Input element and FileReader example](a href="http://stackoverflow.com/a/3814285)
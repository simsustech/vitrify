# buffer-image-size

A [Node](https://nodejs.org/en/) module to get dimensions of any image ~~file~~ buffer

Fork of [image-size](https://github.com/image-size/image-size)

This fork doesn't use the 'fs' and 'path' node modules.


## Supported formats

* BMP
* CUR
* GIF
* ICO
* JPEG
* PNG
* PSD
* ~~TIFF~~ (no buffer support)
* WebP
* SVG
* DDS

### Upcoming

* SWF

## Programmatic Usage

```
npm install buffer-image-size --save
```

### Synchronous

```javascript
var sizeOf = require('buffer-image-size');
var dimensions = sizeOf(yourImageBuffer);
console.log(dimensions.width, dimensions.height);
```

### Asynchronous

No need for asynchronous usage in this fork.
See the original instead: https://github.com/image-size/image-size

### Multi-size

If the target file is an icon (.ico) or a cursor (.cur), the `width` and `height` will be the ones of the first found image.

An additional `images` array is available and returns the dimensions of all the available images

```javascript
var sizeOf = require('buffer-image-size');
var images = sizeOf(icoBuffer).images;
for (const dimensions of images) {
  console.log(dimensions.width, dimensions.height);
}
```

### Using a URL

```javascript
var url = require('url');
var http = require('http');

var sizeOf = require('buffer-image-size');

var imgUrl = 'http://my-amazing-website.com/image.jpeg';
var options = url.parse(imgUrl);

http.get(options, function (response) {
  var chunks = [];
  response.on('data', function (chunk) {
    chunks.push(chunk);
  }).on('end', function() {
    var buffer = Buffer.concat(chunks);
    console.log(sizeOf(buffer));
  });
});
```

You can optionally check the buffer lengths & stop downloading the image after a few kilobytes.
**You don't need to download the entire image**

## Command-Line Usage (CLI)

No CLI usage in this fork.
See the original instead: https://github.com/image-size/image-size

## Credits

not a direct port, but an attempt to have something like
[dabble's imagesize](https://github.com/dabble/imagesize/blob/master/lib/image_size.rb) as a node module.

## [Contributors](Contributors.md)

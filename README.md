Waves.js
=========

Adds Material-Design-like waves to elements.

<a href="https://passypw.github.com/Waves.js/demo/">View Demo</a>

## Installation
```html
<link href="ripple.css" rel="stylesheet">
<script src="jquery.js"></script>
```
or
```bash
$ npm install wavesjs
```
or
```bash
$ yarn add wavesjs
```

## Dependencies
This library needs jQuery to work.

## Usage
After including jQuery, the `waves.css` and `waves.js` into your page, you can activate waves as follows:

```javascript
$.ripple(".btn", {
	debug: false, // Enable / Disable debug logging.
	on: 'mousedown', // The event to trigger a wave (valid jQuery event).

	opacity: 0.3, // Initial opacity of wave-
	color: "auto", // Set the background color. If set to "auto", it will use the text color-
	multi: true, // Allow multiple waves at a time per element.

	duration: 0.3, // The duration of the animation
	
	// Filter function for modifying the speed of the wave
	rate: function (pxPerSecond) {
		return pxPerSecond;
	},

	easing: 'linear' // The CSS3 easing function of the wave
});
```

Elements can be overridden with their own default options:
```html
<a href="#" data-duration="5" data-color="red" data-opacity="1">Slow Red Ripple</a>
```

## Building
First of all you should download and install [Yarn](https://yarnpkg.com):
```bash
$ sudo npm install -g yarn
```

Then you can initialize the project:
```bash
$ yarn
$ npm run build
```

## Caveats
* The element selected to contain a ripple will gain the following CSS properties:
    * `position: relative`
    * `transform: translate3d(0,0,0)`

## License
[MIT](LICENSE)

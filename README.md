> Checkout a similar project [medium-style-confirm](https://github.com/brijeshb42/medium-style-confirm) having a cleaner interface.

# Blurt
A javascript default ```alert()``` and ```prompt()``` replacement.
Inspired by [sweetAlert](https://github.com/t4t5/sweetalert) but custom implementation.

## [Visit blurt project site](http://bitwiser.in/blurt/)

![blurt()](https://raw.github.com/brijeshb42/blurt/master/src/img/blurt.gif)

# Installation
* Just download the latest zip of [blurt](http://goo.gl/nWQoCQ).
* Or install using ```bower install blurt```.
* And link the ```blurt.min.css``` and ```blurt.min.js``` files in your webpage.
	```html
	<link rel="stylesheet" href="blurt.min.css">
	<script src="blurt.min.js"></script>
	```

* After page load, show the ```blurt``` using:
	```blurt('Your message here.')```

![blurt()](https://raw.github.com/brijeshb42/blurt/master/src/img/brompt.gif)

* To use ```prompt()``` equivalent, do this:
	
	```javascript
	brompt('Prompt title', function(val){
		//use the val here
	});
	```

# Development
* Clone the project ```git clone https://github.com/brijeshb42/blurt.git```.
* Then ```cd``` into **blurt** directory.
* ```npm install``` installs the **node modules** required during development.
* Runnig ```grunt``` command initialises dev files and watches for changes made to _blurt.js_ and _scss_ files. 
* Make your changes to ```src/js/blurt.js``` or ```sass/*.scss```.
* After making changes, ```grunt dist``` creates the final minified *css* and *js* files in dist directory.
* Use the generated *blurt.min.js* and *blurt.min.css* in your web page to use _blurt_ .

# Issues
Report issues [here](https://github.com/brijeshb42/blurt/issues).

# Bugs-to-fix
* Uses css animations which may not be supported in old browsers.

# Todo
* Implement icons for each of the *blurt* types, i.e, success, info, error and warning.
* Implement fadeIn and fadeOut to support older browsers which do not support css animation.

# License
MIT License

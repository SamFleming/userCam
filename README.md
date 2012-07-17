userCam
=======

jQuery Webcam Plugin
---------------------

Uses the "working draft" of the getUserMedia/Stream API to stream a users webcam to a `<video>` element.


Demo
----
You can checkout a simple demo here: [userCam example](http://samfleming.me/examples/userCam/).

Usage
-----
This should work with most jQuery versions however it has only been tested with 1.7.2.

Include the (minified) script in your HTML document

	<script src="js/jquery.userCam.min.js"></script>
	
Then call it on a container element

	<div class="webcam-container"></div>
	
	<script>
		$('.webcam-container').userCam();
	</script>
	
Documentation
-------------
userCam can be called with a few additional parameters as follows:

	<script>
		$('.webcam-container').userCam({
			start: function (event, video) { },
			errror: function (message) {
				console.log(message);
			}
		});
	</script>
	
### Parameters
	
Option|Type|When executed?
------|---------|-------
start|function|When the webcam starts stream to the video element
error|function|An error occurs

### Methods

You can access the userCam methods by accessing the container element `data('userCam')`, as follows:

	<script>
		var webcamContainer = $('.webcamContainer');
		webcamContainer.userCam({
			start: function (event, video) { },
			errror: function (message) {
				console.log(message);
			}
		}); 
		
		// Will take a still image from the stream, you could set
		// this as an img src="" attribute or send it to a server-side 
		// script for storage.
		var pngDataUri = webcamContainer.data('userCam').getStill();
	</script>
	

Browser Support
---------------
You can view the [current browser support here](http://caniuse.com/#feat=stream)
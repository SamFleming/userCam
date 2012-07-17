;(function ( $, window, document, undefined ) {

    var pluginName = 'userCam',
        defaults = {
            error: function (message) {
                console.log(message);
            },
            start: function (e) {}
        };

    function Plugin (element, options) {
        var _this = this;
        _this.element = element;
        _this.options = $.extend({}, defaults, options);
        _this.video = null;

        _this.init = function () {
            if (navigator.getUserMedia) {
                navigator.getUserMedia({ video: true }, _this.success, _this.failure);
            } else if (navigator.webkitGetUserMedia) {
                navigator.webkitGetUserMedia({ video: true }, _this.success, _this.failure);
            } else {
                _this.options.error('Your browser does not support getUserMedia');
            }
        };

        _this.success = function (stream) {
            if (window.webkitURL) {
                stream = window.webkitURL.createObjectURL(stream);
            }

            $video = $('<video>');
            _this.video = $video.get(0);

            $video.on('play', _this.startedPlaying);

            _this.video.autoplay = true;
            _this.video.src = stream;

            $video.appendTo(_this.element);
        };

        _this.failure = function () {
            this.options.error('Permission for getUserMedia denied');
        };

        _this.startedPlaying = function (e) {
            _this.options.start(e, _this.video);
        };

        _this.getStill = function (callback) {
            var canvas = $('<canvas>').get(0);

            canvas.width = _this.video.videoWidth;
            canvas.height = _this.video.videoHeight;

            var ctx = canvas.getContext('2d');
            ctx.drawImage(_this.video, 0, 0, canvas.width, canvas.height);
            return canvas.toDataURL('image/png');
        };

        _this.init();
    }


    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, pluginName)) {
                $.data(this, pluginName, new Plugin( this, options ));
            }
        });
    }

}(jQuery, window));
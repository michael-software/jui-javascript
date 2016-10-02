window.jui = {};

(function (tools, window) {
	tools.empty = function(value) {
		if(typeof value === "undefined" || value === undefined) {
            return true;
        }

		if(value === null) {
			return true;
		}

		if(value === '') {
            return true;
        }

		if(Array.isArray(value) && value.length <= 0) {
			return true;
		}

		if(value === 'null') {
			return true;
		}

		if(value === 'undefined') {
            return true;
        }

        return false;
	};

	tools.isFunction = function(obj) {
		return !!(obj && obj.constructor && obj.call && obj.apply); // Thanks to: http://stackoverflow.com/questions/5999998/how-can-i-check-if-a-javascript-variable-is-function-type
	};

	tools.isArray = function(obj) {
		if(!Array.isArray) {
			return Object.prototype.toString.call(obj) === "[object Array]";
		} else {
			return Array.isArray(obj);
		}
	}

	tools.requestSite = function(url, postData, callback) {
		var xhr = new XMLHttpRequest();

		if(!tools.empty(postData)) {
			xhr.open('POST', url, true);
		} else {
			xhr.open('GET', url, true);
		}

		xhr.onload = function(e) {
			if(!tools.empty(callback) && tools.isFunction(callback)) {
				callback.call(window, this.response, this.status);
			}
		};

		if(!tools.empty(postData)) {
			xhr.send(postData);
		} else {
			xhr.send();
		}
	}

	tools.convertHex = function (hex){
		var length = hex.length;

		if(hex.indexOf('#') == 0) {
			if(length == 4 || length == 7) {
				return hex;
			} else if(length == 8 || length == 9) {
				hex = hex.replace('#','');
				opacity = parseInt(hex.substring(0,2), 16);
				r = parseInt(hex.substring(2,4), 16);
				g = parseInt(hex.substring(4,6), 16);
				b = parseInt(hex.substring(6,8), 16);

				return 'rgba('+r+','+g+','+b+','+opacity/255+')';
			}
		} else if(length == 3 || length == 6) {
			return '#' + hex;
		}

		return '#000000';
	}
})(window.jui.tools = {}, window);
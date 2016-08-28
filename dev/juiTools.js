(function (tools, window) {
	tools.empty = function(value) {
		if(value === null) {
			return true;
		}

        if(value === undefined) {
            return true;
        }

		if(value === '') {
            return true;
        }

		if(value.length <= 0) {
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
})(window.jui.tools = {}, window);
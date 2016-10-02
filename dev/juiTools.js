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

	tools.isBoolean = function(obj) {
		return typeof obj === 'boolean' || 
          (typeof obj === 'object' && typeof obj.valueOf() === 'boolean');  // Thanks to: http://stackoverflow.com/questions/28814585/how-to-check-if-type-is-boolean
	}

	tools.getDaysInMonth = function(year, month) {
		return [31, (tools.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
	}

	tools.isLeapYear = function(year) {
		return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
	}

	tools.getMonthName = function(month) {
		return window.jui.lang.get('month_names')[month];
	}

	tools.requestSite = function(url, postData, headers, callback) {
		var xhr = new XMLHttpRequest();

		if(!tools.empty(postData)) {
			xhr.open('POST', url, true);
		} else {
			xhr.open('GET', url, true);
		}

		if(!tools.empty(headers) && tools.isArray(headers))
		for(var i = 0, x = headers.length; i < x; i++) {
			var header = headers[i];

			if(!tools.empty(header.name) && !tools.empty(header.value)) {
				var name = header.name;
				var value = header.value;

				xhr.setRequestHeader(name, value);
			}
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
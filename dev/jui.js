(function (jui) {
	var root = document.querySelector('body');
	var parseHeadCallback = null, submitCallback = null;
	var customSingleLineElements = [], customElements = [];
	var _tools;

	var lastLoaded = window.location.href;

	var sendElements = [];
	
	jui.views = {};
	jui.padding;
	jui.paddingLeft;
	
	jui.init = function(pRoot) {
		if(pRoot === null || pRoot === undefined) {
			root = document.querySelector('body');
		} else {
			root = pRoot;
		}
	};

	jui.clean = function() {
		root.innerHTML = '';
		root.style.padding = jui.padding;
		root.style.paddingLeft = jui.paddingLeft;
		root.style.marginTop = 0;

		document.querySelector('body').style.backgroundColor = 'transparent';

		_tools = window.jui.tools;
	};

	jui.parse = function(jsonObject, parentElement, allElements) {
		
		if(jsonObject['head'] !== null && jsonObject['head'] !== undefined) {
			parseHead(jsonObject);
			var data = jsonObject['data'];
		} else {
			var data = jsonObject;
		}

		var fragment = document.createDocumentFragment();

		if(!_tools.empty(data)) {
			sendElements = [];

			for(var i = 0, x = data.length; i < x; i++) {
				var el = parseElement(data[i], allElements);

				if(!_tools.empty(el)) {
					el = el.getDomElement();
				}

				if(!_tools.empty(el)) {
					if(data[i]['id'] !== null && data[i]['id'] !== undefined) {
						el.id = data[i]['id'];
					}

					fragment.appendChild(el);
				}
			}
		}

		if(parentElement === true) {
			return fragment;
		} else if(!_tools.empty(parentElement)) {
			parentElement.appendChild(fragment);
		} else {
			root.appendChild(fragment);
		}
	}

	jui.setHeadCallback = function(callback) {
		if(typeof callback == 'function') {
			parseHeadCallback = callback;
		}
	};

	jui.setSubmitCallback = function(callback) {
		if(typeof callback == 'function') {
			submitCallback = callback;
		}
	};

	jui.registerSubmitElement = function (name, element) {
		sendElements.push({
			name: name,
			element: element
		})
	}

	jui.registerCustomSingleLineElement = function (type, constructClass, shType) {
		if(_tools.empty(shType)) shType = type;

		customSingleLineElements.push({
			type: type,
			construct: constructClass,
			shType: shType
		})
	}

	jui.registerCustomElement = function (type, constructClass, shType) {
		if(_tools.empty(shType)) shType = type;

		customElements.push({
			type: type,
			construct: constructClass,
			shType: shType
		})
	}

	var parseHead = function(jsonObject) {
		if (pJson['bgcolor'] != null) {
			document.querySelector('body').style.backgroundColor = jsonObject['bgcolor'];
		}

		if(parseHeadCallback !== null) {
			parseHeadCallback(jsonObject);
		}
	}

	var parseElement = function(jsonObject, allElements) {
		if(_tools.empty(allElements)) allElements = true;

		if(_tools.empty(jsonObject)) return null;
		if(jsonObject['type'] === null) return null;

		var el = parseSingleLineElements(jsonObject);

		if(allElements) {
			if(jsonObject['type'] == 'list') {
				el = new window.jui.views.list(jsonObject);
			} else if(jsonObject['type'] == 'table') {
				el = new window.jui.views.table(jsonObject, this);
			} else if(jsonObject['type'] == 'frame') {
				el = new window.jui.views.frame(jsonObject);
			} else if(jsonObject['type'] == 'range') { /* TODO */
				el = new window.jui.views.range(jsonObject);
			} else if(jsonObject['type'] == 'container') {
				el = new window.jui.views.container(jsonObject);
			} else if(!_tools.empty(customElements)) {
				for(var i = 0, x = customElements.length; i < x; i++) {
					var customElement = customElements[i];

					if(customElement.type.toLowerCase() == jsonObject['type'].toLowerCase() ||
						customElement.shType.toLowerCase() == jsonObject['type'].toLowerCase()) {
						
						el = new customElement.construct(jsonObject);

						if(!_tools.empty(el)) {
							return el;
						}
					}
				}
			}
		}

		return el;
	}

	var parseSingleLineElements = function(jsonObject) {
		var el = null;
		
		if(jsonObject['type'] == 'text') {
			el = new window.jui.views.text(jsonObject);
		} else if(jsonObject['type'] == 'heading') {
			el = new window.jui.views.heading(jsonObject);
		} else if(jsonObject['type'] == 'input') {
			el = new window.jui.views.input(jsonObject); 
		} else if(jsonObject['type'] == 'button') {
			el = new window.jui.views.button(jsonObject);
		} else if(jsonObject['type'] == 'checkbox') {
			el = new window.jui.views.checkbox(jsonObject);
		} else if(jsonObject['type'] == 'nl') {
			el = new window.jui.views.newline();
		} else if(jsonObject['type'] == 'hline') {
			el = new window.jui.views.horizontalline();
		} else if(jsonObject['type'] == 'file') {
			el = new window.jui.views.file(jsonObject);
		} else if(jsonObject['type'] == 'image') { 
			el = new window.jui.views.image(jsonObject);
		} else if(jsonObject['type'] == 'link') { 
			el = new window.jui.views.link(jsonObject);
		} else if(jsonObject['type'] == 'select') { 
			el = new window.jui.views.select(jsonObject);
		} else if(!_tools.empty(customSingleLineElements)) {
			for(var i = 0, x = customSingleLineElements.length; i < x; i++) {
				var customSingleLineElement = customSingleLineElements[i];

				if(customSingleLineElement.type.toLowerCase() == jsonObject['type'].toLowerCase() ||
					customSingleLineElement.shType.toLowerCase() == jsonObject['type'].toLowerCase()) {
					
					el = new customSingleLineElement.construct(jsonObject);

					if(!_tools.empty(el)) {
						return el;
					}
				}
			}
		}
		
		return el;
	};

	jui.requestParse = function(url, callback) {
		window.jui.tools.requestSite(url, null, function(content, status) {
			if(status === 200) {
				content = JSON.parse(content);
				window.jui.parse(content);

				lastLoaded = url;
			}

			if(!_tools.empty(callback) && _tools.isFunction(callback)) {
				callback.apply(content, status);
			}
		});
	}

	jui.submit = function() {
		var formData = new FormData();

		for(var i = 0, x = sendElements.length; i < x; i++) {

			var name = sendElements[i].name;
			var element = sendElements[i].element;
			var tagName = element.tagName;

			if(tagName && tagName.toLowerCase() == "input" &&
				 		(element.type.toLowerCase() == "text" ||
						 element.type.toLowerCase() == "password" ||
						 element.type.toLowerCase() == "number" ||
						 element.type.toLowerCase() == "range" ||
						 element.type.toLowerCase() == "color" ||
						 element.type.toLowerCase() == "date")) {
						
				
				if(!_tools.empty(element.value)) {
					formData.append(name, element.value);
				}
			} else if(tagName && tagName.toLowerCase() == "select") {
				console.log("Hi");
			} else if(tagName && tagName.toLowerCase() == "input" &&
				 		element.type.toLowerCase() == "checkbox") {
				
				if(element.checked) formData.append(name, 1);
			} else if(tagName && tagName.toLowerCase() == "input" &&
				 		element.type.toLowerCase() == "file") {
				
				for(var j = 0, k = element.files.length; j < k; j++) {
					formData.append(name + '[]', element.files[j]);
				}
			} else if(tagName && tagName.toLowerCase() == "textarea") {
				if(!_tools.empty(element.innerHTML)) {
					formData.append(name, element.innerHTML);
				}
			} else if(element.classList.contains('.editor') && element.querySelector('.html') != null) {
				if(!_tools.empty(element.querySelector('.html').innerHTML)) {
					formData.append(name, element.querySelector('.html').innerHTML);
				}
			} else {
				if(!_tools.empty(submitCallback)) {
					submitCallback(formData, name, element);
				}
			}

		}

		window.jui.tools.requestSite(lastLoaded, formData, function(content, status) {
			if(status === 200) {
				content = JSON.parse(content);
				window.jui.parse(content);

				lastLoaded = url;
			}
		});
	};
})(window.jui = {});
(function (view) {
	var _tools = window.jui.tools;

	view.addProperties = function(retval, properties) {
		if(properties['width'] != null && properties['width'] != '') {
			retval.style.width = properties['width'];
		}
		
		if(properties['height'] != null && properties['height'] != '') {
			retval.style.height = properties['height'];
		}
		
		if(properties['color'] != null && properties['color'] != '') {
			retval.style.color = properties['color'];
		}
		
		if(properties['visible'] != null && properties['visible'] == 'away') {
			retval.style.display = 'none';
		}
		
		if(properties['visible'] != null && properties['visible'] == 'invisible') {
			retval.style.visibility = 'hidden';
		}
		
		if(properties['margin'] != null) {
			retval.style.margin = properties['margin'];
		}
		
		if(properties['marginTop'] != null) {
			retval.style.marginTop = properties['marginTop'];
		}
		
		if(properties['marginLeft'] != null) {
			retval.style.marginLeft = properties['marginLeft'];
		}
		
		if(properties['marginRight'] != null) {
			retval.style.marginRight = properties['marginRight']
		}
		
		if(properties['marginBottom'] != null) {
			retval.style['marginBottom'] = properties['marginBottom']
		}
	};

	view.addInputProperties = function(retval, properties) {
		if(!_tools.empty(properties['change'])) {
			retval.addEventListener('change', function() {
				window.jui.action.call(properties['change']);
			}, false);
		}

		if(!_tools.empty(properties['label'])) {
			var newRetval = document.createElement('label');

			if(retval.tagName.toLowerCase() === 'input' && retval.type.toLowerCase() === 'checkbox') {
				newRetval.appendChild(retval);
				newRetval.appendChild( document.createTextNode(properties['label']) );
			} else {
				newRetval.appendChild( document.createTextNode(properties['label']) );
				newRetval.appendChild(retval);
			}

			return newRetval;
		}

		return retval;
	}
})(window.jui.views.view = {});
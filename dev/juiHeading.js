window.jui.views.heading = (function (jsonObject) {
    var value = '';
    var size = 1;
    var properties = [];

    var _this = window.jui.views.heading;
    var _tools = window.jui.tools;

    var parse = function (jsonObject) {
        if (!_tools.empty(jsonObject['value'])) {
            _this.setValue(jsonObject['value']);

            if(!_tools.empty(jsonObject['size'])) {
                _this.setSize(jsonObject['size'])
            }

            properties = jsonObject;
        }

        return _this;
    };

    _this.setValue = function (pValue) {
        value = pValue.replace("/&lt;br \/&gt;/g", "<br />").replace("/&lt;br\/&gt;/g", "<br />").replace("/&lt;br&gt;/g", "<br />");
        value = value.replace(/(?:\r\n|\r|\n)/g, '<br />');
        value = value.replace("/<br \/> /g", "<br />").replace("/ <br \/>/g", "<br />");
    };

    _this.getDomElement = function () {
        if(!_tools.empty(value)) {
            if(size === 0) {
                var retval = document.createElement('h3');
            } else {
                var retval = document.createElement('h2');
            }

            retval.appendChild( document.createTextNode(value) );

            window.jui.views.view.addProperties(retval, properties);

            return retval;
        }

        return null;
    };

    _this.setSize = function(pSize) {
        if(pSize.toUpperCase() === "SMALL") {
            size = 0;
        } else {
            size = 1;
        }
    }

    return parse(jsonObject);
});
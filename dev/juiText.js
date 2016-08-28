window.jui.views.text = (function (jsonObject) {
    var value = '';
    var align = 'left';
    var bold = false;
    var italic = false;
    var properties = [];

    var _this = window.jui.views.text;
    var _tools = window.jui.tools;

    var parse = function (jsonObject) {
        if (!_tools.empty(jsonObject['value'])) {
            _this.setValue(jsonObject['value']);

            if (!_tools.empty(jsonObject['align'])) {
                _this.setAlign(jsonObject['align']);
            }

            if (!_tools.empty(jsonObject['appearance'])) {
                _this.setAppearance(jsonObject['appearance']);
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

    _this.setAlign = function (pAlign) {
        if (pAlign.toUpperCase() == 'RIGHT') {
            align = 'right';
        } else if (pAlign.toUpperCase() == 'CENTER') {
            align = 'center';
        } else if (pAlign.toUpperCase() == 'LEFT') {
            align = 'right';
        } else {
            align = 'left';
        }
    };

    _this.setAppearance = function (appearance) {
        if (appearance.toUpperCase() == 'BOLD') {
            bold = true;
            italic = false;
        } else if (appearance.toUpperCase() == 'ITALIC') {
            bold = false;
            italic = true;
        } else if (appearance.toUpperCase() == 'BOLDITALIC' || appearance.toUpperCase() == 'ITALICBOLD') {
            bold = true;
            italic = true;
        }
    }

    _this.getDomElement = function () {
        if(!_tools.empty(value)) {
            var retval = document.createElement('div');

            retval.appendChild( document.createTextNode(value) );
            retval.style.textAlign = align;

            if(bold) {
                retval.style.fontWeight = 'bold';
            }

            if(italic) {
                retval.style.fontStyle = 'italic';
            }

            window.jui.views.view.addProperties(retval, properties);

            return retval;
        }

        return null;
    };

    return parse(jsonObject);
});